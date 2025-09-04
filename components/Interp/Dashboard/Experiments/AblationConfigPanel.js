'use client'
import { useState } from "react";
import { FiXCircle, FiPlay } from "react-icons/fi";

const AblationConfigPanel = ({ selectedToken, selectedModel, response, isRunning, onRun }) => {
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [layerNeurons, setLayerNeurons] = useState({});
    const [modifiedPrompt, setModifiedPrompt] = useState(response?.prompt?.text || '');

    const availableLayers = selectedModel?.config?.num_hidden_layers
        ? Array.from({ length: selectedModel.config.num_hidden_layers }, (_, i) => i)
        : Array.from({ length: 32 }, (_, i) => i);

    const hiddenSize = selectedModel?.config?.hidden_size || 4096;

    const handleLayerToggle = (layer) => {
        setSelectedLayers(prev => {
            const newLayers = prev.includes(layer)
                ? prev.filter(l => l !== layer)
                : [...prev, layer].sort((a, b) => a - b);

            // Initialize neurons for new layer
            if (!prev.includes(layer)) {
                setLayerNeurons(prevNeurons => ({
                    ...prevNeurons,
                    [layer]: { entire_layer: true, neurons: [], rawInput: '' }
                }));
            } else {
                // Remove neurons for removed layer
                setLayerNeurons(prevNeurons => {
                    const newNeurons = { ...prevNeurons };
                    delete newNeurons[layer];
                    return newNeurons;
                });
            }

            return newLayers;
        });
    };

    const handleEntireLayerToggle = (layer) => {
        setLayerNeurons(prev => ({
            ...prev,
            [layer]: {
                ...prev[layer],
                entire_layer: !prev[layer]?.entire_layer,
                neurons: prev[layer]?.entire_layer ? [] : prev[layer]?.neurons || []
            }
        }));
    };

    const handleNeuronsChange = (layer, value) => {
        // Allow the raw input value to be stored temporarily
        setLayerNeurons(prev => ({
            ...prev,
            [layer]: {
                ...prev[layer],
                rawInput: value,
                neurons: value.split(',')
                    .map(id => parseInt(id.trim()))
                    .filter(id => !isNaN(id) && id >= 0 && id < hiddenSize)
            }
        }));
    };

    const handleRun = () => {
        const ablations = selectedLayers.map(layer => ({
            layer: layer,
            entire_layer: layerNeurons[layer]?.entire_layer || false,
            neurons: layerNeurons[layer]?.neurons || []
        }));

        onRun({
            position: selectedToken.position,
            modified_prompt: modifiedPrompt,
            ablations: ablations
        });
    };

    const selectAllLayers = () => {
        setSelectedLayers([...availableLayers]);
        const newNeurons = {};
        availableLayers.forEach(layer => {
            newNeurons[layer] = { entire_layer: true, neurons: [], rawInput: '' };
        });
        setLayerNeurons(newNeurons);
    };

    const clearLayers = () => {
        setSelectedLayers([]);
        setLayerNeurons({});
    };

    const canRun = selectedLayers.length > 0 && modifiedPrompt.trim();

    return (
        <div className="w-full h-full bg-red-50 border-r border-red-200 flex flex-col overflow-hidden">
            {/* Fixed Header */}
            <div className="flex-shrink-0 p-6 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <FiXCircle className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Ablation Study</h3>
                        <p className="text-sm text-slate-600">Disable components</p>
                    </div>
                </div>
            </div>

            {/* Fixed Run Button */}
            <div className="flex-shrink-0 px-6 pb-4">
                <button
                    onClick={handleRun}
                    disabled={!canRun || isRunning}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                    <FiPlay className="w-4 h-4" />
                    Run Ablation
                </button>
            </div>

            {/* Scrollable Configuration */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <div className="bg-white rounded-lg border border-red-200 p-4 mb-4 space-y-4">
                    {/* Prompt Modification */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Prompt (optional modification)
                        </label>
                        <textarea
                            value={modifiedPrompt}
                            onChange={(e) => setModifiedPrompt(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                            rows={2}
                        />
                    </div>

                    {/* Layer Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700">
                                Layers to Ablate ({selectedLayers.length} selected)
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={selectAllLayers}
                                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                >
                                    All
                                </button>
                                <button
                                    onClick={clearLayers}
                                    className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-2 mb-4">
                            {availableLayers.map(layer => (
                                <button
                                    key={layer}
                                    onClick={() => handleLayerToggle(layer)}
                                    className={`p-2 text-xs rounded transition-colors ${selectedLayers.includes(layer)
                                        ? 'bg-red-500 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>

                        {/* Layer-specific configuration */}
                        {selectedLayers.length > 0 && (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {selectedLayers.map(layer => (
                                    <div key={layer} className="flex items-center gap-4 p-2 bg-slate-50 rounded border">
                                        <span className="text-sm font-medium text-slate-700 min-w-[60px]">
                                            Layer {layer}:
                                        </span>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={layerNeurons[layer]?.entire_layer || false}
                                                onChange={() => handleEntireLayerToggle(layer)}
                                                className="rounded border-slate-300 text-red-500 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-slate-600">Entire Layer</span>
                                        </label>
                                        {!layerNeurons[layer]?.entire_layer && (
                                            <input
                                                type="text"
                                                placeholder="Neuron IDs (e.g., 0,15,42)"
                                                value={layerNeurons[layer]?.rawInput || ''}
                                                onChange={(e) => handleNeuronsChange(layer, e.target.value)}
                                                className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AblationConfigPanel;