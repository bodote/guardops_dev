import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaSearch, FaChevronDown, FaTimes, FaPencilAlt, FaSave, FaStop } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PromptOverlay from './PromptOverlay';
import { Switch } from '@headlessui/react';
import HistoryItem from './HistoryItem';

const AIPrompting = ({ onBack, initialData = null, hideBackToMenu = false }) => {

  // Add these state variables to your component
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearch, setModelSearch] = useState('');
  const [showPromptOverlay, setShowPromptOverlay] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [pendingHistoryItem, setPendingHistoryItem] = useState(null);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [streamIndex, setStreamIndex] = useState(0);
  const [showTestSection, setShowTestSection] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);

  const [testContext, setTestContext] = useState('');
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const dummyResponse = `Here's a simple example:

\`\`\`python
def greet(name="World"):
    # This function takes an optional parameter with default value "World"
    message = f"Hello, {name}!"
    return message

Let's break down the key components:

1. We define a function called \`greet\` that accepts an optional parameter
2. The function uses an f-string for string formatting
3. The \`if __name__ == "__main__":\` block is a common Python idiom for executable code`;

  const dummyTestResponse = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

  useEffect(() => {
    if (!initialData?.promptHistory && promptHistory.length === 0) {
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

      setPromptHistory([initialItem]);
      setSelectedHistoryItem(initialItem);
      setPendingHistoryItem(initialItem);
    }
  }, []);

  // Modify the streaming completion effect
  useEffect(() => {
    if (isGenerating && streamIndex < dummyResponse.length) {
      const timer = setTimeout(() => {
        setGeneratedPrompt(prev => prev + dummyResponse[streamIndex]);
        setStreamIndex(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    } else if (streamIndex >= dummyResponse.length) {
      setIsGenerating(false);
      setStreamIndex(0);

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
          // Manual mode - always update current item
          updatePendingHistoryItem();
        }
      }
    }
  }, [isGenerating, streamIndex]);

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

      setPromptHistory(prev => [newItem, ...prev]);
      setSelectedHistoryItem(newItem);
      setPendingHistoryItem(newItem);
    }

    // Clear all fields
    setUserInput('');
    setGeneratedPrompt('');
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
      testContext,
      testResults,
      name: userInput.slice(0, 50) // Update name with actual content
    };

    setPromptHistory(prev =>
      prev.map(item =>
        item.id === selectedHistoryItem.id ? updatedItem : item
      )
    );
    setSelectedHistoryItem(updatedItem);
    setPendingHistoryItem(updatedItem);
  };

  const handleSaveTemplate = async () => {
    try {
      // TODO: Implement API call to save template
      // await fetch('/api/saveTemplate', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: templateName,
      //     prompt: generatedPrompt
      //   })
      // });

      // Show success message (you might want to use a toast notification system)
      toast.success('Template saved successfully!', { autoClose: 1000 });
      // Reset and close popup
      setShowTemplatePopup(false);
      setTemplateName('');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    }
  };
  // Add this function to fetch models
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
  const startNewIteration = () => {
    const latestItem = promptHistory[0];
    const newHistoryItem = {
      id: Date.now().toString(),
      parentId: null,
      name: latestItem.userInput.slice(0, 50), // Initial name from userInput
      timestamp: new Date().toISOString(),
      userInput: latestItem.userInput,
      generatedPrompt: latestItem.generatedPrompt,
      selectedModels: latestItem.selectedModels,
      testContext: latestItem.testContext,
      testResults: {}  // Start with empty results
    };

    // Add to history and select it
    setPromptHistory([newHistoryItem, ...promptHistory]);
    restoreFromHistory(newHistoryItem);
  };

  // Add this function to filter models based on search
  const filteredModels = availableModels.filter(model =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  );
  const dummyHistory = [
    {
      id: '1',
      parentId: null,
      name: 'Create a professional email template', // Initially set from userInput

      timestamp: '2024-03-20T10:30:00',
      userInput: 'Create a professional email template for client outreach',
      generatedPrompt: 'Write an email template that establishes a professional tone...',
      selectedModels: [
        { model_id: 'gpt4', },
        { model_id: 'claude' }
      ],
      testContext: 'Company: TechCorp\nProduct: AI Solutions',
      testResults: {
        'gpt4': 'Dear [Name],\n\nI hope this email finds you well...',
        'claude': 'Hello [Name],\n\nI trust youre having a productive week...'
      }
    },
    {
      id: '1.1', // Using dot notation to indicate hierarchy
      parentId: '1',
      name: 'Create a professional email template', // Initially set from userInput

      timestamp: '2024-03-20T10:35:00',
      userInput: 'Create a professional email template for client outreach',
      generatedPrompt: 'Write an email template with a more casual tone...',
      selectedModels: [{ model_id: 'gpt4' }],
      testContext: 'Company: TechCorp\nProduct: AI Solutions\nTone: Casual',
      testResults: {
        'gpt4': 'Hey there!\n\nI wanted to reach out...'
      }
    }
  ];
  const [promptHistory, setPromptHistory] = useState(initialData?.promptHistory || []);
  //const [promptHistory, setPromptHistory] = useState(initialData?.promptHistory || dummyHistory);


  const saveVariation = (originalItem) => {
    const newHistoryItem = {
      id: `${originalItem.id}.${Date.now()}`,
      parentId: originalItem.id,
      name: userInput.slice(0, 50), // Initial name from userInput
      timestamp: new Date().toISOString(),
      userInput,
      generatedPrompt,
      selectedModels,
      testContext,
      testResults
    };

    const updatedHistory = [...promptHistory];
    const insertIndex = findLastBranchIndex(originalItem.id, updatedHistory) + 1;
    updatedHistory.splice(insertIndex, 0, newHistoryItem);
    setPromptHistory(updatedHistory);

    // Select the new item after saving
    setSelectedHistoryItem(newHistoryItem);

    // Optional: Show a success toast/notification
    // toast.success('Iteration saved successfully');
  };
  const createHistoryItem = (parentId = null) => {
    const newHistoryItem = {
      id: parentId ? `${parentId}.${Date.now()}` : Date.now().toString(),
      parentId,
      name: userInput.slice(0, 50), // Initial name from userInput
      timestamp: new Date().toISOString(),
      userInput,
      generatedPrompt,
      selectedModels,
      testContext,
      testResults: {}
    };

    if (parentId) {
      // Insert after the last item in the current branch
      const updatedHistory = [...promptHistory];
      const insertIndex = findLastBranchIndex(parentId, updatedHistory) + 1;
      updatedHistory.splice(insertIndex, 0, newHistoryItem);
      setPromptHistory(updatedHistory);
    } else {
      // Add as first item if it's a root item
      setPromptHistory([newHistoryItem, ...promptHistory]);
    }

    setSelectedHistoryItem(newHistoryItem);
  };
  // Function to update the name of a history item
  const updateItemName = (itemId, newName) => {
    setPromptHistory(promptHistory.map(item =>
      item.id === itemId ? { ...item, name: newName } : item
    ));
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
    setPromptHistory([newHistoryItem, ...promptHistory]);
  };

  // Add this function to restore from history
  const restoreFromHistory = (historyItem) => {
    setSelectedHistoryItem(historyItem);
    setUserInput(historyItem.userInput);
    setGeneratedPrompt(historyItem.generatedPrompt);
    const validModels = historyItem.selectedModels.filter(selected =>
      availableModels.some(model => model.model_id === selected.model_id)
    );
    setSelectedModels(historyItem.selectedModels);
    setTestContext(historyItem.testContext);
    setTestResults(historyItem.testResults);
    setShowTestSection(Object.keys(historyItem.testResults).length > 0);
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
    return userInput.trim() !== selectedHistoryItem.userInput.trim();
  };

  // Modified handleSubmit to work with history
  const handleSubmit = async () => {
    setIsGenerating(true);
    setGeneratedPrompt(''); // Clear previous response
    setStreamIndex(0); // Reset stream index

    const controller = new AbortController();
    setAbortController(controller);
  };


  const handleTestPrompt = async () => {
    if (selectedModels.length === 0) {
      toast.error("Please select at least one model");
      return;
    }

    setIsTestingPrompt(true);
    setTestResults({});

    try {
      // Create an array of promises for each model's stream simulation
      const modelStreams = selectedModels.map(async (model) => {
        // Initialize empty result for this model
        setTestResults(prev => ({ ...prev, [model.model_id]: '' }));

        const dummyTestResponse = `${testContext ? '[Using provided context]\n\n' : ''}This is a simulated response from ${model.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

        // Simulate streaming for this model
        for (let index = 0; index < dummyTestResponse.length; index++) {
          await new Promise(resolve => setTimeout(resolve, 20));
          setTestResults(prev => ({
            ...prev,
            [model.model_id]: (prev[model.model_id] || '') + dummyTestResponse[index]
          }));
        }
      });

      // Run all streams in parallel
      await Promise.all(modelStreams);

    } catch (error) {
      console.error('Error testing prompt:', error);
      toast.error('An error occurred while testing the prompt');
    } finally {
      setIsTestingPrompt(false);
    }
  };

  const deleteHistoryItem = (itemId) => {
    // First, find all items that need to be deleted (item and its children)
    const itemsToDelete = new Set();

    const findChildren = (id) => {
      itemsToDelete.add(id);
      promptHistory.forEach(item => {
        if (item.parentId === id) {
          findChildren(item.id);
        }
      });
    };

    findChildren(itemId);

    // Filter out all items that should be deleted
    const updatedHistory = promptHistory.filter(item => !itemsToDelete.has(item.id));

    // If the deleted item was selected, clear the selection
    if (selectedHistoryItem?.id === itemId) {
      setSelectedHistoryItem(null);
    }

    // Create new blank item if this was the last item and auto history is disabled
    if (updatedHistory.length === 0 && !autoHistory) {
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
      setPromptHistory([initialItem]);
      setSelectedHistoryItem(initialItem);
      setPendingHistoryItem(initialItem);
    } else {
      setPromptHistory(updatedHistory);
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


  return (
    <div className="max-w-7xl mx-auto mt-8">
      {/* Header with Back button only */}
      <div className="mb-6">
        {!hideBackToMenu && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft /> Back
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* History Sidebar */}
        <div className="w-64 pr-6 border-r border-gray-200 h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Auto History toggle */}
          <div className="flex items-center gap-2 mb-4">
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

          <h3 className="font-medium text-lg mb-2">Prompt History</h3>
          <div className="h-px bg-gray-200 mb-4" />
          <button
            onClick={handleNewIteration}
            className="flex items-center gap-1 px-2 py-1 mb-4 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors w-full"
          >
            <span className="text-lg leading-none">+</span>
            New Iteration
          </button>
          <div className="space-y-2">
            {promptHistory
              .filter(item => !item.parentId)
              .map(item => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  restoreFromHistory={restoreFromHistory}
                  deleteHistoryItem={deleteHistoryItem}
                  selectedHistoryItem={selectedHistoryItem}
                  promptHistory={promptHistory}
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
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={isGenerating ? handleStopGeneration : handleSubmit}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${isGenerating
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : hasInputChanged()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-300 text-white cursor-not-allowed'
                    }`}
                  disabled={!hasInputChanged() && !isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <FaStop className="w-4 h-4" />
                      Stop Generation
                    </>
                  ) : (
                    'Generate Prompt'
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
                {generatedPrompt}
                {isGenerating && (
                  <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
                )}

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
              <button
                onClick={() => setShowTestSection(!showTestSection)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Test your prompt
                <FaChevronDown className={`transform transition-transform ${showTestSection ? 'rotate-180' : ''}`} />
              </button>

              {showTestSection && (
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
                                  selectedModels
                                    .filter(selected =>
                                      availableModels.some(model => model.model_id === selected.model_id)
                                    )
                                    .map((model) => (
                                      <span
                                        key={model.model_id}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm group"
                                      >
                                        {model.name}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedModels(selectedModels.filter(m => m.model_id !== model.model_id));
                                          }}
                                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                        >
                                          <FaTimes className="h-3 w-3 hover:text-blue-600" />
                                        </button>
                                      </span>
                                    ))
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
                                <div className="sticky top-0 bg-white px-3 py-2 z-10 border-b">
                                  <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                      type="text"
                                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Search models..."
                                      value={modelSearch}
                                      onChange={(e) => setModelSearch(e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                </div>

                                {filteredModels.map((model) => {
                                  const isSelected = selectedModels.some(m => m.model_id === model.model_id);
                                  return (
                                    <Listbox.Option
                                      key={model.model_id}
                                      value={model}
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
                        {selectedModels.map((model) => (
                          <div key={model.model_id} className="border rounded-md p-4">
                            <h4 className="font-medium mb-2 text-gray-700">
                              {model.name}
                            </h4>
                            <div className="bg-white p-3 rounded font-mono text-sm whitespace-pre-wrap">
                              {testResults[model.model_id]}
                              {isTestingPrompt && !testResults[model.model_id] && (
                                <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Prompt Overlay */}
      <PromptOverlay
        isOpen={showPromptOverlay}
        onClose={() => setShowPromptOverlay(false)}
        prompt={generatedPrompt}
      />
    </div>
  );
};

export default AIPrompting;