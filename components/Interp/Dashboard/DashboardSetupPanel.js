'use client'

import { FiPlay, FiRotateCcw, FiChevronDown, FiExternalLink, FiArrowDown, FiArrowUp } from "react-icons/fi";

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
                            className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-8 text-left shadow-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <span className="block truncate">
                                {selectedModel
                                    ? getModelDisplayName(selectedModel)
                                    : "Select a model..."
                                }
                            </span>
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
                                    className="fixed z-50 max-h-60 overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                                    style={{
                                        top: dropdownPosition.top,
                                        left: dropdownPosition.left,
                                        width: dropdownPosition.width
                                    }}
                                >
                                    {models.map((model) => (
                                        <button
                                            key={model.model_id}
                                            onClick={() => {
                                                onModelSelect(model);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="relative cursor-pointer select-none py-2 px-3 w-full text-left hover:bg-purple-100 hover:text-purple-900 text-slate-900"
                                        >
                                            <div>
                                                <span className="block font-medium truncate">
                                                    {getModelDisplayName(model)}
                                                </span>
                                                <span className="block text-xs text-slate-500 mt-1">
                                                    {getModelArchitectureSummary(model)}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>,
                            document.body
                        )}
                    </div>

                    {/* Model Info Dropdown */}
                    {selectedModel && (
                        <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="font-medium text-slate-700">Architecture:</span>
                                    <p className="text-slate-600">{selectedModel.config.model_type}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-slate-700">Layers:</span>
                                    <p className="text-slate-600">{selectedModel.config.num_hidden_layers}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-slate-700">Hidden Size:</span>
                                    <p className="text-slate-600">{selectedModel.config.hidden_size?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-slate-700">Vocab Size:</span>
                                    <p className="text-slate-600">{selectedModel.config.vocab_size?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-300">
                                <a
                                    href={getHuggingFaceUrl(selectedModel)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
                                >
                                    View on HuggingFace <FiExternalLink className="w-3 h-3" />
                                </a>
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