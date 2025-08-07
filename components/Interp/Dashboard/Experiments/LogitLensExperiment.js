'use client'
import { useState, useEffect, useCallback } from "react";
import { FiLayers, FiPlay, FiLoader, FiSettings } from "react-icons/fi";

const LogitLensExperiment = ({ selectedToken, selectedModel, response, isRunning, results, onRun }) => {
    const [topN, setTopN] = useState(10);
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [autoRun, setAutoRun] = useState(false);

    const availableLayers = selectedModel?.config?.num_hidden_layers
        ? Array.from({ length: selectedModel.config.num_hidden_layers }, (_, i) => i)
        : Array.from({ length: 32 }, (_, i) => i);

    // Auto-select middle layers initially
    useEffect(() => {
        if (selectedLayers.length === 0 && availableLayers.length > 0) {
            const middle = Math.floor(availableLayers.length / 2);
            const initialLayers = [
                Math.max(0, middle - 2),
                middle - 1,
                middle,
                middle + 1,
                Math.min(availableLayers.length - 1, middle + 2)
            ].filter(l => l >= 0 && l < availableLayers.length);
            setSelectedLayers(initialLayers);
        }
    }, [availableLayers.length, selectedLayers.length]);

    const handleRun = useCallback(() => {
        onRun({
            top_n: topN,
            layers: selectedLayers
        });
    }, [onRun, topN, selectedLayers]);

    // Auto-run when token changes
    useEffect(() => {
        if (autoRun && selectedToken && selectedLayers.length > 0 && !isRunning && !results) {
            handleRun();
        }
    }, [selectedToken, selectedLayers, autoRun, isRunning, results, handleRun]);

    const handleLayerToggle = (layer) => {
        setSelectedLayers(prev =>
            prev.includes(layer)
                ? prev.filter(l => l !== layer)
                : [...prev, layer].sort((a, b) => a - b)
        );
    };

    const selectAllLayers = () => setSelectedLayers([...availableLayers]);
    const clearLayers = () => setSelectedLayers([]);

    return (
        <div className="h-full flex">
            {/* Left Column: Configuration */}
            <div className="w-1/3 bg-purple-50 border-r border-purple-200 flex flex-col">
                {/* Fixed Header */}
                <div className="flex-shrink-0 p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                            <FiLayers className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800">Logit Lens</h3>
                            <p className="text-sm text-slate-600">Alternative tokens</p>
                        </div>
                    </div>
                </div>

                {/* Fixed Run Button */}
                <div className="flex-shrink-0 px-6 pb-4">
                    <button
                        onClick={handleRun}
                        disabled={selectedLayers.length === 0}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                        <FiPlay className="w-4 h-4" />
                        Run Analysis
                    </button>
                </div>

                {/* Scrollable Configuration - INDEPENDENT SCROLL */}
                <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <div className="bg-white rounded-lg border border-purple-200 p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Top N Predictions
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="20"
                                    value={topN}
                                    onChange={(e) => setTopN(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Layers ({selectedLayers.length} selected)
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAllLayers}
                                        className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
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
                        </div>

                        <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-2">
                            {availableLayers.map(layer => (
                                <button
                                    key={layer}
                                    onClick={() => handleLayerToggle(layer)}
                                    className={`p-2 text-xs rounded transition-colors ${selectedLayers.includes(layer)
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>
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
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiLoader className="w-6 h-6 text-purple-600 animate-spin" />
                                </div>
                                <p className="text-slate-600">Analyzing logit lens across {selectedLayers.length} layers...</p>
                            </div>
                        </div>
                    )}

                    {!results && !isRunning && (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center text-slate-500">
                                <FiLayers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h4 className="font-medium mb-2">Ready to Analyze</h4>
                                <p className="text-sm">Configure and run the analysis to see results here</p>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg border border-purple-200 overflow-hidden">
                                <div className="p-4 bg-purple-50 border-b border-purple-200">
                                    <h4 className="font-medium text-slate-800">Layer-by-Layer Predictions</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Showing top {results.config?.top_n || topN} alternatives for token "{selectedToken.token}"
                                    </p>
                                </div>

                                <div className="overflow-auto max-h-96">
                                    {results.layer_predictions && results.layer_predictions.length > 0 ? (
                                        <div className="p-4">
                                            {/* Heatmap Header */}
                                            <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `100px repeat(${results.layer_predictions.length}, 1fr)` }}>
                                                <div className="text-xs font-medium text-slate-600 p-2">Token Rank</div>
                                                {results.layer_predictions.map(layerData => (
                                                    <div key={layerData.layer} className="text-xs font-medium text-center text-slate-700 p-2 bg-slate-100 rounded">
                                                        L{layerData.layer}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Heatmap Grid */}
                                            <div className="space-y-1">
                                                {Array.from({ length: topN }, (_, rankIdx) => (
                                                    <div key={rankIdx} className="grid gap-1" style={{ gridTemplateColumns: `100px repeat(${results.layer_predictions.length}, 1fr)` }}>
                                                        {/* Rank Label */}
                                                        <div className="text-xs font-medium text-slate-600 p-2 bg-slate-50 rounded flex items-center">
                                                            #{rankIdx + 1}
                                                        </div>

                                                        {/* Token Cells */}
                                                        {results.layer_predictions.map(layerData => {
                                                            const tokenData = layerData.top_predictions?.[rankIdx];
                                                            const isActualToken = tokenData?.token === layerData.actual_token;
                                                            const probability = tokenData?.probability || 0;

                                                            // Color intensity based on probability
                                                            const intensity = Math.min(Math.max(probability * 100, 10), 90);
                                                            const bgColor = isActualToken
                                                                ? `rgba(34, 197, 94, ${intensity / 100})` // Green for actual token
                                                                : `rgba(147, 51, 234, ${intensity / 100})`; // Purple for alternatives

                                                            return (
                                                                <div
                                                                    key={`${layerData.layer}-${rankIdx}`}
                                                                    className="relative p-2 rounded text-xs border border-slate-200 min-h-[40px] flex flex-col justify-center"
                                                                    style={{ backgroundColor: bgColor }}
                                                                >
                                                                    {tokenData ? (
                                                                        <>
                                                                            <div className="font-mono text-slate-800 truncate text-center">
                                                                                {tokenData.token}
                                                                            </div>
                                                                            <div className="text-slate-600 text-center">
                                                                                {(probability * 100).toFixed(1)}%
                                                                            </div>
                                                                            {isActualToken && (
                                                                                <div className="absolute top-0 right-0 text-green-700">
                                                                                    ✓
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <div className="text-slate-400 text-center">-</div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Legend */}
                                            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-green-300 rounded"></div>
                                                    <span>Actual Token</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-purple-300 rounded"></div>
                                                    <span>Alternative</span>
                                                </div>
                                                <div className="text-slate-500">
                                                    Darker = Higher Probability
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-slate-500">
                                            <p>No layer predictions found in results.</p>
                                            <pre className="mt-2 text-xs bg-slate-100 p-2 rounded overflow-auto text-left">
                                                {JSON.stringify(results, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    // Reset results to allow running a new analysis
                                    onRun({
                                        top_n: topN,
                                        layers: selectedLayers
                                    });
                                }}
                                className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                            >
                                Run New Analysis
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogitLensExperiment;