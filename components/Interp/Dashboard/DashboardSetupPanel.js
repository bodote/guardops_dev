'use client'

import { FiPlay, FiRotateCcw, FiChevronDown, FiExternalLink, FiArrowDown, FiArrowUp, FiZap, FiActivity, FiCpu } from "react-icons/fi";

import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { getModelDisplayName, getHuggingFaceUrl, getModelArchitectureSummary } from "@/utils/modelUtils";
import SubtleTokenDisplay from "@/components/Interp/SubtleTokenDisplay";

const DashboardSetupPanel = ({
    selectedModel,
    onModelSelect,
    models,
    prompt,
    onPromptChange,
    onGenerate,
    onClear,
    isLoading,
    hasResponse,
    response,
    selectedToken,
    onTokenSelect
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef(null);

    useEffect(() => {
        if (isDropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [isDropdownOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isDropdownOpen]);

    const canGenerate = selectedModel && prompt.trim() && !isLoading;

    // Helper function to get deployment status icon and styling
    const getDeploymentStatus = (model) => {
        if (!model.deployment_level) {
            return {
                icon: FiActivity,
                iconClass: "text-slate-500",
                badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                label: "Unknown"
            };
        }

        switch (model.deployment_level) {
            case 'HOT':
                return {
                    icon: FiZap,
                    iconClass: "text-green-600",
                    badgeClass: "bg-green-100 text-green-800 border-green-200",
                    label: "Hot"
                };
            case 'WARM':
                return {
                    icon: FiActivity,
                    iconClass: "text-orange-600",
                    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
                    label: "Warm"
                };
            case 'COLD':
                return {
                    icon: FiCpu,
                    iconClass: "text-blue-600",
                    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
                    label: "Cold"
                };
            default:
                return {
                    icon: FiActivity,
                    iconClass: "text-slate-500",
                    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                    label: model.deployment_level
                };
        }
    };

    // Helper function to format parameter counts
    const formatParams = (num) => {
        if (!num) return 'N/A';
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="px-6 py-4">
            <div className="flex items-start gap-4">
                {/* Model Selection */}
                <div className="w-72">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Model
                        </label>

                    </div>
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-8 text-left shadow-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            {selectedModel ? (
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const status = getDeploymentStatus(selectedModel);
                                        const StatusIcon = status.icon;
                                        return <StatusIcon className={`w-4 h-4 ${status.iconClass}`} />;
                                    })()}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-slate-900 truncate">
                                            {getModelDisplayName(selectedModel)}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate">
                                            {selectedModel.config ?
                                                `${selectedModel.config.model_type} • ${formatParams(selectedModel.n_params)} params` :
                                                getDeploymentStatus(selectedModel).label
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <span className="block truncate text-slate-500">
                                    Select a model...
                                </span>
                            )}
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </span>
                        </button>

                        {isDropdownOpen && typeof window !== 'undefined' && createPortal(
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <div
                                    className="fixed z-50 max-h-80 overflow-auto rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 border border-slate-200"
                                    style={{
                                        top: dropdownPosition.top,
                                        left: dropdownPosition.left,
                                        width: Math.max(dropdownPosition.width, 400)
                                    }}
                                >
                                    {models.map((model) => {
                                        const status = getDeploymentStatus(model);
                                        const StatusIcon = status.icon;
                                        const hasFullConfig = model.config && model.application_state === 'RUNNING';

                                        return (
                                            <button
                                                key={model.model_id}
                                                onClick={() => {
                                                    onModelSelect(model);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="relative cursor-pointer select-none py-3 px-4 w-full text-left hover:bg-purple-50 hover:border-purple-200 transition-colors border-l-4 border-transparent"
                                            >
                                                <div className="flex items-start gap-3">
                                                    {/* Status Icon */}
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        <StatusIcon className={`w-4 h-4 ${status.iconClass}`} />
                                                    </div>

                                                    {/* Model Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-medium text-slate-900 truncate">
                                                                {getModelDisplayName(model)}
                                                            </span>
                                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${status.badgeClass}`}>
                                                                {status.label}
                                                            </span>
                                                        </div>

                                                        {hasFullConfig ? (
                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Architecture:</span> {model.config.model_type}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Parameters:</span> {formatParams(model.n_params)}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Layers:</span> {model.config.num_hidden_layers}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Hidden Size:</span> {model.config.hidden_size?.toLocaleString()}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Attention Heads:</span> {model.config.num_attention_heads}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium text-slate-700">Vocab Size:</span> {model.config.vocab_size?.toLocaleString()}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-xs text-slate-500">
                                                                {status.label === 'Cold' ?
                                                                    'Model available but not currently loaded' :
                                                                    'Limited configuration available'
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>,
                            document.body
                        )}
                    </div>

                    {/* Model Info Panel */}
                    {selectedModel && (
                        <div className="mt-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg text-xs">
                            <div className="flex items-center gap-2 mb-3">
                                {(() => {
                                    const status = getDeploymentStatus(selectedModel);
                                    const StatusIcon = status.icon;
                                    return <StatusIcon className={`w-4 h-4 ${status.iconClass}`} />;
                                })()}
                                <span className="font-semibold text-slate-800">Model Details</span>
                                {(() => {
                                    const status = getDeploymentStatus(selectedModel);
                                    return (
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${status.badgeClass}`}>
                                            {status.label}
                                        </span>
                                    );
                                })()}
                            </div>

                            {selectedModel.config ? (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <div>
                                        <span className="font-medium text-slate-700">Architecture:</span>
                                        <p className="text-slate-600 font-mono">{selectedModel.config.model_type}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-700">Parameters:</span>
                                        <p className="text-slate-600 font-mono">{formatParams(selectedModel.n_params)}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-700">Layers:</span>
                                        <p className="text-slate-600 font-mono">{selectedModel.config.num_hidden_layers}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-700">Hidden Size:</span>
                                        <p className="text-slate-600 font-mono">{selectedModel.config.hidden_size?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-700">Attention Heads:</span>
                                        <p className="text-slate-600 font-mono">{selectedModel.config.num_attention_heads}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-700">Vocab Size:</span>
                                        <p className="text-slate-600 font-mono">{selectedModel.config.vocab_size?.toLocaleString()}</p>
                                    </div>
                                    {selectedModel.config.torch_dtype && (
                                        <div>
                                            <span className="font-medium text-slate-700">Data Type:</span>
                                            <p className="text-slate-600 font-mono">{selectedModel.config.torch_dtype}</p>
                                        </div>
                                    )}
                                    {selectedModel.config.max_position_embeddings && (
                                        <div>
                                            <span className="font-medium text-slate-700">Max Length:</span>
                                            <p className="text-slate-600 font-mono">{selectedModel.config.max_position_embeddings?.toLocaleString()}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-slate-600 text-center py-2">
                                    <p>Configuration details available when model is running</p>
                                </div>
                            )}

                            <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between">
                                <a
                                    href={getHuggingFaceUrl(selectedModel)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors font-medium"
                                >
                                    View on HuggingFace <FiExternalLink className="w-3 h-3" />
                                </a>
                                {selectedModel.dedicated !== undefined && (
                                    <span className="text-xs text-slate-500">
                                        {selectedModel.dedicated ? 'Dedicated' : 'Shared'} deployment
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Prompt Input or Tokenized Display */}
                <div className="flex-1">
                    {!response ? (
                        <>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Prompt
                            </label>
                            <div className="relative">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => onPromptChange(e.target.value)}
                                    placeholder="Enter your prompt here..."
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm"
                                    rows={2}
                                    disabled={isLoading}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            {/* Context Legend */}
                            {selectedToken && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                                            <span className="text-slate-700">Selected Token</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-purple-200 border border-purple-300 rounded-sm"></div>
                                            <span className="text-slate-700">Context (included in analysis)</span>
                                        </div>
                                        <div className="text-slate-600">
                                            Position {selectedToken.position + 1} • {selectedToken.isPrompt ? 'Prompt' : 'Response'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Prompt Display */}
                            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                        <FiArrowDown className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-slate-800">Prompt</h3>
                                    <span className="text-xs text-slate-500">Click tokens to analyze</span>
                                </div>
                                <SubtleTokenDisplay
                                    text={response.prompt.text}
                                    tokens={response.prompt.tokens}
                                    onTokenClick={(tokenIndex) => onTokenSelect(
                                        response.prompt.tokens[tokenIndex],
                                        tokenIndex,
                                        true
                                    )}
                                    selectedTokenIndex={selectedToken?.isPrompt ? selectedToken.position : null}
                                    globalSelectedPosition={selectedToken?.position}
                                    tokenStartOffset={0}
                                    isPrompt={true}
                                    large={true}
                                />
                            </div>

                            {/* Response Display */}
                            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                        <FiArrowUp className="w-3 h-3 text-green-600" />
                                    </div>
                                    <h3 className="font-medium text-slate-800">Response</h3>
                                    <span className="text-xs text-slate-500">Click tokens to analyze</span>
                                </div>
                                <SubtleTokenDisplay
                                    text={response.generated.text}
                                    tokens={response.generated.tokens}
                                    onTokenClick={(tokenIndex) => onTokenSelect(
                                        response.generated.tokens[tokenIndex],
                                        response.prompt.tokens.length + tokenIndex,
                                        false
                                    )}
                                    selectedTokenIndex={!selectedToken?.isPrompt ? selectedToken?.position - response.prompt.tokens.length : null}
                                    globalSelectedPosition={selectedToken?.position}
                                    tokenStartOffset={response.prompt.tokens.length}
                                    isPrompt={false}
                                    large={true}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-1 w-28">
                    <button
                        onClick={onGenerate}
                        disabled={!canGenerate}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Running
                            </>
                        ) : (
                            <>
                                <FiPlay className="w-4 h-4" />
                                Generate
                            </>
                        )}
                    </button>

                    {hasResponse && (
                        <button
                            onClick={onClear}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                        >
                            <FiRotateCcw className="w-4 h-4" />
                            Clear
                        </button>
                    )}
                </div>
            </div>


        </div>
    );
};

export default DashboardSetupPanel;