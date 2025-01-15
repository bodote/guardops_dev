import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Fragment} from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaSearch, FaChevronDown, FaTimes, FaPencilAlt, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AIPrompting = ({ onBack, initialData = null }) => {

// Add these state variables to your component
 const [availableModels, setAvailableModels] = useState([]);
 const [selectedModels, setSelectedModels] = useState([]);
 const [modelSearch, setModelSearch] = useState('');

  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [streamIndex, setStreamIndex] = useState(0);
  const [showTestSection, setShowTestSection] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);

const [testContext, setTestContext] = useState('');
const [showTemplatePopup, setShowTemplatePopup] = useState(false);
const [templateName, setTemplateName] = useState('');

  const dummyResponse = `Write a detailed and comprehensive response that thoroughly addresses the user's query. Begin by analyzing the key aspects of the question, then provide well-structured, relevant information supported by examples where appropriate.`;


  const dummyTestResponse = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

  useEffect(() => {
    if (isGenerating && streamIndex < dummyResponse.length) {
      const timer = setTimeout(() => {
        setGeneratedPrompt(prev => prev + dummyResponse[streamIndex]);
        setStreamIndex(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    } else if (streamIndex >= dummyResponse.length) {
      setIsGenerating(false);
    }
  }, [isGenerating, streamIndex]);
// Add this effect to fetch models when component mounts
useEffect(() => {
  getModels();
}, []);
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
const dummyHistory =[
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
  const [promptHistory, setPromptHistory] = useState(initialData?.promptHistory || dummyHistory);


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

// Function to update the name of a history item
const updateItemName = (itemId, newName) => {
  setPromptHistory(history => 
    history.map(item => 
      item.id === itemId 
        ? { ...item, name: newName.trim() || item.userInput.slice(0, 50) } // Fallback to userInput if empty
        : item
    )
  );
  setEditingId(null);
};

const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
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

const handleSubmit = (e) => {
  e.preventDefault();
  if (userInput.trim()) {
    setIsGenerating(true);
    setGeneratedPrompt('');
    setStreamIndex(0);
    setShowTestSection(false);
    setTestResults({});
    
    // If we're working from a selected history item, save as variation
    if (selectedHistoryItem) {
      saveVariation(selectedHistoryItem);
    } else {
      // Save as new root item
      const newHistoryItem = {
        id: Date.now().toString(),
        parentId: null,
        timestamp: new Date().toISOString(),
        userInput,
        generatedPrompt,
        selectedModels,
        testContext,
        testResults
      };
      setPromptHistory([newHistoryItem, ...promptHistory]);
    }
  }
};
const handleTestPrompt = async () => {
  if (selectedModels.length === 0) {
    toast.error("Please select at least one model");
    return;
  }
  
  setIsTestingPrompt(true);
  setTestResults({});

  // Simulate streaming for each selected model
  for (const model of selectedModels) {
    setTestResults(prev => ({ ...prev, [model.model_id]: '' }));
    let index = 0;
    
    const dummyTestResponse = `${testContext ? '[Using provided context]\n\n' : ''}This is a simulated response from ${model.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    
    while (index < dummyTestResponse.length) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setTestResults(prev => ({
        ...prev,
        [model.model_id]: (prev[model.model_id] || '') + dummyTestResponse[index]
      }));
      index++;
    }
  }
  
  setIsTestingPrompt(false);
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
  
  setPromptHistory(updatedHistory);
};
const [editingId, setEditingId] = useState(null);
const [customNames, setCustomNames] = useState({});

const HistoryItem = ({ item, level = 0 }) => {
  const [editableName, setEditableName] = useState(item.name);

  return (
    <>
      <div
        className={`group relative w-full text-left p-3 rounded-md transition-colors
          ${selectedHistoryItem?.id === item.id
            ? 'bg-blue-50 border border-blue-200'
            : 'hover:bg-gray-50'
          }`}
        style={{ marginLeft: `${level * 16}px` }}
      >
        {/* Branch line visualization */}
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0 border-l-2 border-gray-200"
               style={{ marginLeft: '-16px' }} />
        )}
        
       {/* Action buttons */}
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingId(item.id);
              setEditableName(item.name);
            }}
            className="p-1 hover:bg-blue-100 rounded"
          >
            <FaPencilAlt className="h-3 w-3 text-blue-600" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Are you sure you want to delete this item and all its variations?')) {
                deleteHistoryItem(item.id);
              }
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <FaTimes className="h-3 w-3 text-red-600" />
          </button>
        </div>
        
        {/* Main content button */}
       <button
          onClick={() => restoreFromHistory(item)}
          className="w-full text-left"
        >
          <div className="text-sm font-medium truncate pr-16">
            {editingId === item.id ? (
              <input
                type="text"
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
                onBlur={() => updateItemName(item.id, editableName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateItemName(item.id, editableName);
                  } else if (e.key === 'Escape') {
                    setEditingId(null);
                    setEditableName(item.name);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-1 py-0.5 bg-white border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <span className="block truncate">
                {item.name}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(item.timestamp).toLocaleString()}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.selectedModels
            .filter(selected => 
              availableModels.some(model => model.model_id === selected.model_id)
            )
            .map((selected) => {
              const modelInfo = availableModels.find(m => m.model_id === selected.model_id);
              return modelInfo ? (
                <span
                  key={selected.model_id}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {modelInfo.name}
                </span>
              ) : null;
            })}
          </div>
        </button>
      </div>
      
      {/* Render children recursively */}
      {promptHistory
        .filter(h => h.parentId === item.id)
        .map(child => (
          <HistoryItem key={child.id} item={child} level={level + 1} />
        ))}
    </>
  );
};

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
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
    >
      <FaArrowLeft /> Back to Menu
    </button>

    <div className="flex gap-6">
     {/* History Sidebar */}
<div className="w-64 pr-6 border-r border-gray-200 h-[calc(100vh-8rem)] overflow-y-auto">
  <h3 className="font-medium text-lg mb-2">Prompt History</h3>
  
  
  <div className="h-px bg-gray-200 mb-4" />
  <button
    onClick={startNewIteration}
    className="flex items-center gap-1 px-2 py-1 mb-4 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors w-full"
    disabled={promptHistory.length === 0}
  >
    <span className="text-lg leading-none">+</span>
    New Iteration
  </button>
  <div className="space-y-2">
    {promptHistory
      .filter(item => !item.parentId)
      .map(item => (
        <HistoryItem key={item.id} item={item} />
      ))}
  </div>
</div>

   <div className="flex-1 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-4">
 
          <h2 className="text-2xl font-Archivo">AI Prompt Generator</h2>
          {selectedHistoryItem && hasChanges() && (
            <button
              onClick={() => saveVariation(selectedHistoryItem)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <span>Save Iteration</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* Main prompt generation section */}
          <div className={`grid md:grid-cols-2 gap-0`}>
            <div className="relative">
              <textarea
                className="w-full p-4 border-r border-gray-300 rounded-l-md font-mono min-h-[200px] bg-gray-50"
                placeholder="What should the AI model do?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isGenerating}
              />
              {!generatedPrompt && !isGenerating && (
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!userInput.trim()}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md 
                      ${!userInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    Generate Prompt
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
  <div className="absolute -top-[1.75rem] left-0 text-sm text-gray-500">
    Generated Prompt
  </div>
  <div className="relative border-l border-gray-300 bg-green-50 p-4 rounded-r-md font-mono min-h-[200px] whitespace-pre-wrap">
    {generatedPrompt}
    {isGenerating && (
      <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
    )}

    {generatedPrompt && !isGenerating && (
      <button
        onClick={() => setShowTemplatePopup(true)}
        className="absolute bottom-4 right-4 text-sm px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
      >
        <FaSave className="h-3 w-3" />
        Save to Template
      </button>
    )}
  </div>
</div>

          </div>

          {/* Test prompt section */}
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
      <div>
        <h3 className="font-medium mb-3">Test Context (Optional)</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional context or variables for testing your prompt..."
          value={testContext}
          onChange={(e) => setTestContext(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Select models to test with:</h3>
        <div className="relative w-full">
<Listbox 
  value={availableModels.filter(model => 
    selectedModels.some(selected => selected.model_id === model.model_id)
  )} 
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
              onClick={() => {
                if (isSelected) {
                  setSelectedModels(selectedModels.filter(m => m.model_id !== model.model_id));
                } else {
                  setSelectedModels([...selectedModels, model]);
                }
              }}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100' : 'bg-white'
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


 <button
        onClick={handleTestPrompt}
        disabled={selectedModels.length === 0 || isTestingPrompt}
        className={`px-6 py-2 bg-blue-600 text-white rounded-md 
          ${selectedModels.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
      >
        {isTestingPrompt ? 'Testing...' : 'Run Test'}
      </button>
                  </div>

                  {/* Test results */}
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
    </div>

{/* Template Popup */}
{/* Template Popup */}
{showTemplatePopup && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setShowTemplatePopup(false)} // Close when clicking the backdrop
  >
    <div 
      className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the popup content
    >
      <button
        onClick={() => setShowTemplatePopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <FaTimes className="h-4 w-4" />
      </button>
      
      <h3 className="text-lg font-medium mb-4">Save as Template</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
          </label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter a name for your template"
            autoFocus
          />
        </div>
        
        <div className="pt-2">
          <button
            onClick={handleSaveTemplate}
            disabled={!templateName.trim()}
            className={`w-full py-2 px-4 rounded-md text-white transition-colors
              ${templateName.trim()
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  </div>
)}
  </div>
);
};

export default AIPrompting;