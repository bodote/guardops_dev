import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AIRefinement = ({ onBack }) => {
  const [promptData, setPromptData] = useState({
    title: '',
    description: '',
    prompt: '',
    category: '',
    isPublic: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(promptData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Back to Menu
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-Archivo mb-6">Create New Prompt</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={promptData.title}
              onChange={(e) => setPromptData({...promptData, title: e.target.value})}
              placeholder="Enter a descriptive title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="2"
              value={promptData.description}
              onChange={(e) => setPromptData({...promptData, description: e.target.value})}
              placeholder="What does this prompt do?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt Content
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md font-mono"
              rows="6"
              value={promptData.prompt}
              onChange={(e) => setPromptData({...promptData, prompt: e.target.value})}
              placeholder="Enter your prompt here..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={promptData.category}
                onChange={(e) => setPromptData({...promptData, category: e.target.value})}
              >
                <option value="">Select a category</option>
                <option value="writing">Writing</option>
                <option value="coding">Coding</option>
                <option value="analysis">Analysis</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promptData.isPublic}
                  onChange={(e) => setPromptData({...promptData, isPublic: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Make Public</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIRefinement;