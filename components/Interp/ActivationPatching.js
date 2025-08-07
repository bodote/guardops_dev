'use client'
import { useState } from "react";
import { FiX, FiRefreshCw, FiPlay, FiLayers, FiTarget, FiArrowRight, FiCheck, FiInfo } from "react-icons/fi";

const ActivationPatching = ({
    selectedToken,
    position,
    originalPrompt,
    selectedModel,
    onClose,
    onRunPatching
}) => {
    const [patchSourcePrompt, setPatchSourcePrompt] = useState("");
    const [patchSourcePosition, setPatchSourcePosition] = useState(0);
    const [targetPrompt, setTargetPrompt] = useState(originalPrompt);
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [layerNeurons, setLayerNeurons] = useState({});
    const [isGeneratingSource, setIsGeneratingSource] = useState(false);
    const [sourceResponse, setSourceResponse] = useState(null);
    const [sourceTokens, setSourceTokens] = useState([]);

    // Mock model layers (from selectedModel config)
    const availableLayers = selectedModel?.config?.num_hidden_layers
        ? Array.from({ length: selectedModel.config.num_hidden_layers }, (_, i) => i)
        : Array.from({ length: 32 }, (_, i) => i); // fallback

    const hiddenSize = selectedModel?.config?.hidden_size || 4096;

    const handleLayerToggle = (layer) => {
        setSelectedLayers(prev => {
            const newLayers = prev.includes(layer)
                ? prev.filter(l => l !== layer)
                : [...prev, layer];

            // Initialize neurons for new layer
            if (!prev.includes(layer)) {
                setLayerNeurons(prevNeurons => ({
                    ...prevNeurons,
                    [layer]: { entire_layer: true, neuron_ids: [] }
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
                neuron_ids: prev[layer]?.entire_layer ? [] : prev[layer]?.neuron_ids || []
            }
        }));
    };

    const handleNeuronIdsChange = (layer, value) => {
        const neuronIds = value.split(',')
            .map(id => parseInt(id.trim()))
            .filter(id => !isNaN(id) && id >= 0 && id < hiddenSize);

        setLayerNeurons(prev => ({
            ...prev,
            [layer]: {
                ...prev[layer],
                neuron_ids: neuronIds
            }
        }));
    };

    const handleGenerateSource = async () => {
        if (!patchSourcePrompt.trim()) return;

        setIsGeneratingSource(true);

        try {
            // Mock API call to generate source response
            const response = await fetch('/api/interpretability/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model_id: selectedModel?.model_id,
                    prompt: patchSourcePrompt
                })
            });

            const data = await response.json();
            setSourceResponse(data);
            setSourceTokens(data.generated.tokens || []);
        } catch (error) {
            console.error('Error generating source response:', error);
        } finally {
            setIsGeneratingSource(false);
        }
    };

    const handleRunPatching = () => {
        const patchConfig = {
            layers: selectedLayers,
            neurons: layerNeurons
        };

        const patchingRequest = {
            model_id: selectedModel?.model_id,
            original_prompt: originalPrompt,
            patch_source_prompt: patchSourcePrompt,
            patch_source_position: patchSourcePosition,
            target_prompt: targetPrompt,
            target_position: position,
            patch_config: patchConfig
        };

        onRunPatching(patchingRequest);
        onClose();
    };

    const isConfigValid = () => {
        return patchSourcePrompt.trim() &&
            sourceResponse &&
            selectedLayers.length > 0 &&
            patchSourcePosition < sourceTokens.length;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-xl">
                                <FiRefreshCw className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Activation Patching</h2>
                                <p className="text-sm text-slate-600 mt-1">
                                    Extract activations from one context and inject them into another
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                            <FiX className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Current Selection Info */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                            <FiTarget className="w-4 h-4 text-slate-600" />
                            <span className="font-medium text-slate-700">Target Position</span>
                        </div>
                        <p className="text-sm text-slate-600">
                            Token: <span className="font-mono bg-white px-2 py-1 rounded border">"{selectedToken}"</span> at position {position}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Activations will be patched into this position during generation
                        </p>
                    </div>

                    {/* Step 1: Generate Source Context */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
                            <h3 className="font-semibold text-slate-800">Generate Source Context</h3>
                        </div>

                        <div className="ml-8 space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Source Prompt (where to extract activations from)
                                </label>
                                <textarea
                                    value={patchSourcePrompt}
                                    onChange={(e) => setPatchSourcePrompt(e.target.value)}
                                    placeholder="Enter a different prompt to extract activations from..."
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                    rows={3}
                                />
                            </div>

                            <button
                                onClick={handleGenerateSource}
                                disabled={!patchSourcePrompt.trim() || isGeneratingSource}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isGeneratingSource ? (
                                    <>
                                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FiPlay className="w-4 h-4" />
                                        Generate Source Response
                                    </>
                                )}
                            </button>

                            {sourceResponse && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FiCheck className="w-4 h-4 text-green-600" />
                                        <span className="font-medium text-green-800">Source Response Generated</span>
                                    </div>
                                    <div className="text-sm text-slate-700 mb-3">
                                        <span className="font-medium">Response:</span> {sourceResponse.generated.text}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Select Token Position for Activation Extraction
                                        </label>
                                        <div className="flex flex-wrap gap-1">
                                            {sourceTokens.map((token, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPatchSourcePosition(idx)}
                                                    className={`px-2 py-1 rounded text-sm border transition-colors ${patchSourcePosition === idx
                                                        ? 'bg-orange-500 text-white border-orange-500'
                                                        : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300'
                                                        }`}
                                                >
                                                    {token}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Configure Layers */}
                    {sourceResponse && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
                                <h3 className="font-semibold text-slate-800">Select Layers to Patch</h3>
                            </div>

                            <div className="ml-8 space-y-3">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        onClick={() => setSelectedLayers(availableLayers)}
                                        className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={() => setSelectedLayers([])}
                                        className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <span className="text-sm text-slate-500">
                                        {selectedLayers.length} of {availableLayers.length} layers selected
                                    </span>
                                </div>

                                <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                                    {availableLayers.map(layer => (
                                        <button
                                            key={layer}
                                            onClick={() => handleLayerToggle(layer)}
                                            className={`p-2 text-sm rounded border transition-colors ${selectedLayers.includes(layer)
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300'
                                                }`}
                                        >
                                            {layer}
                                        </button>
                                    ))}
                                </div>

                                {/* Layer-specific neuron configuration */}
                                {selectedLayers.length > 0 && (
                                    <div className="space-y-3 border-t border-slate-200 pt-4">
                                        <h4 className="font-medium text-slate-700">Neuron Configuration</h4>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {selectedLayers.map(layer => (
                                                <div key={layer} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                                                    <span className="text-sm font-medium text-slate-700 min-w-[60px]">
                                                        Layer {layer}:
                                                    </span>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={layerNeurons[layer]?.entire_layer || false}
                                                            onChange={() => handleEntireLayerToggle(layer)}
                                                            className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                                                        />
                                                        <span className="text-sm text-slate-600">Entire Layer</span>
                                                    </label>
                                                    {!layerNeurons[layer]?.entire_layer && (
                                                        <input
                                                            type="text"
                                                            placeholder="Neuron IDs (e.g., 0,15,42)"
                                                            value={layerNeurons[layer]?.neuron_ids?.join(',') || ''}
                                                            onChange={(e) => handleNeuronIdsChange(layer, e.target.value)}
                                                            className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Configure Target */}
                    {sourceResponse && selectedLayers.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
                                <h3 className="font-semibold text-slate-800">Configure Target Context</h3>
                            </div>

                            <div className="ml-8 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Target Prompt (optional modification)
                                    </label>
                                    <textarea
                                        value={targetPrompt}
                                        onChange={(e) => setTargetPrompt(e.target.value)}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                        rows={3}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Activations will be patched into position {position} during generation of this prompt
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    {isConfigValid() && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <FiInfo className="w-4 h-4 text-orange-600" />
                                <span className="font-medium text-orange-800">Patching Summary</span>
                            </div>
                            <div className="space-y-2 text-sm text-slate-700">
                                <p>
                                    <span className="font-medium">Source:</span> Extract activations from "{sourceTokens[patchSourcePosition]}"
                                    (position {patchSourcePosition}) in response to: "{patchSourcePrompt}"
                                </p>
                                <p>
                                    <span className="font-medium">Target:</span> Patch into "{selectedToken}"
                                    (position {position}) during generation
                                </p>
                                <p>
                                    <span className="font-medium">Layers:</span> {selectedLayers.length} layers
                                    ({selectedLayers.filter(l => layerNeurons[l]?.entire_layer).length} entire, {selectedLayers.filter(l => !layerNeurons[l]?.entire_layer).length} partial)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRunPatching}
                            disabled={!isConfigValid()}
                            className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FiArrowRight className="w-4 h-4" />
                            Run Activation Patching
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivationPatching;