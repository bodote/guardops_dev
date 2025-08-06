'use client'
import { useState } from "react";
import { FiXCircle, FiX, FiInfo, FiSettings, FiPlay, FiRefreshCw } from "react-icons/fi";

const AblationStudy = ({
    onClose,
    selectedToken,
    position,
    selectedModel,
    originalPrompt,
    originalResponse,
    onRunAblation
}) => {
    const [ablationConfig, setAblationConfig] = useState(new Map()); // Map of layer -> {entireLayer: boolean, neurons: string}
    const [modifiedPrompt, setModifiedPrompt] = useState(originalPrompt);
    const [isRunning, setIsRunning] = useState(false);

    if (!selectedModel || !selectedModel.config) {
        return null;
    }

    const { num_hidden_layers, hidden_size } = selectedModel.config;
    const availableLayers = Array.from({ length: num_hidden_layers }, (_, i) => i);

    // Helper functions
    const toggleLayer = (layer) => {
        const newConfig = new Map(ablationConfig);
        if (newConfig.has(layer)) {
            newConfig.delete(layer);
        } else {
            newConfig.set(layer, { entireLayer: true, neurons: '' });
        }
        setAblationConfig(newConfig);
    };

    const updateLayerConfig = (layer, field, value) => {
        const newConfig = new Map(ablationConfig);
        const layerConfig = newConfig.get(layer) || { entireLayer: true, neurons: '' };
        layerConfig[field] = value;
        newConfig.set(layer, layerConfig);
        setAblationConfig(newConfig);
    };

    const validateNeuronList = (neuronString) => {
        if (!neuronString.trim()) return { valid: false, error: 'Enter neuron indices' };

        try {
            const neurons = neuronString.split(',').map(n => parseInt(n.trim()));

            // Check for valid numbers
            if (neurons.some(n => isNaN(n))) {
                return { valid: false, error: 'All values must be numbers' };
            }

            // Check range
            if (neurons.some(n => n < 0 || n >= hidden_size)) {
                return { valid: false, error: `Indices must be 0-${hidden_size - 1}` };
            }

            // Check for duplicates
            if (new Set(neurons).size !== neurons.length) {
                return { valid: false, error: 'No duplicate indices allowed' };
            }

            return { valid: true, neurons };
        } catch (error) {
            return { valid: false, error: 'Invalid format' };
        }
    };

    const getAblationSummary = () => {
        const totalLayers = ablationConfig.size;
        const entireLayers = Array.from(ablationConfig.values()).filter(config => config.entireLayer).length;
        const partialLayers = totalLayers - entireLayers;

        return {
            totalLayers,
            entireLayers,
            partialLayers,
            totalNeurons: Array.from(ablationConfig.entries()).reduce((total, [layer, config]) => {
                if (config.entireLayer) {
                    return total + hidden_size;
                } else {
                    const validation = validateNeuronList(config.neurons);
                    return total + (validation.valid ? validation.neurons.length : 0);
                }
            }, 0)
        };
    };

    const handleRunAblation = async () => {
        setIsRunning(true);

        // Prepare ablation configuration for API
        const ablationData = {
            model_id: selectedModel.model_id,
            original_prompt: originalPrompt,
            modified_prompt: modifiedPrompt,
            position: position,
            ablations: Array.from(ablationConfig.entries()).map(([layer, config]) => ({
                layer,
                entire_layer: config.entireLayer,
                neurons: config.entireLayer ? [] : validateNeuronList(config.neurons).neurons || []
            }))
        };

        try {
            await onRunAblation(ablationData);
        } finally {
            setIsRunning(false);
        }
    };

    const summary = getAblationSummary();
    const canRun = ablationConfig.size > 0 && modifiedPrompt.trim();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-red-50">
                    <h2 className="font-Archivo text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FiXCircle className="w-6 h-6 text-red-500" />
                        Ablation Study for "{selectedToken}" at Position {position}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700 transition-colors">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Explanation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <FiInfo className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h3 className="font-medium text-blue-900 mb-1">How Ablation Studies Work</h3>
                                <p className="text-sm text-blue-700 mb-2">
                                    Ablation studies help understand causal relationships by selectively "turning off" parts of the model.
                                    Choose layers and/or specific neurons to disable, then regenerate to see how the output changes.
                                </p>
                                <p className="text-xs text-blue-600">
                                    💡 Tip: Start with entire layers to see broad effects, then focus on specific neurons for fine-grained analysis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Model Info */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-slate-900 mb-3">Model Configuration</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-slate-600">Model:</span>
                                <div className="font-medium text-slate-900">{selectedModel.model_id.split('/').pop()}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Total Layers:</span>
                                <div className="font-medium text-slate-900">{num_hidden_layers}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Hidden Size:</span>
                                <div className="font-medium text-slate-900">{hidden_size}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Total Neurons:</span>
                                <div className="font-medium text-slate-900">{num_hidden_layers * hidden_size}</div>
                            </div>
                        </div>
                    </div>

                    {/* Layer Selection */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-slate-900">
                                Layer Ablation Configuration ({ablationConfig.size} of {num_hidden_layers} layers selected)
                            </h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const newConfig = new Map();
                                        availableLayers.forEach(layer => {
                                            newConfig.set(layer, { entireLayer: true, neurons: '' });
                                        });
                                        setAblationConfig(newConfig);
                                    }}
                                    className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                >
                                    Select All
                                </button>
                                <button
                                    onClick={() => setAblationConfig(new Map())}
                                    className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg p-4 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availableLayers.map((layer) => {
                                    const isSelected = ablationConfig.has(layer);
                                    const layerConfig = ablationConfig.get(layer) || { entireLayer: true, neurons: '' };
                                    const neuronValidation = layerConfig.entireLayer ? { valid: true } : validateNeuronList(layerConfig.neurons);

                                    return (
                                        <div key={layer} className={`border rounded-lg p-3 transition-all ${isSelected ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
                                            {/* Layer checkbox */}
                                            <label className="flex items-center gap-2 mb-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleLayer(layer)}
                                                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                                />
                                                <span className="font-medium text-slate-900">Layer {layer}</span>
                                            </label>

                                            {isSelected && (
                                                <div className="ml-6 space-y-3">
                                                    {/* Entire layer checkbox */}
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={layerConfig.entireLayer}
                                                            onChange={(e) => updateLayerConfig(layer, 'entireLayer', e.target.checked)}
                                                            className="w-3 h-3 text-red-600 rounded focus:ring-red-500"
                                                        />
                                                        <span className="text-sm text-slate-700">Entire layer ({hidden_size} neurons)</span>
                                                    </label>

                                                    {/* Specific neurons input */}
                                                    {!layerConfig.entireLayer && (
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">
                                                                Specific neurons (0-{hidden_size - 1}):
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g., 0,15,42,128"
                                                                value={layerConfig.neurons}
                                                                onChange={(e) => updateLayerConfig(layer, 'neurons', e.target.value)}
                                                                className={`w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 ${neuronValidation.valid
                                                                    ? 'border-slate-300 focus:ring-red-500 focus:border-red-500'
                                                                    : 'border-red-300 focus:ring-red-500 bg-red-50'
                                                                    }`}
                                                            />
                                                            {!neuronValidation.valid && (
                                                                <p className="text-xs text-red-600 mt-1">{neuronValidation.error}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Prompt Modification */}
                    <div className="mb-6">
                        <h4 className="font-medium text-slate-900 mb-3">Modify Prompt (Optional)</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-slate-700 mb-1">Original Prompt:</label>
                                <div className="p-3 bg-slate-100 rounded-lg text-sm text-slate-800 border border-slate-200">
                                    "{originalPrompt}"
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Modified Prompt:</label>
                                <textarea
                                    value={modifiedPrompt}
                                    onChange={(e) => setModifiedPrompt(e.target.value)}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none h-24 text-sm"
                                    placeholder="Enter your modified prompt..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary and Actions */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                                    <FiSettings className="w-4 h-4" />
                                    Ablation Summary
                                </h4>
                                <div className="text-sm text-slate-700 space-y-1">
                                    <p>• <strong>{summary.totalLayers}</strong> layers will be modified</p>
                                    <p>• <strong>{summary.entireLayers}</strong> entire layers disabled</p>
                                    <p>• <strong>{summary.partialLayers}</strong> layers with specific neurons disabled</p>
                                    <p>• <strong>{summary.totalNeurons}</strong> total neurons will be ablated</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRunAblation}
                                disabled={!canRun || isRunning}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isRunning ? (
                                    <>
                                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                                        Running Ablation...
                                    </>
                                ) : (
                                    <>
                                        <FiPlay className="w-4 h-4" />
                                        Run Ablation Study
                                    </>
                                )}
                            </button>
                        </div>
                        {!canRun && (
                            <p className="text-xs text-slate-500">
                                {ablationConfig.size === 0 ? 'Select at least one layer to ablate' : 'Enter a prompt to generate with'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AblationStudy;