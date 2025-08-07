'use client'
import { useState, useCallback } from "react";
import { FiPlay, FiRotateCcw, FiSettings, FiEye, FiLayers, FiRefreshCw, FiXCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaMicroscope } from "react-icons/fa";
import { useInterpretability } from "@/hooks/useInterpretability";

// Dashboard Components
import DashboardSetupPanel from './Dashboard/DashboardSetupPanel';
import TabbedExperimentPanel from './Dashboard/TabbedExperimentPanel';

const InterpretabilityDashboard = () => {
    const {
        selectedModel,
        setSelectedModel,
        models,
        prompt,
        setPromptValue,
        response,
        isLoading,
        handleGenerate,
        handleClear
    } = useInterpretability();

    // Dashboard state
    const [selectedToken, setSelectedToken] = useState(null);

    // Token selection handler with toggle support
    const handleTokenSelect = useCallback((token, position, isPrompt) => {
        setSelectedToken(prev => {
            // If clicking the same token, unselect it
            if (prev && prev.token === token && prev.position === position && prev.isPrompt === isPrompt) {
                return null;
            }
            // Otherwise, select the new token
            return { token, position, isPrompt };
        });
    }, []);

    // Experiment management
    const runExperiment = useCallback(async (experimentType, config = {}) => {
        if (!selectedToken) return null;

        try {
            let endpoint = '';
            let requestData = {
                model_id: selectedModel?.model_id,
                position: selectedToken.position,
                ...config
            };

            switch (experimentType) {
                case 'logit_lens':
                    endpoint = '/api/interpretability/logit_lens';
                    if (selectedToken.isPrompt) {
                        requestData.context_tokens = response.prompt.tokens.slice(0, selectedToken.position + 1);
                        requestData.context_token_ids = response.prompt.token_ids.slice(0, selectedToken.position + 1);
                    } else {
                        requestData.context_tokens = response.full_output.tokens.slice(0, selectedToken.position + 1);
                        requestData.context_token_ids = response.full_output.token_ids.slice(0, selectedToken.position + 1);
                    }
                    break;
                case 'ablation_study':
                    endpoint = '/api/interpretability/ablation';
                    requestData.original_prompt = response.prompt.text;
                    break;
                case 'activation_patching':
                    endpoint = '/api/interpretability/activation_patching';
                    requestData.original_prompt = response.prompt.text;
                    break;
                default:
                    throw new Error(`Unknown experiment type: ${experimentType}`);
            }

            const response_data = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (response_data.ok) {
                const data = await response_data.json();
                return data;
            } else {
                console.error(`Failed to run ${experimentType}`);
                throw new Error(`API request failed with status ${response_data.status}`);
            }
        } catch (error) {
            console.error(`Error running ${experimentType}:`, error);
            throw error;
        }
    }, [selectedToken, selectedModel, response]);

    // Clear all experiments
    const clearAllExperiments = useCallback(() => {
        setSelectedToken(null);
    }, []);

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Setup Panel with Response - Top Half */}
            <div className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm max-h-[50vh] overflow-y-auto">
                <DashboardSetupPanel
                    selectedModel={selectedModel}
                    onModelSelect={setSelectedModel}
                    models={models}
                    prompt={prompt}
                    onPromptChange={setPromptValue}
                    onGenerate={handleGenerate}
                    onClear={handleClear}
                    isLoading={isLoading}
                    hasResponse={!!response}
                    response={response}
                    selectedToken={selectedToken}
                    onTokenSelect={handleTokenSelect}
                />
            </div>

            {/* Experiments Panel - Bottom Half */}
            <div className="flex-1 overflow-hidden">
                {!response ? (
                    /* Getting Started State */
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center max-w-md mx-auto p-8">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaMicroscope className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">Ready to Explore</h2>
                            <p className="text-slate-600 mb-4 text-sm">
                                Select a model and enter a prompt above to start analyzing how language models work internally.
                            </p>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs text-purple-700">
                                <strong>Next steps:</strong> Once you generate a response, you'll be able to click on any token to run experiments.
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Full-Width Experiments Panel */
                    <div className="h-full">
                        <TabbedExperimentPanel
                            selectedToken={selectedToken}
                            selectedModel={selectedModel}
                            response={response}
                            onRunExperiment={runExperiment}
                        />
                    </div>
                )}
            </div>

            {/* Loading Overlay for Generation */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 shadow-2xl border border-slate-200 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2">
                                Generating Response
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Processing your prompt and generating tokens...
                            </p>
                            <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                                <p>Model: <span className="font-medium text-purple-700">{selectedModel?.model_id}</span></p>
                                <p className="mt-1 text-xs text-slate-500">This may take a few moments</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterpretabilityDashboard;