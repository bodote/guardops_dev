import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch, FaHistory, FaBook } from 'react-icons/fa';
import AIPrompting from './AIPrompting';

const AIRefinement = ({ onBack }) => {
  const [view, setView] = useState('menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [promptingHistory, setPromptingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (view === 'history') {
      fetchPromptingHistory();
    }
  }, [view]);

  const fetchPromptingHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/prompting/list');
      const data = await response.json();
      setPromptingHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
    setIsLoading(false);
  };

  const fetchPromptingDetails = async (id) => {
    try {
      const response = await fetch(`/api/prompting?promptId=${id}`);
      const data = await response.json();
      console.log('Fetched prompt details:', data);
      setSelectedItem(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
      setView('history');
      fetchPromptingHistory(); // Re-fetch the history when going back
    } else if (view === 'history' || view === 'templates') {
      setView('menu');
    } else {
      onBack();
    }
  };
  const filteredHistory = promptingHistory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (selectedItem) {
      return (
        <AIPrompting
          key={selectedItem.promptId}
          onBack={handleBack}
          initialData={selectedItem}
          hideBackToMenu={true}
        />
      );
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
          <div className="sticky top-0 bg-white z-10 pb-4">
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
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No prompts found</div>
            ) : (
              filteredHistory.map(item => (
                <button
                  key={item.id}
                  onClick={() => fetchPromptingDetails(item.id)}
                  className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 text-left"
                >
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    Created: {new Date(item.timestamp).toLocaleDateString()}
                    {item.lastModified && (
                      <span className="ml-4">
                        Last modified: {new Date(item.lastModified).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </button>
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