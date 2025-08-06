'use client'
import { useState } from "react";
import { FiXCircle, FiX, FiInfo, FiBarChart, FiArrowRight, FiAlertTriangle, FiGitBranch } from "react-icons/fi";
import SubtleTokenDisplay from './SubtleTokenDisplay';

const AblationComparison = ({ ablationResults, onClose, selectedToken, position }) => {
    const [activeTab, setActiveTab] = useState('comparison');

    if (!ablationResults) return null;

    const {
        model_id,
        original_prompt,
        modified_prompt,
        ablation_config,
        original_response,
        ablated_result,
        comparison_metrics
    } = ablationResults;



    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-red-50">
                    <h2 className="font-Archivo text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FiXCircle className="w-6 h-6 text-red-500" />
                        Ablation Study Results for "{selectedToken}" at Position {position}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700 transition-colors">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-slate-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('comparison')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'comparison'
                                ? 'border-red-500 text-red-600 bg-red-50'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Side-by-Side Comparison
                        </button>
                        <button
                            onClick={() => setActiveTab('diff')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'diff'
                                ? 'border-red-500 text-red-600 bg-red-50'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Token-by-Token Diff
                        </button>
                        <button
                            onClick={() => setActiveTab('config')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'config'
                                ? 'border-red-500 text-red-600 bg-red-50'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Ablation Configuration
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {activeTab === 'comparison' && (
                        <div className="space-y-6">
                            {/* Impact Summary */}
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <FiAlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-orange-900 mb-1">Ablation Impact Detected</h3>
                                        <p className="text-sm text-orange-700">
                                            The ablated components have significantly altered the model's output.
                                            Compare the original and ablated responses below to understand the causal impact.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Side-by-Side Comparison */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Original Response */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-Archivo text-lg font-semibold text-green-900">
                                                Original Response
                                            </h3>
                                            <p className="text-sm text-green-700">Normal model behavior</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-green-800 mb-2">Prompt:</h4>
                                            <div className="bg-white rounded-lg p-3 border border-green-300">
                                                <p className="text-sm text-slate-800">"{original_prompt}"</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-green-800 mb-2">Response:</h4>
                                            <div className="bg-white rounded-lg p-3 border border-green-300">
                                                <SubtleTokenDisplay
                                                    text={original_response.text}
                                                    tokens={original_response.tokens}
                                                    large={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ablated Response */}
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                            <FiXCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-Archivo text-lg font-semibold text-red-900">
                                                Ablated Response
                                            </h3>
                                            <p className="text-sm text-red-700">
                                                {ablation_config.layers_ablated} layers, {ablation_config.total_neurons_ablated} neurons disabled
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-red-800 mb-2">Modified Prompt:</h4>
                                            <div className="bg-white rounded-lg p-3 border border-red-300">
                                                <p className="text-sm text-slate-800">"{modified_prompt}"</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-red-800 mb-2">Ablated Response:</h4>
                                            <div className="bg-white rounded-lg p-3 border border-red-300">
                                                <SubtleTokenDisplay
                                                    text={ablated_result.generated.text}
                                                    tokens={ablated_result.generated.tokens}
                                                    large={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Comparison Arrow */}
                            <div className="flex justify-center">
                                <div className="bg-slate-100 rounded-full p-3">
                                    <FiArrowRight className="w-6 h-6 text-slate-600" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'diff' && (
                        <div className="space-y-6">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <FiGitBranch className="w-5 h-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-orange-900 mb-1">Token-by-Token Differences</h3>
                                        <p className="text-sm text-orange-700">
                                            See exactly which tokens changed due to ablation. Green = unchanged, Red = removed, Blue = added.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Diff View */}
                            <div className="bg-white border border-slate-200 rounded-lg">
                                <div className="border-b border-slate-200 p-4 bg-slate-50">
                                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                                        <FiGitBranch className="w-4 h-4" />
                                        Response Diff Analysis
                                    </h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Comparing original response vs ablated response token sequences
                                    </p>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Length comparison */}
                                    <div className="bg-slate-50 rounded-lg p-3 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Length Change:</span>
                                            <span className={`font-medium ${ablated_result.generated.tokens.length === original_response.tokens.length
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}>
                                                {original_response.tokens.length} → {ablated_result.generated.tokens.length} tokens
                                                {ablated_result.generated.tokens.length !== original_response.tokens.length && (
                                                    <span className="ml-2">
                                                        ({ablated_result.generated.tokens.length - original_response.tokens.length > 0 ? '+' : ''}
                                                        {ablated_result.generated.tokens.length - original_response.tokens.length})
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Git-style diff visualization */}
                                    <div className="bg-slate-800 rounded-lg overflow-hidden font-mono text-sm">
                                        {/* Diff header */}
                                        <div className="bg-slate-700 px-4 py-2 text-slate-300 border-b border-slate-600">
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-400">---</span>
                                                <span>original_response.tokens</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400">+++</span>
                                                <span>ablated_response.tokens</span>
                                            </div>
                                        </div>

                                        {/* Line-by-line diff */}
                                        <div className="max-h-96 overflow-y-auto">
                                            {(() => {
                                                const maxLength = Math.max(
                                                    original_response.tokens.length,
                                                    ablated_result.generated.tokens.length
                                                );
                                                const diffLines = [];

                                                for (let i = 0; i < maxLength; i++) {
                                                    const originalToken = original_response.tokens[i];
                                                    const ablatedToken = ablated_result.generated.tokens[i];

                                                    if (originalToken && ablatedToken) {
                                                        if (originalToken === ablatedToken) {
                                                            // Unchanged line
                                                            diffLines.push(
                                                                <div key={`line-${i}`} className="flex">
                                                                    <div className="w-8 bg-slate-700 text-slate-400 text-center py-1 border-r border-slate-600">
                                                                        {i + 1}
                                                                    </div>
                                                                    <div className="flex-1 px-4 py-1 bg-slate-800 text-slate-300">
                                                                        <span className="text-slate-500 mr-2"></span>
                                                                        "{originalToken}"
                                                                    </div>
                                                                </div>
                                                            );
                                                        } else {
                                                            // Changed line - show both
                                                            diffLines.push(
                                                                <div key={`line-${i}-removed`} className="flex">
                                                                    <div className="w-8 bg-red-900 text-red-300 text-center py-1 border-r border-red-700">
                                                                        {i + 1}
                                                                    </div>
                                                                    <div className="flex-1 px-4 py-1 bg-red-900/20 text-red-300">
                                                                        <span className="text-red-400 mr-2 font-bold">-</span>
                                                                        "{originalToken}"
                                                                    </div>
                                                                </div>
                                                            );
                                                            diffLines.push(
                                                                <div key={`line-${i}-added`} className="flex">
                                                                    <div className="w-8 bg-green-900 text-green-300 text-center py-1 border-r border-green-700">
                                                                        {i + 1}
                                                                    </div>
                                                                    <div className="flex-1 px-4 py-1 bg-green-900/20 text-green-300">
                                                                        <span className="text-green-400 mr-2 font-bold">+</span>
                                                                        "{ablatedToken}"
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    } else if (originalToken && !ablatedToken) {
                                                        // Removed line
                                                        diffLines.push(
                                                            <div key={`line-${i}-removed`} className="flex">
                                                                <div className="w-8 bg-red-900 text-red-300 text-center py-1 border-r border-red-700">
                                                                    {i + 1}
                                                                </div>
                                                                <div className="flex-1 px-4 py-1 bg-red-900/20 text-red-300">
                                                                    <span className="text-red-400 mr-2 font-bold">-</span>
                                                                    "{originalToken}"
                                                                </div>
                                                            </div>
                                                        );
                                                    } else if (!originalToken && ablatedToken) {
                                                        // Added line
                                                        diffLines.push(
                                                            <div key={`line-${i}-added`} className="flex">
                                                                <div className="w-8 bg-green-900 text-green-300 text-center py-1 border-r border-green-700">
                                                                    {i + 1}
                                                                </div>
                                                                <div className="flex-1 px-4 py-1 bg-green-900/20 text-green-300">
                                                                    <span className="text-green-400 mr-2 font-bold">+</span>
                                                                    "{ablatedToken}"
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                }

                                                return diffLines;
                                            })()}
                                        </div>

                                        {/* Diff stats footer */}
                                        <div className="bg-slate-700 px-4 py-2 text-slate-400 border-t border-slate-600 text-xs">
                                            {(() => {
                                                const originalLength = original_response.tokens.length;
                                                const ablatedLength = ablated_result.generated.tokens.length;
                                                const sharedCount = original_response.tokens.filter((token, index) =>
                                                    ablated_result.generated.tokens[index] === token
                                                ).length;
                                                const additions = ablatedLength - sharedCount;
                                                const deletions = originalLength - sharedCount;

                                                return (
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-green-400">+{additions} additions</span>
                                                        <span className="text-red-400">-{deletions} deletions</span>
                                                        <span className="text-slate-300">{sharedCount} unchanged</span>
                                                        <span className="text-slate-500">•</span>
                                                        <span className="text-slate-300">
                                                            {originalLength} → {ablatedLength} tokens
                                                        </span>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Quick Analysis */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-blue-900 mb-3">Impact Analysis</h5>
                                        <div className="space-y-2 text-sm">
                                            {(() => {
                                                const originalLength = original_response.tokens.length;
                                                const ablatedLength = ablated_result.generated.tokens.length;
                                                const positionMatches = original_response.tokens.filter((token, index) =>
                                                    ablated_result.generated.tokens[index] === token
                                                ).length;
                                                const changePercent = ((originalLength - positionMatches) / originalLength) * 100;

                                                let impactLevel = "Minor";
                                                let impactColor = "text-green-700";
                                                if (changePercent > 80) { impactLevel = "Complete"; impactColor = "text-red-700"; }
                                                else if (changePercent > 60) { impactLevel = "Major"; impactColor = "text-orange-700"; }
                                                else if (changePercent > 30) { impactLevel = "Moderate"; impactColor = "text-yellow-700"; }

                                                return (
                                                    <>
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-700">Positional Changes:</span>
                                                            <span className="font-medium text-blue-900">
                                                                {positionMatches}/{originalLength} tokens kept in position
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-700">Length Change:</span>
                                                            <span className="font-medium text-blue-900">
                                                                {originalLength} → {ablatedLength}
                                                                {ablatedLength !== originalLength && (
                                                                    <span className="ml-1">
                                                                        ({ablatedLength - originalLength > 0 ? '+' : ''}{ablatedLength - originalLength})
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-700">Impact Severity:</span>
                                                            <span className={`font-medium ${impactColor}`}>
                                                                {impactLevel} ({changePercent.toFixed(0)}% changed)
                                                            </span>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'config' && (
                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-lg p-4">
                                <h4 className="font-medium text-slate-900 mb-3">Experiment Configuration</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-600">Model:</span>
                                        <div className="font-medium text-slate-900">{model_id.split('/').pop()}</div>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">Layers Ablated:</span>
                                        <div className="font-medium text-slate-900">{ablation_config.layers_ablated}</div>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">Entire Layers:</span>
                                        <div className="font-medium text-slate-900">{ablation_config.entire_layers_ablated}</div>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">Total Neurons:</span>
                                        <div className="font-medium text-slate-900">{ablation_config.total_neurons_ablated}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium text-slate-900">Detailed Ablation Mapping</h4>
                                <div className="space-y-3">
                                    {ablation_config.ablations.map((ablation, index) => (
                                        <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h5 className="font-medium text-slate-900">Layer {ablation.layer}</h5>
                                                <span className={`px-2 py-1 rounded-full text-xs ${ablation.entire_layer
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {ablation.entire_layer ? 'Entire Layer' : 'Specific Neurons'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                {ablation.entire_layer ? (
                                                    <p>All neurons in this layer have been disabled</p>
                                                ) : (
                                                    <div>
                                                        <p className="mb-1">Disabled neurons: {ablation.neurons.length}</p>
                                                        <p className="font-mono text-xs bg-slate-50 p-2 rounded">
                                                            [{ablation.neurons.join(', ')}]
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AblationComparison;