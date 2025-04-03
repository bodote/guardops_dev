import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch, FaHistory, FaBook, FaTrash, FaDatabase } from 'react-icons/fa';
import AIPrompting from './AIPrompting';
import RAGPrompting from './RAGPrompting';
import { toast } from 'react-toastify';
const AIRefinement = ({ onBack }) => {
  const [view, setView] = useState('menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [promptingHistory, setPromptingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);  // Add this
  const [sourceView, setSourceView] = useState(null);
  const [promptType, setPromptType] = useState(null); // Add state to track prompt type
  const [vectorStores, setVectorStores] = useState({}); // Map to store vector store ID -> name

  useEffect(() => {
    if (view === 'history') {
      fetchPromptingHistory();
      fetchVectorStores();
    } else if (view === 'templates') {
      fetchTemplates();
    }
  }, [view]);

  // Fetch vector stores data
  const fetchVectorStores = async () => {
    try {
      const response = await fetch("/api/knowledge/files/vectorstore", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch vector stores");
      const data = await response.json();
      // Create a map of store_id -> name for quick lookups
      const storeMap = {};
      data.data.stores.forEach(store => {
        storeMap[store.store_id] = store.name;
      });
      setVectorStores(storeMap);
    } catch (error) {
      console.error("Error fetching vector stores:", error);
    }
  };

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      setSourceView('templates');
      const response = await fetch('/api/manageTemplates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const data = await response.json();
      console.log('Templates data:', data);  // This will show the full response
      setTemplates(data.prompt_templates); // Store just the array of templates
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates');
    }
    setIsLoading(false);
  };

  const fetchPromptingHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/prompting/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const { data } = await response.json();
      setPromptingHistory(data.prompts);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to fetch prompt history');
    }
    setIsLoading(false);
  };

  const handleDeletePrompt = async (promptId, e) => {
    e.stopPropagation(); // Prevent triggering the button click event

    try {
      const response = await fetch('/api/prompting/list', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt_id: promptId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete prompt');
      }

      toast.success('Prompt deleted successfully');
      fetchPromptingHistory(); // Refresh the list
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast.error('Failed to delete prompt');
    }
  };


  const fetchPromptingDetails = async (id) => {
    try {
      setSourceView('history');
      const response = await fetch(`/api/prompting?prompt_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prompt details');
      }

      const { data } = await response.json();
      console.log('Fetched prompt details:', data);

      // Determine if this is a knowledge-based prompt by checking for validation details in any item
      const isKnowledgeBasedPrompt = data.items.some(item =>
        item.validation_details && item.validation_details.length > 0
      );

      setPromptType(isKnowledgeBasedPrompt ? 'rag' : 'default');
      setSelectedItem(data);
    } catch (error) {
      console.error('Error fetching details:', error);
      toast.error('Failed to fetch prompt details');
    }
  };
  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
      setPromptType(null); // Reset prompt type
      setView(sourceView);  // Go back to the source view
      if (sourceView === 'history') {
        fetchPromptingHistory(); // Re-fetch history if going back to history
      } else if (sourceView === 'templates') {
        fetchTemplates(); // Re-fetch templates if going back to templates
      }
      setSourceView(null);  // Reset the source
    } else if (view === 'history' || view === 'templates') {
      setView('menu');
    } else {
      onBack();
    }
  };
  const filteredHistory = promptingHistory?.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    // Check if name matches search query
    const nameMatch = item.name.toLowerCase().includes(searchLower);

    // Check if vector store name matches search query (if item has a vector store)
    const vectorStoreMatch = item.vector_store_id &&
      vectorStores[item.vector_store_id] &&
      vectorStores[item.vector_store_id].toLowerCase().includes(searchLower);

    // Return true if either name or vector store name matches
    return nameMatch || vectorStoreMatch;
  });

  const renderContent = () => {
    if (selectedItem) {
      if (promptType === 'rag') {
        return (
          <RAGPrompting
            key={`rag-${selectedItem.promptId || `template-${selectedItem.name}`}`}
            onBack={handleBack}
            initialData={selectedItem}
            hideBackToMenu={true}
          />
        );
      } else {
        return (
          <AIPrompting
            key={`ai-${selectedItem.promptId || `template-${selectedItem.name}`}`}
            onBack={handleBack}
            initialData={selectedItem}
            hideBackToMenu={true}
          />
        );
      }
    }

    if (view === 'menu') {
      return (
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-Archivo text-center mb-8 text-gray-800">
            What would you like to refine?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
            <button
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col items-center gap-3 hover:bg-blue-100 group"
              onClick={() => setView('history')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FaHistory className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-Archivo font-medium text-lg text-center">
                AI Generated Prompts
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Refine your previous AI-generated prompts
              </p>
            </button>

            <button
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col items-center gap-3 hover:bg-green-100 group"
              onClick={() => setView('templates')}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaBook className="text-green-600 text-xl" />
              </div>
              <h3 className="font-Archivo font-medium text-lg text-center">
                Playground Templates
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Refine your saved template prompts
              </p>
            </button>
          </div>
        </div>
      );
    }
    if (view === 'history') {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="sticky top-0 bg-white z-10 pb-4 space-y-4">
            {/* Add buttons for creating new prompts */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setPromptType('default');
                  setSelectedItem({});
                }}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 
                transition-colors flex items-center justify-center gap-2 text-blue-700 font-medium"
              >
                <span className="text-xl">+</span> New AI Prompt
              </button>

              <button
                onClick={() => {
                  setPromptType('rag');
                  setSelectedItem({});
                }}
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 
                transition-colors flex items-center justify-center gap-2 text-green-700 font-medium"
              >

                <span className="text-xl">+</span><span>New Knowledge-based Prompt</span><FaDatabase className="text-sm" />
              </button>
            </div>

            {/* Existing search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : filteredHistory?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No prompts found</div>
            ) : (
              filteredHistory?.map(item => (
                <div
                  key={item.id}
                  className="relative group"
                >
                  <div className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 text-left relative">
                    <button
                      onClick={() => fetchPromptingDetails(item.prompt_id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg flex-grow">{item.name}</h3>
                        {/* Add a badge to indicate knowledge-based prompts if known */}
                        {item.is_rag_prompt && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1 whitespace-nowrap">
                            <FaDatabase className="text-xs" /> Knowledge-based
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Created: {new Date(item.timestamp).toLocaleDateString()}
                        {item.lastModified && (
                          <span className="ml-4">
                            Last modified: {new Date(item.lastModified).toLocaleDateString()}
                          </span>
                        )}
                        {/* Display vector store name if it exists */}
                        {item.vector_store_id && vectorStores[item.vector_store_id] && (
                          <span className="ml-4 inline-flex items-center gap-1 text-green-600">
                            <FaDatabase className="text-xs" />
                            {vectorStores[item.vector_store_id]}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Delete button positioned in the top right */}
                    <button
                      onClick={(e) => handleDeletePrompt(item.prompt_id, e)}
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-500 hover:text-red-700 bg-white rounded-full hover:bg-red-50"
                      title="Delete prompt"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    if (view === 'templates') {
      const filteredTemplates = templates
        ?.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated))
        ?.filter(template => {
          const searchLower = searchQuery.toLowerCase();
          return (
            template.name.toLowerCase().includes(searchLower) ||
            template.description.toLowerCase().includes(searchLower) ||
            (template.tags && template.tags.some(tag =>
              tag.toLowerCase().includes(searchLower)
            )) ||
            template.template.toLowerCase().includes(searchLower)
          );
        });

      return (
        <div className="max-w-3xl mx-auto">
          <div className="sticky top-0 bg-white z-10 pb-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates by name, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : filteredTemplates?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No templates found</div>
            ) : (
              filteredTemplates.map(template => (
                <div
                  key={template.template_id}
                  className="relative group"
                >
                  <button
                    onClick={() => {
                      setSourceView('templates');  // Track that we came from templates
                      // Default to AIPrompting for templates
                      setPromptType('default');
                      setSelectedItem({
                        items: [{
                          id: Date.now().toString(),
                          parentId: null,
                          name: template.name,
                          timestamp: new Date().toISOString(),
                          userInput: template.template,
                          generated_prompt: template.template,
                          selectedModels: [],
                          testContext: '',
                          testResults: {}
                        }]
                      });
                    }}
                    className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 text-left"
                  >
                    <h3 className="font-medium text-lg">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-2 font-mono whitespace-pre-wrap line-clamp-3">
                      {template.template}
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      Last updated: {new Date(template.last_updated).toLocaleDateString()}
                    </div>
                    <div className="mt-2 space-x-2">
                      {template.hub_template && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Hub Template
                        </span>
                      )}
                      {template.published && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Published
                        </span>
                      )}
                      {template.tags && template.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Back
      </button>
      {renderContent()}
    </div>
  );
};

export default AIRefinement;