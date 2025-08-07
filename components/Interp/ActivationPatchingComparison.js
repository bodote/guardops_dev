'use client'
import { useState } from "react";
import { FiX, FiRefreshCw, FiLayers, FiTarget, FiArrowRight, FiInfo, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const ActivationPatchingComparison = ({ patchingData, onClose }) => {
    const [activeTab, setActiveTab] = useState('comparison');

    if (!patchingData) return null;

    const {
        original_prompt,
        target_prompt,
        patch_source_prompt,
        patch_source_position,
        target_position,
        patch_config,
        extracted_activations,
        original_response,
        patch_source_response,
        patched_result,
        comparison_metrics
    } = patchingData;

    // Create diff comparison between original and patched responses
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

    const tokenDiff = createTokenDiff(
        original_response.tokens,
        patched_result.generated.tokens
    );

    const diffSummary = {
        added: tokenDiff.filter(d => d.type === 'added').length,
        removed: tokenDiff.filter(d => d.type === 'removed').length,
        unchanged: tokenDiff.filter(d => d.type === 'unchanged').length
    };

    const tabs = [
        { id: 'comparison', label: 'Token-by-Token Diff', icon: FiArrowRight },
        { id: 'configuration', label: 'Patching Configuration', icon: FiLayers }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-xl">
                                <FiRefreshCw className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Activation Patching Results</h2>
                                <p className="text-sm text-slate-600 mt-1">
                                    Comparing original vs patched model responses
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

                {/* Tab Navigation */}
                <div className="border-b border-slate-200">
                    <div className="flex">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-orange-500 text-orange-600 bg-orange-50'
                                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
                    {activeTab === 'comparison' && (
                        <div className="p-6 space-y-6">
                            {/* Context Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Source Context */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FiTarget className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium text-blue-800">Source Context</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-slate-700">
                                            <span className="font-medium">Prompt:</span> {patch_source_prompt}
                                        </p>
                                        <p className="text-slate-700">
                                            <span className="font-medium">Response:</span> {patch_source_response.text}
                                        </p>
                                        <p className="text-blue-700">
                                            <span className="font-medium">Extracted from:</span> "{patch_source_response.tokens[patch_source_position]}" (pos {patch_source_position})
                                        </p>
                                    </div>
                                </div>

                                {/* Patching Info */}
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FiRefreshCw className="w-4 h-4 text-orange-600" />
                                        <span className="font-medium text-orange-800">Patch Applied</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-slate-700">
                                            <span className="font-medium">Layers:</span> {patch_config.layers_patched}
                                        </p>
                                        <p className="text-slate-700">
                                            <span className="font-medium">Neurons:</span> {patch_config.total_neurons_patched.toLocaleString()}
                                        </p>
                                        <p className="text-orange-700">
                                            <span className="font-medium">Target position:</span> {target_position}
                                        </p>
                                    </div>
                                </div>

                                {/* Diff Summary */}
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FiInfo className="w-4 h-4 text-slate-600" />
                                        <span className="font-medium text-slate-800">Change Summary</span>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-blue-700">
                                            <span className="font-medium">+{diffSummary.added}</span> tokens added
                                        </p>
                                        <p className="text-red-700">
                                            <span className="font-medium">-{diffSummary.removed}</span> tokens removed
                                        </p>
                                        <p className="text-slate-600">
                                            <span className="font-medium">{diffSummary.unchanged}</span> unchanged
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Token Diff Visualization */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Token-by-Token Comparison</h3>

                                {/* Original Response */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                        <span className="font-medium text-slate-700">Original Response</span>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                        <div className="font-mono text-sm leading-relaxed">
                                            {original_response.tokens.map((token, idx) => {
                                                const isChanged = !patched_result.generated.tokens[idx] ||
                                                    patched_result.generated.tokens[idx] !== token;
                                                return (
                                                    <span
                                                        key={idx}
                                                        className={`${isChanged ? 'bg-red-100 text-red-800' : ''} px-1 rounded`}
                                                    >
                                                        {token}
                                                        {idx < original_response.tokens.length - 1 ? ' ' : ''}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Patched Response */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        <span className="font-medium text-slate-700">Patched Response</span>
                                    </div>
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                        <div className="font-mono text-sm leading-relaxed">
                                            {patched_result.generated.tokens.map((token, idx) => {
                                                const isChanged = !original_response.tokens[idx] ||
                                                    original_response.tokens[idx] !== token;
                                                return (
                                                    <span
                                                        key={idx}
                                                        className={`${isChanged ? 'bg-blue-100 text-blue-800' : ''} px-1 rounded`}
                                                    >
                                                        {token}
                                                        {idx < patched_result.generated.tokens.length - 1 ? ' ' : ''}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Diff */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">Detailed Changes</h4>
                                    <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-64 overflow-y-auto">
                                        {tokenDiff.map((diff, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 text-sm font-mono">
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
                            </div>
                        </div>
                    )}

                    {activeTab === 'configuration' && (
                        <div className="p-6 space-y-6">
                            {/* Patching Configuration */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Activation Extraction</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-medium text-blue-800 mb-2">Source Context</h4>
                                        <div className="space-y-2 text-sm text-slate-700">
                                            <p><span className="font-medium">Prompt:</span> {patch_source_prompt}</p>
                                            <p><span className="font-medium">Token Position:</span> {patch_source_position}</p>
                                            <p><span className="font-medium">Token:</span> "{patch_source_response.tokens[patch_source_position]}"</p>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                        <h4 className="font-medium text-orange-800 mb-2">Target Context</h4>
                                        <div className="space-y-2 text-sm text-slate-700">
                                            <p><span className="font-medium">Prompt:</span> {target_prompt}</p>
                                            <p><span className="font-medium">Target Position:</span> {target_position}</p>
                                            <p><span className="font-medium">Original Token:</span> "{original_response.tokens[target_position]}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Layer Configuration */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Layer Configuration</h3>

                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-slate-800">{patch_config.layers_patched}</div>
                                            <div className="text-sm text-slate-600">Total Layers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-slate-800">{patch_config.entire_layers_patched}</div>
                                            <div className="text-sm text-slate-600">Entire Layers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-slate-800">{patch_config.total_neurons_patched.toLocaleString()}</div>
                                            <div className="text-sm text-slate-600">Total Neurons</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-slate-700">Layer Details</h4>
                                        <div className="max-h-32 overflow-y-auto">
                                            {patch_config.layer_details.map(layer => (
                                                <div key={layer.layer} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                                                    <span className="font-mono text-sm">Layer {layer.layer}</span>
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        {layer.entire_layer ? (
                                                            <span className="flex items-center gap-1">
                                                                <FiCheckCircle className="w-3 h-3 text-green-500" />
                                                                Entire Layer
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1">
                                                                <FiAlertCircle className="w-3 h-3 text-orange-500" />
                                                                {layer.neuron_count} neurons
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activation Metadata */}
                            {extracted_activations && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Extracted Activations</h3>

                                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="max-h-48 overflow-y-auto">
                                            {Object.entries(extracted_activations.activation_shapes).map(([layer, shape]) => (
                                                <div key={layer} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0">
                                                    <div>
                                                        <span className="font-mono font-medium">Layer {shape.layer}</span>
                                                        <p className="text-sm text-slate-600">
                                                            Extracted from: "{shape.extracted_from_token}"
                                                        </p>
                                                    </div>
                                                    <div className="text-right text-sm text-slate-600">
                                                        <p>Vector size: {shape.activation_vector_size.toLocaleString()}</p>
                                                        <p>Neurons: {shape.neuron_count.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivationPatchingComparison;