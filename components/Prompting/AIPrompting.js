import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Fragment} from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaSearch, FaChevronDown, FaTimes } from 'react-icons/fa';

const AIPrompting = ({ onBack }) => {

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

// Add this function to filter models based on search
const filteredModels = availableModels.filter(model => 
  model.name.toLowerCase().includes(modelSearch.toLowerCase())
);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setIsGenerating(true);
      setGeneratedPrompt('');
      setStreamIndex(0);
      setShowTestSection(false);
      setTestResults({});
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

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Back to Menu
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-Archivo mb-6">AI Prompt Generator</h2>
        
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
              <div className="border-l border-gray-300 bg-green-50 p-4 rounded-r-md font-mono min-h-[200px] whitespace-pre-wrap">
                {generatedPrompt}
                {isGenerating && (
                  <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
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
  <Listbox value={selectedModels} onChange={setSelectedModels} multiple>
    <div className="relative">
     <Listbox.Button className="relative w-full min-h-[42px] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
  <div className="flex flex-wrap gap-2">
    {selectedModels.length === 0 ? (
      <span className="text-gray-500">Select models...</span>
    ) : (
      selectedModels.map((model) => (
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
            className="opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="sticky top-0 bg-white px-3 py-2">
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
          {filteredModels.map((model) => (
            <Listbox.Option
              key={model.model_id}
              value={model}
              className={({ active, selected }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100' : 'bg-white'
                }`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {model.name}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <FaCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
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
)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPrompting;