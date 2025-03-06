import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaSearch, FaChevronDown, FaTimes, FaPencilAlt, FaSave, FaStop, FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PromptOverlay from './PromptOverlay';
import { Switch } from '@headlessui/react';
import HistoryItem from './HistoryItem';
import { BiBrain } from "react-icons/bi";
import { v4 as uuidv4 } from 'uuid';
import { useChat } from 'ai/react';
import TestModel from './TestModel';
import { MdKeyboardArrowUp } from "react-icons/md";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const RAGPrompting = ({ onBack, initialData = null, hideBackToMenu = false }) => {


    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [modelSearch, setModelSearch] = useState('');
    const [showPromptOverlay, setShowPromptOverlay] = useState(false);
    const [currentPromptId, setCurrentPromptId] = useState(initialData?.prompt_id || null);
    const [pendingHistoryItem, setPendingHistoryItem] = useState(null);
    const [validationScore, setValidationScore] = useState(null);

    const [userInput, setUserInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [abortController, setAbortController] = useState(null);
    const [validationDetails, setValidationDetails] = useState([]);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [testResults, setTestResults] = useState({});
    const [isTestingPrompt, setIsTestingPrompt] = useState(false);
    const [saveTitle, setSaveTitle] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);

    const testModelRefs = useRef(new Map());

    const [testContext, setTestContext] = useState('');
    const [vectorStores, setVectorStores] = useState([]);
    const [selectedVectorStore, setSelectedVectorStore] = useState('');
    const [vectorStoreSearch, setVectorStoreSearch] = useState('');
    const [chromaCollectionName, setChromaCollectionName] = useState("");

    // Fetch available vector stores on mount
    useEffect(() => {
        const fetchVectorStores = async () => {
            try {
                const response = await fetch("/api/knowledge/files/vectorstore", {
                    method: "GET",
                });
                if (!response.ok) throw new Error("Failed to fetch vector stores");
                const data = await response.json();
                setVectorStores(data.data.stores);
            } catch (error) {
                console.error("Error fetching vector stores:", error);
            }
        };
        fetchVectorStores();
    }, []);

    // Get collection name when vector store is selected
    const handleVectorStoreSelect = async (storeId) => {
        setSelectedVectorStore(storeId);
        try {
            const response = await fetch(`/api/knowledge/files/vectorstore/rag?store_id=${storeId}`);
            if (!response.ok) throw new Error("Failed to fetch collection name");
            const data = await response.json();
            setChromaCollectionName(data.data);
        } catch (error) {
            console.error("Error fetching collection name:", error);
        }
    };

    // Filter for vector store search
    const filteredVectorStores = vectorStores.filter(store =>
        store.name.toLowerCase().includes(vectorStoreSearch.toLowerCase())
    );
    useEffect(() => {
        if (Object.keys(testResults).length > 0) {
            // Update history whenever testResults changes
            if (autoHistory) {
                if (!selectedHistoryItem) {
                    createHistoryItem(null);
                } else {
                    // Update the current history item with new test results
                    setPromptHistory(prev => ({
                        ...prev,
                        items: prev.items.map(item =>
                            item.id === selectedHistoryItem.id
                                ? { ...item, testResults: testResults }
                                : item
                        )
                    }));
                }
            } else {
                updatePendingHistoryItem();
            }
        }
    }, [testResults]);
    useEffect(() => {
        if (initialData?.prompt_id) {
            setCurrentPromptId(initialData.prompt_id);
        }
    }, [initialData]);



    useEffect(() => {
        if (initialData?.items) {
            // Transform the data from snake_case to camelCase
            const transformedItems = initialData.items.map(item => ({
                id: item.id,
                parentId: item.parent_id,
                name: item.name,
                timestamp: item.timestamp,
                userInput: item.user_input,
                generatedPrompt: item.generated_prompt,
                selectedModels: item.selected_models || [],
                testContext: item.test_context || '',
                testResults: item.test_results || {}
            }));

            // Set the prompt history with transformed data
            setPromptHistory({
                id: initialData.prompt_id,
                items: transformedItems
            });

            // Set up the first item if available
            if (transformedItems.length > 0) {
                const firstItem = transformedItems[0];
                setSelectedHistoryItem(firstItem);
                setPendingHistoryItem(firstItem);

                // Set up the form fields
                setUserInput(firstItem.userInput || '');
                setGeneratedPrompt(firstItem.generatedPrompt || '');
                setSelectedModels(firstItem.selectedModels || []);
                setTestContext(firstItem.testContext || '');
                setTestResults(firstItem.testResults || {});
            }
        }
    }, [initialData]);


    // Add this effect to fetch models when component mounts
    useEffect(() => {
        getModels();
    }, []);
    const handleRunTests = () => {
        if (isAnyModelLoading() || isTestingPrompt) {
            stopAllTests();
        } else {
            if (selectedModels.length === 0) {
                toast.error("Please select at least one model");
                return;
            }

            // Ensure we have a history item; if not, create one
            let currentHistory = selectedHistoryItem;
            if (!currentHistory) {
                currentHistory = createHistoryItem();
            } else {
                // Update the current history with the selected models (if needed)
                currentHistory = { ...currentHistory, selectedModels: selectedModels };
                setPromptHistory(prev => ({
                    ...prev,
                    items: prev.items.map(item =>
                        item.id === currentHistory.id ? currentHistory : item
                    )
                }));
            }

            // Generate a unique test run ID
            const testRunId = uuidv4();

            // Update the current history item with the testRunId and clear any prior testResults
            currentHistory = { ...currentHistory, testRunId, testResults: {} };
            setSelectedHistoryItem(currentHistory);
            setPromptHistory(prev => ({
                ...prev,
                items: prev.items.map(item =>
                    item.id === currentHistory.id ? currentHistory : item
                )
            }));

            // Capture the target history item and its test run ID – this ensures that even if the user switches active history afterward, our callbacks update the proper item.
            currentTestHistoryRef.current = { id: currentHistory.id, testRunId };

            setIsTestingPrompt(true);
            testModelRefs.current.forEach((modelRef) => {
                if (modelRef?.runTest) {
                    modelRef.runTest();
                }
            });
        }
    };

    const handleNewIteration = () => {
        if (!autoHistory) {
            // Create a pending history item with values from the previously selected item
            const newItem = {
                id: Date.now().toString(),
                parentId: selectedHistoryItem?.id || null,
                name: selectedHistoryItem?.userInput?.slice(0, 50) || 'New Iteration', // Use previous name
                timestamp: new Date().toISOString(),
                userInput: selectedHistoryItem?.userInput || '', // Pre-populate userInput
                generatedPrompt: selectedHistoryItem?.generatedPrompt || '', // Pre-populate generatedPrompt
                selectedModels: [],
                testContext: '',
                testResults: {}
            };

            setPromptHistory(prev => ({
                ...prev,
                items: [newItem, ...prev.items]
            }));
            setSelectedHistoryItem(newItem);
            setPendingHistoryItem(newItem);

            // Also update the form fields with the pre-populated data
            setUserInput(selectedHistoryItem?.userInput || '');
            setGeneratedPrompt(selectedHistoryItem?.generatedPrompt || '');
            setSelectedModels([]);
            setTestContext('');
            setTestResults({});
        }
    };
    const updatePendingHistoryItem = (currentTestResults = null) => {
        if (!selectedHistoryItem) return;

        const updatedItem = {
            ...selectedHistoryItem,
            userInput,
            generatedPrompt,
            selectedModels,
            testContext: testContext || '',
            testResults: currentTestResults || testResults || {},
            name: userInput.slice(0, 50)
        };

        setPromptHistory(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === selectedHistoryItem.id ? updatedItem : item
            )
        }));
        setSelectedHistoryItem(updatedItem);
        setPendingHistoryItem(updatedItem);
    };


    const getModels = async () => {
        try {
            const response = await fetch(`/api/manageModels`, {
                method: "GET",
            });
            const data = await response.json();
            if (data.models) {
                setAvailableModels(data.models);
            }
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const filteredModels = availableModels.filter(model =>
        model.name.toLowerCase().includes(modelSearch.toLowerCase())
    );

    const [promptHistory, setPromptHistory] = useState(() => {
        if (initialData && initialData.items) {
            return {
                id: initialData.promptId,
                items: initialData.items
            };
        }
        return { items: [] };
    });


    const handleAutoSave = async () => {
        try {
            const latestItem = {
                ...promptHistory.items[0],
                generatedPrompt: generatedPrompt
            };
            const defaultTitle = latestItem?.userInput?.slice(0, 50) || 'New Prompt History';

            if (!currentPromptId) {
                // Create new prompt list item
                const promptResponse = await fetch('/api/prompting/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: defaultTitle,
                    })
                });

                if (!promptResponse.ok) {
                    throw new Error('Failed to create prompt');
                }

                const promptData = await promptResponse.json();
                promptId = promptData.data; // Extract the ID from the response data
                setCurrentPromptId(promptId);

                // Initial save of prompt details
                const detailsResponse = await fetch('/api/prompting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: promptId,
                        items: [
                            {
                                id: latestItem.id,
                                parentId: latestItem.parentId,
                                name: latestItem.name,
                                timestamp: latestItem.timestamp,
                                userInput: latestItem.userInput,
                                generatedPrompt: latestItem.generatedPrompt,
                                selectedModels: latestItem.selectedModels,
                                testContext: latestItem.testContext,
                                testResults: latestItem.testResults
                            },
                            ...promptHistory.items.slice(1).map(item => ({
                                id: item.id,
                                parentId: item.parentId,
                                name: item.name,
                                timestamp: item.timestamp,
                                userInput: item.userInput,
                                generatedPrompt: item.generatedPrompt,
                                selectedModels: Array.isArray(item.selectedModels) ? item.selectedModels : [],
                                testContext: item.testContext || '',
                                testResults: item.testResults || {}
                            }))
                        ]
                    })
                });

                if (!detailsResponse.ok) {
                    throw new Error('Failed to save prompt details');
                }
            } else {
                // Update prompt list item first
                const listResponse = await fetch('/api/prompting/list', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: currentPromptId,
                        name: defaultTitle,
                    })
                });

                if (!listResponse.ok) {
                    throw new Error('Failed to update prompt list');
                }

                // Then update prompt details
                const detailsResponse = await fetch('/api/prompting', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: currentPromptId,
                        items: [
                            { ...latestItem },
                            ...promptHistory.items.slice(1)
                        ]
                    })
                });

                if (!detailsResponse.ok) {
                    throw new Error('Failed to update prompt details');
                }
            }

        } catch (error) {
            console.error('Error saving prompt:', error);
            toast.error('Failed to save prompt');
        }
    };

    const handleManualSave = () => {

        const latestItem = promptHistory.items[0];
        const defaultTitle = latestItem?.userInput?.slice(0, 50) || 'New Prompt History';

        setSaveTitle(defaultTitle);
        setShowSaveDialog(true);
    };

    const handleSaveConfirm = async () => {
        try {
            let promptId = currentPromptId;

            if (!promptId) {
                // Create new prompt if we don't have an ID
                const promptResponse = await fetch('/api/prompting/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: saveTitle,
                    })
                });

                if (!promptResponse.ok) {
                    throw new Error('Failed to create prompt');
                }

                const promptData = await promptResponse.json();
                promptId = promptData.data; // Extract the ID from the response data
                setCurrentPromptId(promptId);


                // Initial save of prompt details
                const detailsResponse = await fetch('/api/prompting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: promptId,
                        items: promptHistory.items.map(item => ({
                            id: item.id,
                            parentId: item.parentId,
                            name: item.name,
                            timestamp: item.timestamp,
                            userInput: item.userInput,
                            generatedPrompt: item.generatedPrompt,
                            selectedModels: Array.isArray(item.selectedModels) ? item.selectedModels : [],
                            testContext: item.testContext || '',
                            testResults: item.testResults || {}
                        }))
                    })
                });

                if (!detailsResponse.ok) {
                    throw new Error('Failed to save prompt details');
                }
            } else {
                // Update prompt list item first
                const listResponse = await fetch('/api/prompting/list', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: promptId,
                        name: saveTitle,
                    })
                });

                if (!listResponse.ok) {
                    throw new Error('Failed to update prompt list');
                }

                // Then update prompt details
                const detailsResponse = await fetch('/api/prompting', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt_id: promptId,
                        items: promptHistory.items
                    })
                });

                if (!detailsResponse.ok) {
                    throw new Error('Failed to update prompt details');
                }
            }

            toast.success('Prompt saved successfully!');
            setShowSaveDialog(false);

        } catch (error) {
            console.error('Error saving prompt:', error);
            toast.error('Failed to save prompt');
        }
    };

    // Add this debug function
    const debugState = () => {
        console.log('=== Current State Debug ===');
        console.log('Initial Data:', initialData);
        console.log('Current History:', promptHistory);
        console.log('Selected Item:', selectedHistoryItem);
        console.log('Form State:', {
            userInput,
            generatedPrompt,
            testContext,
            selectedModels,
            testResults
        });
        console.log('========================');
    };

    const hasUnsavedChanges = () => {
        debugState(); // Add this debug call

        // First check current form state against selected history item
        if (selectedHistoryItem) {
            const hasCurrentChanges =
                userInput !== selectedHistoryItem.userInput ||
                generatedPrompt !== selectedHistoryItem.generatedPrompt ||
                testContext !== selectedHistoryItem.testContext ||
                JSON.stringify(selectedModels) !== JSON.stringify(selectedHistoryItem.selectedModels) ||
                JSON.stringify(testResults) !== JSON.stringify(selectedHistoryItem.testResults);

            if (hasCurrentChanges) {
                console.log('Form state changes detected');
                return true;
            }
        }

        // If there's no initial data, check if we have any content
        if (!initialData) {
            const hasContent = promptHistory.items.some(item =>
                item.userInput?.trim() || item.generatedPrompt?.trim()
            );
            if (hasContent) {
                console.log('New content detected without initial data');
                return true;
            }
        }

        // Compare current promptHistory with initialData
        if (!initialData?.items || !promptHistory.items) return false;

        // Check if number of items changed
        if (initialData.items.length !== promptHistory.items.length) {
            console.log('Number of items changed');
            return true;
        }

        // Compare each item's content including names
        const hasChanges = promptHistory.items.some((currentItem) => {
            const originalItem = initialData.items.find(item => item.id === currentItem.id);
            if (!originalItem) {
                console.log('New item detected:', currentItem.id);
                return true;
            }

            const itemChanged =
                currentItem.name !== originalItem.name ||
                currentItem.userInput !== originalItem.user_input ||
                currentItem.generatedPrompt !== originalItem.generated_prompt ||
                currentItem.testContext !== originalItem.test_context ||
                JSON.stringify(currentItem.testResults) !== JSON.stringify(originalItem.test_results) ||
                JSON.stringify(currentItem.selectedModels) !== JSON.stringify(originalItem.selected_models);

            if (itemChanged) {
                console.log('Changes detected in item:', currentItem.id);
                console.log('Original:', originalItem);
                console.log('Current:', currentItem);
            }

            return itemChanged;
        });

        console.log('Has changes:', hasChanges);
        return hasChanges;
    };

    const handleBack = () => {
        console.log('Back button clicked');
        const hasChanges = hasUnsavedChanges();
        console.log('Has unsaved changes:', hasChanges);

        if (hasChanges) {
            console.log('Showing save dialog');
            // Set initial save title based on current item
            const latestItem = promptHistory.items[0];
            const defaultTitle = latestItem?.userInput?.slice(0, 50) || 'New Prompt History';
            setSaveTitle(defaultTitle);
            setShowSaveDialog(true);
        } else {
            console.log('No changes detected, going back');
            onBack();
        }
    };

    // Add this effect to update promptHistory when form fields change
    useEffect(() => {
        if (selectedHistoryItem) {
            console.log('Form fields changed, updating promptHistory');
            const updatedItem = {
                ...selectedHistoryItem,
                userInput,
                generatedPrompt,
                selectedModels,
                testContext,
                testResults
            };

            setPromptHistory(prev => ({
                ...prev,
                items: prev.items.map(item =>
                    item.id === selectedHistoryItem.id ? updatedItem : item
                )
            }));
        }
    }, [userInput, generatedPrompt, selectedModels, testContext, testResults]);

    const createHistoryItem = (parentId = null, currentTestResults = null) => {
        const newHistoryItem = {
            id: uuidv4(),
            parentId: parentId,
            name: userInput.slice(0, 50),
            timestamp: new Date().toISOString(),
            userInput,
            generatedPrompt,
            selectedModels: selectedModels.map(model => model.model_id),
            testContext: testContext || '',
            testResults: currentTestResults || {}
        };

        if (parentId) {
            const updatedHistory = [...promptHistory.items];
            const insertIndex = findLastBranchIndex(parentId, updatedHistory) + 1;
            updatedHistory.splice(insertIndex, 0, newHistoryItem);
            setPromptHistory({
                ...promptHistory,
                items: updatedHistory
            });
        } else {
            setPromptHistory({
                ...promptHistory,
                items: [newHistoryItem, ...promptHistory.items]
            });
        }

        setSelectedHistoryItem(newHistoryItem);
    };


    // Function to update the name of a history item
    const updateItemName = (itemId, newName) => {
        setPromptHistory(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === itemId ? { ...item, name: newName } : item
            )
        }));
    };

    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
    const currentTestHistoryRef = useRef(null); // NEW: Capture which history item is being tested

    const [autoHistory, setAutoHistory] = useState(true); // New state for automatic history toggle
    useEffect(() => {
        if (!autoHistory && promptHistory.items.length === 0) {
            const initialItem = {
                id: Date.now().toString(),
                parentId: null,
                name: 'New Iteration',
                timestamp: new Date().toISOString(),
                userInput: '',
                generatedPrompt: '',
                selectedModels: [],
                testContext: '',
                testResults: {}
            };
            setPromptHistory({
                ...promptHistory,
                items: [initialItem]
            });
            setSelectedHistoryItem(initialItem);
            setPendingHistoryItem(initialItem);
        }
    }, [autoHistory]);
    const findLastBranchIndex = (parentId, history) => {
        let lastIndex = history.findIndex(item => item.id === parentId);
        const prefix = parentId + '.';

        history.forEach((item, index) => {
            if (item.id.startsWith(prefix) && index > lastIndex) {
                lastIndex = index;
            }
        });

        return lastIndex;
    };
    // Add this function to save new prompts to history
    const saveToHistory = () => {
        const newHistoryItem = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            userInput,
            generatedPrompt,
            selectedModels,
            testContext,
            testResults
        };
        setPromptHistory(prev => ({
            ...prev,
            items: [newHistoryItem, ...prev.items]
        }));
    };

    const handlePromptUpdate = (updatedPrompt) => {
        setGeneratedPrompt(updatedPrompt);
    };
    // Add this function to restore from history
    const restoreFromHistory = (historyItem) => {
        setSelectedHistoryItem(historyItem);
        setUserInput(historyItem.userInput);
        setGeneratedPrompt(historyItem.generatedPrompt);
        const validModels = historyItem.selectedModels?.filter(selected =>
            availableModels.some(model => model.model_id === selected)
        ) || [];
        setSelectedModels(historyItem.selectedModels);
        setTestContext(historyItem.testContext);
        setTestResults(historyItem.testResults);
    };

    const handleStopGeneration = () => {
        setIsGenerating(false);
        setStreamIndex(0);
        if (abortController) {
            abortController.abort();
            setAbortController(null);
        }

        // Only create/update history if we have generated content
        if (generatedPrompt) {
            if (autoHistory) {
                // Special case: If this is the first item (only blank item exists)
                if (promptHistory.length === 1 && !promptHistory[0].generatedPrompt) {
                    // Override the blank item
                    updatePendingHistoryItem();
                } else {
                    // Normal automatic history behavior
                    if (!selectedHistoryItem) {
                        createHistoryItem();
                    } else {
                        createHistoryItem(selectedHistoryItem.id);
                    }
                }
            } else {
                // In manual mode, always update the selected item
                updatePendingHistoryItem();
            }
        }
    };

    const hasInputChanged = () => {
        if (!selectedHistoryItem) {
            // If no history item is selected, enable button if there's any input
            return userInput.trim() !== '';
        }
        // Compare with selected history item's input
        return userInput?.trim() !== selectedHistoryItem.userInput?.trim();
    };
    const handleSubmit = async () => {
        if (!hasInputChanged() && !isGenerating) {
            toast.info("No changes to submit");
            return;
        }

        if (!selectedVectorStore) {
            toast.error("Please select a knowledge base first");
            return;
        }

        setIsGenerating(true);
        const controller = new AbortController();
        setAbortController(controller);

        try {
            const response = await fetch('/api/prompting/list/optimizer/rag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store_id: selectedVectorStore,
                    target_behavior: userInput
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const result = data.data;

            // Update state with new results
            setGeneratedPrompt(result.optimized_prompt);
            setValidationScore(result.validation_score);
            setValidationDetails(result.validation_details || []);
            // History management using existing patterns
            if (autoHistory) {
                // Use createHistoryItem to maintain parent/child relationships
                createHistoryItem(selectedHistoryItem?.id || null, {
                    testResults: {}, // Preserve existing test results pattern
                    validationScore: result.validation_score,
                    sampleContexts: result.sample_context_used,
                    vectorStore: selectedVectorStore
                });
            } else {
                // For manual history, update pending item with RAG data
                const updatedItem = {
                    ...pendingHistoryItem,
                    userInput,
                    generatedPrompt: result.optimized_prompt,
                    validationScore: result.validation_score,
                    sampleContexts: result.sample_context_used,
                    vectorStore: selectedVectorStore
                };

                setPendingHistoryItem(updatedItem);
                setPromptHistory(prev => ({
                    ...prev,
                    items: prev.items.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                }));
            }

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error:', error);
                toast.error(error.message || 'Failed to generate prompt');
            }
        } finally {
            setIsGenerating(false);
            setAbortController(null);
        }
    };
    const deleteHistoryItem = (itemId) => {
        const itemsToDelete = new Set();

        const findChildren = (id) => {
            itemsToDelete.add(id);
            promptHistory.items.forEach(item => {
                if (item.parentId === id) {
                    findChildren(item.id);
                }
            });
        };

        findChildren(itemId);

        // Filter out all items that should be deleted
        const updatedItems = promptHistory.items.filter(item => !itemsToDelete.has(item.id));

        // If the deleted item was selected, clear the selection
        if (selectedHistoryItem?.id === itemId) {
            setSelectedHistoryItem(null);
        }

        // Create new blank item if this was the last item and auto history is disabled
        if (updatedItems.length === 0 && !autoHistory) {
            const initialItem = {
                id: Date.now().toString(),
                parentId: null,
                name: 'New Iteration',
                timestamp: new Date().toISOString(),
                userInput: '',
                generatedPrompt: '',
                selectedModels: [],
                testContext: '',
                testResults: {}
            };
            setPromptHistory({
                ...promptHistory,
                items: [initialItem]
            });
            setSelectedHistoryItem(initialItem);
            setPendingHistoryItem(initialItem);
        } else {
            setPromptHistory({
                ...promptHistory,
                items: updatedItems
            });
        }
    };

    const [editingId, setEditingId] = useState(null);
    const [customNames, setCustomNames] = useState({});



    const hasChanges = () => {
        if (!selectedHistoryItem) return false;

        return (
            userInput !== selectedHistoryItem.userInput ||
            generatedPrompt !== selectedHistoryItem.generatedPrompt ||
            testContext !== selectedHistoryItem.testContext ||
            JSON.stringify(selectedModels) !== JSON.stringify(selectedHistoryItem.selectedModels) ||
            JSON.stringify(testResults) !== JSON.stringify(selectedHistoryItem.testResults)
        );
    };

    const SaveDialog = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-medium mb-4">Save Changes?</h3>
                <input
                    type="text"
                    value={saveTitle}
                    onChange={(e) => setSaveTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Enter a title"
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            setShowSaveDialog(false);
                            setSaveTitle('');
                            onBack(); // Exit without saving
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Exit without saving
                    </button>
                    <button
                        onClick={async () => {
                            await handleSaveConfirm();
                            onBack(); // Exit after saving
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        disabled={!saveTitle.trim()}
                    >
                        Save and exit
                    </button>
                </div>
            </div>
        </div>
    );

    const isAnyModelLoading = () => {
        let isLoading = false;
        testModelRefs.current.forEach((ref) => {
            if (ref?.isLoading) {
                isLoading = true;
            }
        });
        return isLoading;
    };
    useEffect(() => {
        if (!isAnyModelLoading() && isTestingPrompt) {
            setIsTestingPrompt(false);
        }
    }, [isAnyModelLoading()]);

    const stopAllTests = () => {
        testModelRefs.current.forEach((ref) => {
            if (ref?.stop) {
                ref.stop();
            }
        });
        setIsTestingPrompt(false);
    };
    const loadingStatesRef = useRef({});

    const handleLoadingChange = useCallback((modelId, isLoading) => {
        loadingStatesRef.current[modelId] = isLoading;
        const isAnyLoading = Object.values(loadingStatesRef.current).some(state => state);

        if (!isAnyLoading) {
            setIsTestingPrompt(false);
        }
    }, []);
    return (
        <div className="max-w-7xl mx-auto mt-8">
            {/* Header with Back button only */}
            <div className="mb-6">
                {!hideBackToMenu && (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                    >
                        <FaArrowLeft /> Back
                    </button>
                )}
            </div>

            <div className="flex gap-6">
                {/* History Sidebar */}
                <div className="w-64 pr-6 border-r border-gray-200 h-[calc(100vh-8rem)] overflow-y-auto">
                    {/* Auto History toggle and Save button */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Automatic History</span>
                            <Switch
                                checked={autoHistory}
                                onChange={setAutoHistory}
                                className={`${autoHistory ? 'bg-blue-600' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                            >
                                <span
                                    className={`${autoHistory ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                        </div>
                        <button
                            onClick={handleManualSave}
                            className="flex items-center text-gray-600 hover:text-gray-800"
                            title="Save History"
                        >
                            <FaSave className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="font-medium text-lg mb-2">Prompt History</h3>
                    <div className="h-px bg-gray-200 mb-4" />
                    <button
                        onClick={handleNewIteration}
                        className={`flex items-center gap-1 px-2 py-1 mb-4 text-sm text-blue-600 
    ${isTestingPrompt
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:text-blue-800 hover:bg-blue-50'} 
    rounded-md transition-colors w-full`}          >
                        <span className="text-lg leading-none">+</span>
                        New Iteration
                    </button>
                    <div className="space-y-2">
                        {promptHistory.items
                            .filter(item => !item.parentId)
                            .map(item => (
                                <HistoryItem
                                    key={item.id}
                                    item={item}
                                    restoreFromHistory={restoreFromHistory}
                                    deleteHistoryItem={deleteHistoryItem}
                                    selectedHistoryItem={selectedHistoryItem}
                                    promptHistory={promptHistory.items}
                                    availableModels={availableModels}
                                    updateItemName={updateItemName}
                                />
                            ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-[calc(100vh-8rem)]">
                    {/* Knowledge Base Header */}
                    <div className="bg-white p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <BiBrain className="text-blue-600 text-xl" />
                                <h3 className="text-lg font-medium">Knowledge Configuration</h3>
                            </div>
                        </div>

                        {/* Vector Store Selection */}
                        <div className="flex items-center gap-4">
                            <Listbox value={selectedVectorStore} onChange={handleVectorStoreSelect}>
                                {({ open }) => (
                                    <>
                                        <div className="relative sm:w-[300px]"> {/* Increased width */}
                                            <Listbox.Button className="relative w-full cursor-pointer hover:bg-gray-50 transition-colors duration-150 
                        border border-[#CCCCCC] rounded-lg block font-Inter text-[14px] text-[#464F60] 
                        font-medium pl-4 pr-10 py-2.5"> {/* Enhanced button styling */}
                                                <span className="flex items-center gap-2">
                                                    <BiBrain className="text-blue-600 text-lg" />
                                                    <span className="block truncate text-left">
                                                        {selectedVectorStore
                                                            ? vectorStores.find(store => store.store_id === selectedVectorStore)?.name
                                                            : 'Select Knowledge Base'}
                                                    </span>
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                    <MdKeyboardArrowUp
                                                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${open ? 'rotate-0' : 'rotate-180'
                                                            }`}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-2 w-full bg-white shadow-lg 
                            border border-gray-200 rounded-lg py-2 text-base focus:outline-none
                            max-h-[300px] overflow-auto">
                                                    <div className="sticky top-0 bg-white px-3 py-2 border-b border-gray-100">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                className="w-full px-4 py-2 pr-8 text-sm border border-gray-200 
                                            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                                            focus:border-transparent"
                                                                placeholder="Search knowledge bases..."
                                                                value={vectorStoreSearch}
                                                                onChange={(e) => setVectorStoreSearch(e.target.value)}
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="py-2">
                                                        {filteredVectorStores?.length === 0 ? (
                                                            <div className="px-4 py-2 text-sm text-gray-500 text-center">
                                                                No knowledge bases found
                                                            </div>
                                                        ) : (
                                                            filteredVectorStores?.map((vectorStore) => (
                                                                <Listbox.Option
                                                                    key={vectorStore.store_id}
                                                                    value={vectorStore.store_id}
                                                                    className={({ active, selected }) =>
                                                                        classNames(
                                                                            "relative cursor-pointer select-none py-3 pl-10 pr-4 mx-2 rounded-md",
                                                                            active ? "bg-blue-50" : "",
                                                                            selected ? "bg-blue-100" : ""
                                                                        )
                                                                    }
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span className={classNames(
                                                                                    "block truncate",
                                                                                    selected ? "font-semibold text-blue-600" : "font-normal text-gray-700"
                                                                                )}>
                                                                                    {vectorStore.name}
                                                                                </span>
                                                                            </div>

                                                                            {selected && (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                                    </svg>
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))
                                                        )}
                                                    </div>
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>

                            {selectedVectorStore && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-blue-700 font-medium">
                                        Collection:
                                    </span>
                                    <code className="text-sm bg-blue-100 px-2 py-0.5 rounded text-blue-800">
                                        {chromaCollectionName}
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Input Section */}
                        <div className="relative">
                            <textarea
                                className="w-full p-4 border-r border-gray-300 rounded-l-md font-mono min-h-[200px] bg-gray-50"
                                placeholder="What should the AI model do?"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={isGenerating ? handleStopGeneration : handleSubmit}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isGenerating
                                        ? 'bg-red-100 hover:bg-red-200 text-red-600'
                                        : hasInputChanged()
                                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={!hasInputChanged() && !isGenerating}
                                    title={isGenerating ? "Stop Generation" : "Generate Prompt"}
                                >
                                    {isGenerating ? (
                                        <FaStop className="w-4 h-4" />
                                    ) : (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="relative">
                            <div className="absolute -top-[1.75rem] left-0 text-sm text-gray-500">
                                Generated Prompt
                            </div>
                            <button
                                onClick={() => setShowPromptOverlay(true)}
                                className="w-full text-left relative border-l border-gray-300 bg-green-50 p-4 rounded-r-md font-mono h-[200px] overflow-y-auto hover:bg-green-100 transition-colors group"
                            >
                                <div className="flex flex-col">
                                    {/* Render the full generated prompt */}
                                    <div>{generatedPrompt}</div>
                                    {/* Optionally, show a spinner if needed */}
                                    {isGenerating && (
                                        <div className="flex items-center gap-2 text-gray-500 mt-2">
                                            <div className="animate-spin w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                                            <span>Thinking...</span>
                                        </div>
                                    )}
                                </div>

                                {/* Edit indicator */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-200 px-3 py-1.5 rounded">
                                        <FaPencilAlt className="w-3 h-3" />
                                        <span>View/Edit</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Test Prompt Section */}
                    {generatedPrompt && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium mb-3">Optimization Details</h3>
                            {validationScore && (
                                <div className="mb-4">
                                    <span className="text-sm font-medium text-gray-700">Validation Score: </span>
                                    <span className="text-blue-600 font-mono">
                                        {Math.round(validationScore * 100)}%
                                    </span>

                                    {/* Progress bar container with full gradient */}
                                    <div className="relative w-full h-2 mt-1 rounded-full bg-gray-200 overflow-hidden">
                                        {/* Full gradient background (always visible but covered) */}
                                        <div className="absolute inset-0 w-full h-full"
                                            style={{
                                                background: `linear-gradient(90deg, 
               hsl(0, 100%, 50%) 0%, 
               hsl(30, 100%, 50%) 25%, 
               hsl(60, 100%, 50%) 50%, 
               hsl(90, 100%, 50%) 75%, 
               hsl(120, 100%, 50%) 100%)`
                                            }}></div>

                                        {/* White overlay that covers part of the gradient */}
                                        <div className="absolute top-0 bottom-0 right-0 bg-white h-full transition-all duration-500"
                                            style={{
                                                width: `${100 - Math.round(validationScore * 100)}%`
                                            }}></div>
                                    </div>
                                </div>
                            )}


                            {validationDetails?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        Validation Details:
                                    </h4>
                                    <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Context</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Response</th>
                                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Score</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {validationDetails.map((detail, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 text-sm text-gray-800">
                                                            <div className="max-h-32 overflow-y-auto">
                                                                <div className="whitespace-pre-wrap break-words pr-2">
                                                                    {detail.context_snippet || "No context provided"}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-2 text-sm text-gray-800">
                                                            <div className="max-h-32 overflow-y-auto">
                                                                <div className="whitespace-pre-wrap break-words pr-2">
                                                                    {detail.question}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-2 text-sm text-gray-800">
                                                            <div className="max-h-32 overflow-y-auto">
                                                                <div className="whitespace-pre-wrap break-words pr-2">
                                                                    {detail.model_response}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-2 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${detail.validation_passed
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {detail.score.toFixed(1)}/10
                                                                </span>
                                                                <span className={`text-xs mt-1 ${detail.validation_passed ? 'text-green-600' : 'text-red-600'
                                                                    }`}>
                                                                    {detail.validation_passed ? 'Passed' : 'Failed'}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-2 text-sm text-gray-800">
                                                            <div className="max-h-32 overflow-y-auto">
                                                                <div className="whitespace-pre-wrap break-words pr-2">
                                                                    {detail.feedback}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {generatedPrompt && !isGenerating && (
                        <div className="border-t pt-6 mt-6">
                            <div className="mt-4 space-y-4">
                                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                                    {/* Test Context Input */}
                                    <div>
                                        <h3 className="font-medium mb-3">Test Context (Optional)</h3>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Add any additional context or variables for testing your prompt..."
                                            value={testContext}
                                            onChange={(e) => setTestContext(e.target.value)}
                                        />
                                    </div>

                                    {/* Model Selection */}
                                    <div>
                                        <h3 className="font-medium mb-3">Select models to test with:</h3>
                                        <div className="relative w-full">
                                            <Listbox
                                                value={selectedModels}
                                                onChange={setSelectedModels}
                                                multiple
                                            >
                                                <div className="relative">
                                                    <Listbox.Button className="relative w-full min-h-[42px] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedModels.length === 0 ? (
                                                                <span className="text-gray-500">Select models...</span>
                                                            ) : (
                                                                selectedModels.map((modelId) => {
                                                                    const model = availableModels.find(m => m.model_id === modelId);
                                                                    return model ? (
                                                                        <span
                                                                            key={modelId}
                                                                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm group"
                                                                        >
                                                                            {model.name}
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setSelectedModels(selectedModels.filter(id => id !== modelId));
                                                                                }}
                                                                                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                                                            >
                                                                                <FaTimes className="h-3 w-3 hover:text-blue-600" />
                                                                            </button>
                                                                        </span>
                                                                    ) : null;
                                                                })
                                                            )}
                                                        </div>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {/* Search input remains the same */}
                                                            {filteredModels.map((model) => {
                                                                const isSelected = selectedModels.includes(model.model_id);
                                                                return (
                                                                    <Listbox.Option
                                                                        key={model.model_id}
                                                                        value={model.model_id}
                                                                        className={({ active }) =>
                                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100' : 'bg-white'
                                                                            }`
                                                                        }
                                                                    >
                                                                        {() => (
                                                                            <>
                                                                                <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>
                                                                                    {model.name}
                                                                                </span>
                                                                                {isSelected && (
                                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                        <FaCheck className="h-4 w-4" aria-hidden="true" />
                                                                                    </span>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                );
                                                            })}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>

                                {/* Test Button */}
                                <button
                                    onClick={handleRunTests}
                                    disabled={selectedModels.length === 0 && !isTestingPrompt}
                                    className={`px-6 py-2 flex items-center gap-2 ${(isTestingPrompt)
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : selectedModels.length === 0
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        } rounded-md transition-colors`}
                                >
                                    {(isTestingPrompt) ? (
                                        <>
                                            <FaStop className="w-4 h-4" />
                                            <span>Stop Test</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="w-4 h-4" />
                                            <span>Run Test</span>
                                        </>
                                    )}
                                </button>
                                {/* Test Results */}
                                {selectedModels.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                        {selectedModels.map((modelId) => {
                                            const modelInfo = availableModels.find(m => m.model_id === modelId);
                                            return modelInfo ? (
                                                <TestModel
                                                    key={modelId}
                                                    ref={(el) => {
                                                        if (el) {
                                                            testModelRefs.current.set(modelId, el);
                                                        } else {
                                                            testModelRefs.current.delete(modelId);
                                                        }
                                                    }}
                                                    onLoadingChange={(isLoading) => handleLoadingChange(modelId, isLoading)}
                                                    model={{
                                                        ...modelInfo,
                                                        testResult: selectedHistoryItem?.testResults?.[modelId]
                                                    }}
                                                    prompt={generatedPrompt}
                                                    testContext={testContext}
                                                    setPromptHistory={setPromptHistory}        // Add these props
                                                    selectedHistoryItem={selectedHistoryItem}  // Add these props
                                                />
                                            ) : null;
                                        })}

                                    </div>

                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* Prompt Overlay */}
            <PromptOverlay
                isOpen={showPromptOverlay}
                onClose={() => setShowPromptOverlay(false)}
                prompt={generatedPrompt}
                onUpdate={handlePromptUpdate}
                setPrompt={setGeneratedPrompt}

            />
            {showSaveDialog && <SaveDialog />}

        </div>
    );
};

export default RAGPrompting;