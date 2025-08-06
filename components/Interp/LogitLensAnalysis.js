'use client'
import { useState } from "react";
import { FiLayers, FiTarget, FiX, FiInfo } from "react-icons/fi";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const LogitLensAnalysis = ({ analysisData, onClose, selectedToken, position }) => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [topN, setTopN] = useState(10);
    const [customTopN, setCustomTopN] = useState('');
    const [selectedLayers, setSelectedLayers] = useState(new Set()); // Individual layer selection

    if (!analysisData) return null;

    const { layer_predictions, actual_token, model_id, total_layers } = analysisData;

    // Initialize selected layers on first render (all layers selected by default)
    if (selectedLayers.size === 0 && layer_predictions.length > 0) {
        setSelectedLayers(new Set(layer_predictions.map(pred => pred.layer)));
    }

    // Filter layers based on individual selection
    const filteredLayers = layer_predictions.filter(pred => selectedLayers.has(pred.layer));

    // Helper functions for layer selection
    const toggleLayer = (layer) => {
        const newSelectedLayers = new Set(selectedLayers);
        if (newSelectedLayers.has(layer)) {
            newSelectedLayers.delete(layer);
        } else {
            newSelectedLayers.add(layer);
        }
        setSelectedLayers(newSelectedLayers);
    };

    const selectAllLayers = () => {
        setSelectedLayers(new Set(layer_predictions.map(pred => pred.layer)));
    };

    const deselectAllLayers = () => {
        setSelectedLayers(new Set());
    };

    // Helper function for Top N
    const handleTopNChange = (value) => {
        if (value === 'custom') {
            // Don't change topN yet, wait for custom input
            return;
        }
        setTopN(parseInt(value));
        setCustomTopN('');
    };

    const handleCustomTopNSubmit = () => {
        const customValue = parseInt(customTopN);
        if (customValue && customValue > 0 && customValue <= 20) {
            setTopN(customValue);
        }
    };

    // Create heatmap grid data
    const createHeatmapData = () => {
        const heatmapGrid = [];

        // Create rows for each rank
        for (let rank = 0; rank < topN; rank++) {
            const rankRow = [];

            filteredLayers.forEach((layerPred) => {
                const tokenAtRank = layerPred.top_predictions[rank];
                rankRow.push({
                    layer: layerPred.layer,
                    rank: rank + 1,
                    token: tokenAtRank?.token || '',
                    probability: tokenAtRank?.probability || 0,
                    isActualToken: tokenAtRank?.token === actual_token
                });
            });

            heatmapGrid.push(rankRow);
        }

        return heatmapGrid;
    };

    const heatmapData = createHeatmapData();

    // Helper functions for styling
    const getProbabilityColor = (probability, isActualToken = false) => {
        if (probability === 0) return '#f1f5f9'; // Light gray for empty

        if (isActualToken) {
            const intensity = Math.min(probability * 1.5, 1);
            return `rgba(34, 197, 94, ${intensity})`; // Green for actual token
        }

        const intensity = Math.min(probability * 1.2, 1);
        return `rgba(59, 130, 246, ${intensity})`; // Blue scale
    };

    const getTextColor = (probability, isActualToken = false) => {
        if (probability === 0) return '#64748b';
        return probability > 0.4 || (isActualToken && probability > 0.2) ? 'white' : 'black';
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                <FiLayers className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-Archivo text-xl font-bold text-slate-900">
                                    Logit Lens Analysis
                                </h2>
                                <p className="text-sm text-slate-600">
                                    Token: "<span className="font-medium text-purple-700">{selectedToken}</span>" at position {position}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <FiX className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Analysis Info */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-slate-600">Model:</span>
                                <div className="font-medium text-slate-900">{model_id.split('/').pop()}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Total Layers:</span>
                                <div className="font-medium text-slate-900">{total_layers}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Analyzed Layers:</span>
                                <div className="font-medium text-slate-900">{layer_predictions.length}</div>
                            </div>
                            <div>
                                <span className="text-slate-600">Actual Token:</span>
                                <div className="font-medium text-green-700">"{actual_token}"</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-slate-900 mb-4">Chart Controls</h4>

                        {/* Top N Control - Enhanced */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Show Top N Predictions (Currently: {topN})
                            </label>
                            <div className="flex gap-2 items-center">
                                <select
                                    value={topN}
                                    onChange={(e) => handleTopNChange(e.target.value)}
                                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                >
                                    <option value={5}>Top 5</option>
                                    <option value={10}>Top 10</option>
                                    <option value={15}>Top 15</option>
                                    <option value={20}>Top 20</option>
                                    <option value="custom">Custom...</option>
                                </select>

                                {/* Custom Top N Input */}
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        placeholder="Enter N"
                                        value={customTopN}
                                        onChange={(e) => setCustomTopN(e.target.value)}
                                        className="w-20 px-2 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                    />
                                    <button
                                        onClick={handleCustomTopNSubmit}
                                        disabled={!customTopN || parseInt(customTopN) < 1 || parseInt(customTopN) > 20}
                                        className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Enter any number between 1-20 for precise control
                            </p>
                        </div>

                        {/* Layer Selection Control */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-slate-700">
                                    Layer Selection ({selectedLayers.size} of {layer_predictions.length} selected)
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAllLayers}
                                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={deselectAllLayers}
                                        className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Individual Layer Checkboxes */}
                            <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3 bg-white">
                                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                                    {layer_predictions.map((layerPred) => (
                                        <label
                                            key={layerPred.layer}
                                            className="flex items-center gap-1 text-xs cursor-pointer hover:bg-slate-50 p-1 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedLayers.has(layerPred.layer)}
                                                onChange={() => toggleLayer(layerPred.layer)}
                                                className="w-3 h-3 text-purple-600 rounded focus:ring-purple-500 focus:ring-2"
                                            />
                                            <span className="font-mono text-xs">
                                                L{layerPred.layer}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Select specific layers to include in the heatmap. Scroll to see all {layer_predictions.length} available layers.
                            </p>
                        </div>
                    </div>

                    {/* Heatmap Visualization with Recharts */}
                    <div className="space-y-4">
                        <h3 className="font-Archivo text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <FiTarget className="w-5 h-5 text-purple-500" />
                            Token Prediction Heatmap
                        </h3>

                        <div className="bg-white border border-slate-200 rounded-lg p-4 overflow-auto">
                            {/* Custom Grid Heatmap */}
                            <div className="min-w-[800px]">
                                {/* Header with layer numbers */}
                                <div className="flex mb-2 sticky top-0 bg-white z-10">
                                    <div className="w-20 text-xs font-medium text-slate-600 py-3 px-3 border-r border-slate-200 bg-slate-50">
                                        Rank
                                    </div>
                                    {filteredLayers.map((layerPred, idx) => (
                                        <div key={layerPred.layer} className="flex-1 min-w-[80px] text-center">
                                            <div className="text-xs font-medium text-slate-600 py-2 px-2 bg-slate-50 border-r border-slate-200">
                                                Layer {layerPred.layer}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Heatmap Grid */}
                                <div className="space-y-1">
                                    {heatmapData.map((rankRow, rowIdx) => (
                                        <div key={rowIdx} className="flex">
                                            {/* Y-axis label (rank) */}
                                            <div className="w-20 flex items-center justify-center text-xs font-medium text-slate-700 border border-slate-200 bg-slate-50 min-h-[50px]">
                                                #{rowIdx + 1}
                                            </div>

                                            {/* Heatmap cells */}
                                            {rankRow.map((cell, colIdx) => (
                                                <div
                                                    key={`${rowIdx}-${colIdx}`}
                                                    className="flex-1 min-w-[80px] min-h-[50px] border border-slate-200 relative group cursor-pointer transition-all duration-150 flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: getProbabilityColor(cell.probability, cell.isActualToken),
                                                        color: getTextColor(cell.probability, cell.isActualToken)
                                                    }}
                                                    onMouseEnter={() => setHoveredCell(cell)}
                                                    onMouseLeave={() => setHoveredCell(null)}
                                                >
                                                    {/* Token display */}
                                                    <div className="text-center p-1">
                                                        <div className="text-xs font-bold truncate max-w-full">
                                                            {cell.token ? `"${cell.token}"` : '-'}
                                                        </div>
                                                        <div className="text-xs opacity-80 mt-1">
                                                            {cell.probability > 0 ? `${(cell.probability * 100).toFixed(0)}%` : ''}
                                                        </div>
                                                        {cell.isActualToken && (
                                                            <div className="text-xs font-bold mt-1">✓</div>
                                                        )}
                                                    </div>

                                                    {/* Hover tooltip */}
                                                    {hoveredCell === cell && cell.token && (
                                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg shadow-lg z-20 whitespace-nowrap">
                                                            <div className="font-medium">"{cell.token}"</div>
                                                            <div>Rank #{cell.rank} • {(cell.probability * 100).toFixed(1)}%</div>
                                                            <div>Layer {cell.layer}</div>
                                                            {cell.isActualToken && (
                                                                <div className="text-green-300 font-medium">✓ Actual token</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                            <FiInfo className="w-4 h-4" />
                            How to Read This Chart
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div className="space-y-2">
                                <p>• <strong>Columns:</strong> Model layers (left = early, right = late)</p>
                                <p>• <strong>Rows:</strong> Token prediction rank (#1 = most likely)</p>
                                <p>• <strong>Cell content:</strong> Token text + probability percentage</p>
                                <p>• <strong>Color intensity:</strong> Darker = higher probability</p>
                            </div>
                            <div className="space-y-2">
                                <p>• <span className="inline-block w-3 h-3 bg-blue-500 mr-1"></span><strong>Blue cells:</strong> Alternative predictions</p>
                                <p>• <span className="inline-block w-3 h-3 bg-green-500 mr-1"></span><strong>Green cells:</strong> Actual token chosen</p>
                                <p>• <strong>✓ checkmark:</strong> Marks the token the model actually chose</p>
                                <p>• <strong>Hover</strong> any cell for detailed information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogitLensAnalysis;