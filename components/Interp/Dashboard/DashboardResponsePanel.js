'use client'
import { useState } from "react";
import { FiArrowDown, FiArrowUp, FiTarget, FiX } from "react-icons/fi";

const DashboardResponsePanel = ({
    response,
    selectedToken,
    onTokenSelect,
    clearAllExperiments
}) => {
    const [hoveredToken, setHoveredToken] = useState(null);

    if (!response) return null;

    const renderTokens = (tokens, isPrompt = true) => {
        return tokens.map((token, idx) => {
            const isSelected = selectedToken?.position === idx && selectedToken?.isPrompt === isPrompt;
            const isHovered = hoveredToken?.position === idx && hoveredToken?.isPrompt === isPrompt;

            return (
                <span
                    key={idx}
                    onClick={() => onTokenSelect(token, idx, isPrompt)}
                    onMouseEnter={() => setHoveredToken({ position: idx, isPrompt })}
                    onMouseLeave={() => setHoveredToken(null)}
                    className={`inline-block cursor-pointer px-1 py-0.5 rounded transition-all duration-200 ${isSelected
                        ? 'bg-purple-500 text-white shadow-sm transform scale-105'
                        : isHovered
                            ? 'bg-purple-100 text-purple-800'
                            : 'hover:bg-slate-100'
                        }`}
                    title={`Click to analyze token "${token}" at position ${idx}`}
                >
                    {token}
                </span>
            );
        });
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Response Analysis</h2>
                    {selectedToken && (
                        <button
                            onClick={clearAllExperiments}
                            className="flex items-center gap-2 px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            <FiX className="w-4 h-4" />
                            Clear Selection
                        </button>
                    )}
                </div>

                {selectedToken ? (
                    <div className="bg-white border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FiTarget className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Selected Token</span>
                        </div>
                        <div className="text-sm text-slate-700">
                            <p>
                                Token: <span className="font-mono bg-purple-50 px-2 py-1 rounded text-purple-800">"{selectedToken.token}"</span>
                            </p>
                            <p className="mt-1">
                                Position: <span className="font-medium">{selectedToken.position}</span>
                                <span className="text-slate-500 ml-2">
                                    ({selectedToken.isPrompt ? 'Prompt' : 'Response'})
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                            <strong>Click on any token</strong> below to select it for analysis.
                            Once selected, you can run experiments in the panel on the right.
                        </p>
                    </div>
                )}
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Prompt Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            <FiArrowDown className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Prompt</h3>
                            <p className="text-sm text-slate-600">Click any token to analyze</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="text-lg leading-relaxed font-medium text-slate-800 break-words">
                            {renderTokens(response.prompt.tokens, true)}
                        </div>
                    </div>
                </div>

                {/* Response Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                            <FiArrowUp className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Generated Response</h3>
                            <p className="text-sm text-slate-600">Click any token to analyze</p>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="text-lg leading-relaxed font-medium text-slate-800 break-words">
                            {renderTokens(response.generated.tokens, false)}
                        </div>
                    </div>
                </div>

                {/* Token Statistics */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <h4 className="font-medium text-slate-800 mb-4">Token Statistics</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{response.prompt.tokens.length}</div>
                            <div className="text-slate-600">Prompt Tokens</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{response.generated.tokens.length}</div>
                            <div className="text-slate-600">Generated Tokens</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-slate-600">{response.full_output.tokens.length}</div>
                            <div className="text-slate-600">Total Tokens</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardResponsePanel;