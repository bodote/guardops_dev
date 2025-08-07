'use client'
import { useState } from "react";
import { FiRefreshCw, FiPlay, FiLoader, FiTarget } from "react-icons/fi";

const ActivationPatchingExperiment = ({ selectedToken, selectedModel, response, isRunning, results, onRun }) => {
    const [patchSourcePrompt, setPatchSourcePrompt] = useState("");
    const [patchSourcePosition, setPatchSourcePosition] = useState(0);
    const [targetPrompt, setTargetPrompt] = useState(response?.prompt?.text || '');
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [layerNeurons, setLayerNeurons] = useState({});
    const [sourceResponse, setSourceResponse] = useState(null);
    const [isGeneratingSource, setIsGeneratingSource] = useState(false);

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
            const response_data = await fetch('/api/interpretability/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model_id: selectedModel?.model_id,
                    prompt: patchSourcePrompt
                })
            });

            const data = await response_data.json();
            setSourceResponse(data);
        } catch (error) {
            console.error('Error generating source response:', error);
        } finally {
            setIsGeneratingSource(false);
        }
    };

    const handleRun = () => {
        const patchConfig = {
            layers: selectedLayers,
            neurons: layerNeurons
        };

        onRun({
            original_prompt: response.prompt.text,
            patch_source_prompt: patchSourcePrompt,
            patch_source_position: patchSourcePosition,
            target_prompt: targetPrompt,
            target_position: selectedToken.position,
            patch_config: patchConfig
        });
    };

    const selectAllLayers = () => {
        setSelectedLayers([...availableLayers]);
        const newNeurons = {};
        availableLayers.forEach(layer => {
            newNeurons[layer] = { entire_layer: true, neuron_ids: [] };
        });
        setLayerNeurons(newNeurons);
    };

    const clearLayers = () => {
        setSelectedLayers([]);
        setLayerNeurons({});
    };

    const canRun = patchSourcePrompt.trim() && sourceResponse && selectedLayers.length > 0 &&
        patchSourcePosition < (sourceResponse?.generated?.tokens?.length || 0);

    // Create diff display for results
    const createTokenDiff = (originalTokens, patchedTokens) => {
        const diff = [];
        const maxLength = Math.max(originalTokens.length, patchedTokens.length);

        for (let i = 0; i < maxLength; i++) {
            const originalToken = originalTokens[i];
            const patchedToken = patchedTokens[i];

            if (originalToken && patchedToken) {
                if (originalToken === patchedToken) {
                    diff.push({ type: 'unchanged', token: originalToken, position: i });
                } else {
                    diff.push({ type: 'removed', token: originalToken, position: i });
                    diff.push({ type: 'added', token: patchedToken, position: i });
                }
            } else if (originalToken && !patchedToken) {
                diff.push({ type: 'removed', token: originalToken, position: i });
            } else if (!originalToken && patchedToken) {
                diff.push({ type: 'added', token: patchedToken, position: i });
            }
        }

        return diff;
    };

    return (
        <div className="h-full flex">
            {/* Left Column: Configuration */}
            <div className="w-1/3 bg-orange-50 border-r border-orange-200 flex flex-col">
                {/* Fixed Header */}
                <div className="flex-shrink-0 p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                            <FiRefreshCw className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800">Activation Patching</h3>
                            <p className="text-sm text-slate-600">Inject activations</p>
                        </div>
                    </div>
                </div>

                {/* Fixed Run Button */}
                <div className="flex-shrink-0 px-6 pb-4">
                    <button
                        onClick={handleRun}
                        disabled={!canRun}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
                    >
                        <FiPlay className="w-4 h-4" />
                        Run Patching
                    </button>
                </div>

                {/* Scrollable Configuration - INDEPENDENT SCROLL */}
                <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <div className="bg-white rounded-lg border border-orange-200 p-4 mb-4 space-y-4">
                        {/* Step 1: Source Generation */}
                        <div>
                            <h4 className="font-medium text-slate-800 mb-2">1. Generate Source Context</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Source Prompt
                                    </label>
                                    <textarea
                                        value={patchSourcePrompt}
                                        onChange={(e) => setPatchSourcePrompt(e.target.value)}
                                        placeholder="Enter a different prompt to extract activations from..."
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                        rows={2}
                                    />
                                </div>

                                <button
                                    onClick={handleGenerateSource}
                                    disabled={!patchSourcePrompt.trim() || isGeneratingSource}
                                    className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors text-sm"
                                >
                                    {isGeneratingSource ? (
                                        <>
                                            <FiLoader className="w-4 h-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FiPlay className="w-4 h-4" />
                                            Generate Source
                                        </>
                                    )}
                                </button>

                                {sourceResponse && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="text-sm text-slate-700 mb-2">
                                            <span className="font-medium">Response:</span> {sourceResponse.generated.text}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Select Source Token
                                            </label>
                                            <div className="flex flex-wrap gap-1">
                                                {sourceResponse.generated.tokens.map((token, idx) => (
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

                        {/* Step 2: Layer Selection */}
                        {sourceResponse && (
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">2. Select Layers to Patch</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={selectAllLayers}
                                            className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                                        >
                                            Select All
                                        </button>
                                        <button
                                            onClick={clearLayers}
                                            className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                        <span className="text-sm text-slate-500">
                                            {selectedLayers.length} of {availableLayers.length} layers selected
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-2">
                                        {availableLayers.map(layer => (
                                            <button
                                                key={layer}
                                                onClick={() => handleLayerToggle(layer)}
                                                className={`p-2 text-xs rounded transition-colors ${selectedLayers.includes(layer)
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {layer}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Layer-specific neuron configuration */}
                                    {selectedLayers.length > 0 && (
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {selectedLayers.slice(0, 3).map(layer => ( // Show only first 3 for space
                                                <div key={layer} className="flex items-center gap-4 p-2 bg-slate-50 rounded text-sm">
                                                    <span className="font-medium text-slate-700 min-w-[60px]">
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
                                                            placeholder="0,15,42"
                                                            value={layerNeurons[layer]?.neuron_ids?.join(',') || ''}
                                                            onChange={(e) => handleNeuronIdsChange(layer, e.target.value)}
                                                            className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            {selectedLayers.length > 3 && (
                                                <p className="text-xs text-slate-500 text-center">
                                                    ...and {selectedLayers.length - 3} more layers
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Target Configuration */}
                        {sourceResponse && selectedLayers.length > 0 && (
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">3. Target Context</h4>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Target Prompt (optional modification)
                                    </label>
                                    <textarea
                                        value={targetPrompt}
                                        onChange={(e) => setTargetPrompt(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Right Column: Results */}
            <div className="w-2/3 bg-white">
                {/* INDEPENDENT SCROLLABLE RESULTS */}
                <div className="h-full overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    {isRunning && (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiLoader className="w-6 h-6 text-orange-600 animate-spin" />
                                </div>
                                <p className="text-slate-600">Running activation patching on {selectedLayers.length} layers...</p>
                            </div>
                        </div>
                    )}

                    {!results && !isRunning && (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center text-slate-500">
                                <FiRefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h4 className="font-medium mb-2">Ready to Patch</h4>
                                <p className="text-sm">Configure and run the patching to see results here</p>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg border border-orange-200 overflow-hidden">
                                <div className="p-4 bg-orange-50 border-b border-orange-200">
                                    <h4 className="font-medium text-slate-800">Patching Results</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Comparing original vs patched responses
                                    </p>
                                </div>

                                {/* Configuration Used */}
                                <div className="p-4 bg-slate-50 border-b border-slate-200">
                                    <h5 className="font-medium text-slate-800 mb-3">Patching Configuration</h5>
                                    <div className="space-y-3">
                                        {/* Target Information */}
                                        <div className="text-sm">
                                            <span className="font-medium text-slate-700">Target Token:</span>
                                            <span className="ml-2 font-mono bg-white px-2 py-1 rounded border">"{selectedToken.token}"</span>
                                            <span className="ml-2 text-slate-500">(position {selectedToken.position})</span>
                                        </div>

                                        {/* Source Information */}
                                        <div className="text-sm">
                                            <span className="font-medium text-slate-700">Source Context:</span>
                                            <div className="mt-1 p-2 bg-white rounded border">
                                                <div className="font-mono text-xs mb-1">{results.patch_source_prompt}</div>
                                                <div className="text-slate-600">
                                                    Extracted from: <span className="font-mono">"{results.patch_source_response?.tokens?.[results.patch_source_position]}"</span>
                                                    <span className="ml-1 text-slate-500">(position {results.patch_source_position})</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Patched Layers */}
                                        {results.patch_config?.layer_details && (
                                            <div className="text-sm">
                                                <span className="font-medium text-slate-700">Patched Layers:</span>
                                                <div className="mt-2 space-y-1">
                                                    {results.patch_config.layer_details.map((layer, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border text-xs">
                                                            <span className="font-mono">Layer {layer.layer}:</span>
                                                            {layer.entire_layer ? (
                                                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Entire Layer</span>
                                                            ) : (
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                    Neurons: {layer.neuron_ids?.length > 0 ? layer.neuron_ids.join(', ') : 'None'}
                                                                </span>
                                                            )}
                                                            <span className="text-slate-500">({layer.neuron_count} neurons)</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Target Prompt if Modified */}
                                        {results.target_prompt !== results.original_prompt && (
                                            <div className="text-sm">
                                                <span className="font-medium text-slate-700">Modified Target Prompt:</span>
                                                <div className="mt-1 p-2 bg-white rounded border font-mono text-xs">
                                                    {results.target_prompt}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 space-y-4">
                                    {/* Original Response */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                            <span className="font-medium text-slate-700">Original Response</span>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-sm">
                                            {results.original_response?.text}
                                        </div>
                                    </div>

                                    {/* Patched Response */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <span className="font-medium text-slate-700">Patched Response</span>
                                        </div>
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 font-mono text-sm">
                                            {results.patched_result?.generated?.text}
                                        </div>
                                    </div>

                                    {/* Token Diff */}
                                    {results.original_response?.tokens && results.patched_result?.generated?.tokens && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium text-slate-700">Token-by-Token Changes</span>
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-48 overflow-y-auto">
                                                {createTokenDiff(
                                                    results.original_response.tokens,
                                                    results.patched_result.generated.tokens
                                                ).map((diff, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-2 text-sm font-mono">
                                                        <div className="w-8 text-right text-slate-500">
                                                            {diff.position + 1}
                                                        </div>
                                                        <div className="w-4 text-center">
                                                            {diff.type === 'removed' && <span className="text-red-600">-</span>}
                                                            {diff.type === 'added' && <span className="text-blue-600">+</span>}
                                                            {diff.type === 'unchanged' && <span className="text-slate-400">│</span>}
                                                        </div>
                                                        <div className={`flex-1 px-2 py-1 rounded ${diff.type === 'removed' ? 'bg-red-50 text-red-800 line-through' :
                                                            diff.type === 'added' ? 'bg-blue-50 text-blue-800' :
                                                                'text-slate-600'
                                                            }`}>
                                                            "{diff.token}"
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Run New Patching
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivationPatchingExperiment;