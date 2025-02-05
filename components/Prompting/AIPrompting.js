import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaSearch, FaChevronDown, FaTimes, FaPencilAlt, FaSave, FaStop } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PromptOverlay from './PromptOverlay';
import { Switch } from '@headlessui/react';
import HistoryItem from './HistoryItem';
import { v4 as uuidv4 } from 'uuid'; // Add this import at the top

const AIPrompting = ({ onBack, initialData = null, hideBackToMenu = false }) => {

  // Add these state variables to your component

  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearch, setModelSearch] = useState('');
  const [showPromptOverlay, setShowPromptOverlay] = useState(false);
  const [currentPromptId, setCurrentPromptId] = useState(initialData?.prompt_id || null);

  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [streamIndex, setStreamIndex] = useState(0);
  const [testResults, setTestResults] = useState({});
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);


  const [testContext, setTestContext] = useState('');

  useEffect(() => {
    if (Object.keys(testResults).length > 0) {
      // Update history whenever testResults changes
      if (autoHistory) {
        if (!selectedHistoryItem) {
          createHistoryItem(null);
        } else {
          createHistoryItem(selectedHistoryItem.id);
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
  const handleNewIteration = () => {
    if (!autoHistory) {
      // Create a pending history item with empty/default values
      const newItem = {
        id: Date.now().toString(),
        parentId: selectedHistoryItem?.id || null,
        name: 'New Iteration', // Default name until content is saved
        timestamp: new Date().toISOString(),
        userInput: '',
        generatedPrompt: '',
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
    }

    // Clear all fields
    setUserInput('');
    setGeneratedPrompt('');
    setSelectedModels([]);
    setTestContext('');
    setTestResults({});

    if (autoHistory) {
      setSelectedHistoryItem(null);
    }
  };

  const updatePendingHistoryItem = () => {
    if (!selectedHistoryItem) return;

    const updatedItem = {
      ...selectedHistoryItem,
      userInput,
      generatedPrompt,
      selectedModels,
      testContext: testContext || '',
      testResults: testResults || {},  // Use passed results or fall back to state
      name: userInput.slice(0, 50)
    };

    setPromptHistory(prev => {
      const newHistory = {
        ...prev,
        items: prev.items.map(item =>
          item.id === selectedHistoryItem.id ? updatedItem : item
        )
      };
      return newHistory;
    });
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
      console.log('Initializing promptHistory with:', initialData);
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


  const handleBack = () => {
    if (promptHistory.items.length > 0) {
      handleAutoSave();
    } else {
      onBack();
    }
  };


  const createHistoryItem = (parentId = null) => {
    const newHistoryItem = {
      id: uuidv4(), // Generate new UUID
      parentId: parentId, // null for root items, parent's UUID for children
      name: userInput.slice(0, 50),
      timestamp: new Date().toISOString(),
      userInput,
      generatedPrompt,
      selectedModels: selectedModels.map(model => model.model_id), // Only store model_ids
      testContext: testContext || '',
      testResults: currentTestResults || testResults || {}  // Use passed results or fall back to state
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
  const [autoHistory, setAutoHistory] = useState(false); // New state for automatic history toggle
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
  // ... existing code ...
  const handleSubmit = async () => {
    setIsGenerating(true);
    setGeneratedPrompt(''); // Clear any previous response

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/prompting/list/optimizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructions: userInput,
          generated_prompt: generatedPrompt || undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fullResponse = data.data;

      // Set full text response directly
      setGeneratedPrompt(fullResponse);

      // After receiving the full response, update history if needed
      if (autoHistory) {
        if (
          promptHistory.items.length === 1 &&
          !promptHistory.items[0].generatedPrompt
        ) {
          updatePendingHistoryItem();
        } else {
          if (!selectedHistoryItem) {
            createHistoryItem();
          } else {
            createHistoryItem(selectedHistoryItem.id);
          }
        }
      } else {
        updatePendingHistoryItem();
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error:', error);
        toast.error('Failed to generate prompt');
      }
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  };

  // ... existing code ...
  const handleTestPrompt = async () => {
    if (selectedModels.length === 0) {
      toast.error("Please select at least one model");
      return;
    }

    setIsTestingPrompt(true);
    const newTestResults = {};  // Create new object to store results

    try {
      const modelStreams = selectedModels.map(async (modelId) => {
        // Get the full model info for the name
        const modelInfo = availableModels.find(m => m.model_id === modelId);
        const dummyTestResponse = `${testContext ? '[Using provided context]\n\n' : ''}This is a simulated response from ${modelInfo?.name || modelId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

        // Initialize empty result for this model
        newTestResults[modelId] = '';
        setTestResults(prev => ({ ...prev, [modelId]: '' }));

        // Simulate streaming for this model
        for (let index = 0; index < dummyTestResponse.length; index++) {
          await new Promise(resolve => setTimeout(resolve, 20));
          newTestResults[modelId] = (newTestResults[modelId] || '') + dummyTestResponse[index];
          setTestResults(prev => ({
            ...prev,
            [modelId]: newTestResults[modelId]
          }));
        }
      });

      // Run all streams in parallel
      await Promise.all(modelStreams);

      setTestResults(newTestResults);

      // Update the history with newTestResults directly instead of waiting for state
      if (autoHistory) {
        if (!selectedHistoryItem) {
          createHistoryItem(null, newTestResults);
        } else {
          createHistoryItem(selectedHistoryItem.id, newTestResults);
        }
      } else {
        updatePendingHistoryItem(newTestResults);
      }




      if (autoHistory) {
        if (!selectedHistoryItem) {
          createHistoryItem();
        } else {
          createHistoryItem(selectedHistoryItem.id);
        }
      } else {
        updatePendingHistoryItem();
      }


    } catch (error) {
      console.error('Error testing prompt:', error);
      toast.error('An error occurred while testing the prompt');
    } finally {
      setIsTestingPrompt(false);
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
        <h3 className="text-lg font-medium mb-4">Save Prompt History</h3>
        <input
          type="text"
          value={saveTitle}
          onChange={(e) => setSaveTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter a title"
          autoFocus // Add this to automatically focus the input
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setShowSaveDialog(false);
              setSaveTitle(''); // Reset the title when closing
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={!saveTitle.trim()} // Disable if empty
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

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
                                    value={model.model_id} // Now we just pass the model_id
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
                  onClick={handleTestPrompt}
                  disabled={selectedModels.length === 0 || isTestingPrompt}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md 
                    ${selectedModels.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {isTestingPrompt ? 'Testing...' : 'Run Test'}
                </button>

                {/* Test Results */}
                {Object.keys(testResults).length > 0 && (
                  <div className="space-y-4">
                    {testContext && (
                      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-md">
                        <h4 className="font-medium text-sm text-blue-700 mb-2">Test Context:</h4>
                        <div className="font-mono text-sm whitespace-pre-wrap text-blue-900">
                          {testContext}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedModels.map((modelId) => {
                        const model = availableModels.find(m => m.model_id === modelId);
                        return model ? (
                          <div key={modelId} className="border rounded-md p-4">
                            <h4 className="font-medium mb-2 text-gray-700">
                              {model.name}
                            </h4>
                            <div className="bg-white p-3 rounded font-mono text-sm whitespace-pre-wrap">
                              {testResults[modelId]}
                              {isTestingPrompt && !testResults[modelId] && (
                                <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                              )}
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
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
        setPrompt={setGeneratedPrompt}  // Pass the setter directly

      />
      {showSaveDialog && <SaveDialog />}

    </div>
  );
};

export default AIPrompting;