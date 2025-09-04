'use client'
import { FiXCircle, FiLoader } from "react-icons/fi";

const AblationResultsPanel = ({ selectedToken, isRunning, results }) => {
    // Create diff display for results
    const createTokenDiff = (originalTokens, ablatedTokens) => {
        const diff = [];
        const maxLength = Math.max(originalTokens.length, ablatedTokens.length);

        for (let i = 0; i < maxLength; i++) {
            const originalToken = originalTokens[i];
            const ablatedToken = ablatedTokens[i];

            if (originalToken && ablatedToken) {
                if (originalToken === ablatedToken) {
                    diff.push({ type: 'unchanged', token: originalToken, position: i });
                } else {
                    diff.push({ type: 'removed', token: originalToken, position: i });
                    diff.push({ type: 'added', token: ablatedToken, position: i });
                }
            } else if (originalToken && !ablatedToken) {
                diff.push({ type: 'removed', token: originalToken, position: i });
            } else if (!originalToken && ablatedToken) {
                diff.push({ type: 'added', token: ablatedToken, position: i });
            }
        }

        return diff;
    };

    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
                {isRunning && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiLoader className="w-6 h-6 text-red-600 animate-spin" />
                            </div>
                            <p className="text-slate-600">Running ablation study...</p>
                        </div>
                    </div>
                )}

                {!results && !isRunning && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center text-slate-500">
                            <FiXCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <h4 className="font-medium mb-2">Ready to Ablate</h4>
                            <p className="text-sm">Configure and run the ablation to see results here</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {results && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg border border-red-200 overflow-hidden">
                            <div className="p-4 bg-red-50 border-b border-red-200">
                                <h4 className="font-medium text-slate-800">Ablation Results</h4>
                                <p className="text-sm text-slate-600 mt-1">
                                    Comparing original vs ablated responses
                                </p>
                            </div>

                            {/* Configuration Used */}
                            <div className="p-4 bg-slate-50 border-b border-slate-200">
                                <h5 className="font-medium text-slate-800 mb-3">Configuration Used</h5>
                                <div className="space-y-2">


                                    {results.ablation_config?.ablations && (
                                        <div className="text-sm">
                                            <span className="font-medium text-slate-700">Ablated Layers:</span>
                                            <div className="mt-2 space-y-1">
                                                {results.ablation_config.ablations.map((ablation, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border text-xs">
                                                        <span className="font-mono">Layer {ablation.layer}:</span>
                                                        {ablation.entire_layer ? (
                                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Entire Layer</span>
                                                        ) : (
                                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                                                Neurons: {ablation.neurons?.length > 0 ? ablation.neurons.join(', ') : 'None'}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {results.modified_prompt !== results.original_prompt && (
                                        <div className="text-sm">
                                            <span className="font-medium text-slate-700">Modified Prompt:</span>
                                            <div className="mt-1 p-2 bg-white rounded border font-mono text-xs">
                                                {results.modified_prompt}
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

                                {/* Ablated Response */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="font-medium text-slate-700">Ablated Response</span>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 font-mono text-sm">
                                        {results.ablated_result?.generated?.text}
                                    </div>
                                </div>

                                {/* Token Diff */}
                                {results.original_response?.tokens && results.ablated_result?.generated?.tokens && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-slate-700">Token-by-Token Changes</span>
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-48 overflow-y-auto">
                                            {createTokenDiff(
                                                results.original_response.tokens,
                                                results.ablated_result.generated.tokens
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
                            className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                        >
                            Run New Ablation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AblationResultsPanel;