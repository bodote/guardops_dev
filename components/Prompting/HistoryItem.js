import React, { useState } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const HistoryItem = ({
    item,
    level = 0,
    restoreFromHistory,
    deleteHistoryItem,
    selectedHistoryItem,
    promptHistory,
    availableModels,
    updateItemName
}) => {
    const [editableName, setEditableName] = useState(item.name);
    const [editingId, setEditingId] = useState(null);
    const isPending = !item.generatedPrompt; // Check if item is pending

    return (
        <>
            <div
                className={`group relative w-full text-left p-3 rounded-md transition-colors
          ${selectedHistoryItem?.id === item.id
                        ? 'bg-blue-50 border border-blue-200'
                        : isPending
                            ? 'bg-gray-50 border border-dashed border-gray-300'
                            : 'hover:bg-gray-50'
                    }`}
                style={{ marginLeft: `${level * 16}px` }}
            >
                {/* Branch line visualization */}
                {level > 0 && (
                    <div
                        className="absolute left-0 top-0 bottom-0 border-l-2 border-gray-200"
                        style={{ marginLeft: '-16px' }}
                    />
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
                                onBlur={() => {
                                    updateItemName(item.id, editableName);
                                    setEditingId(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateItemName(item.id, editableName);
                                        setEditingId(null);
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
                            <span className={`block truncate ${isPending ? 'text-gray-400 italic' : ''}`}>
                                {isPending ? 'New Iteration' : item.name}
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
                    <HistoryItem
                        key={child.id}
                        item={child}
                        level={level + 1}
                        restoreFromHistory={restoreFromHistory}
                        deleteHistoryItem={deleteHistoryItem}
                        selectedHistoryItem={selectedHistoryItem}
                        promptHistory={promptHistory}
                        availableModels={availableModels}
                        updateItemName={updateItemName}
                    />
                ))}
        </>
    );
};

export default HistoryItem;