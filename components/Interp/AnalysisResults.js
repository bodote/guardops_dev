'use client'
import { useState } from "react";
import { FiEye, FiArrowRight, FiTarget, FiArrowDown, FiArrowUp, FiLoader } from "react-icons/fi";
import SubtleTokenDisplay from './SubtleTokenDisplay';
import LogitLensAnalysis from './LogitLensAnalysis';
import TokenAnalysisMenu from './TokenAnalysisMenu';
import AblationStudy from './AblationStudy';
import AblationComparison from './AblationComparison';

const AnalysisResults = ({ response, selectedModel }) => {
    const [logitLensData, setLogitLensData] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedTokenInfo, setSelectedTokenInfo] = useState(null);
    const [showAnalysisMenu, setShowAnalysisMenu] = useState(false);
    const [showAblationStudy, setShowAblationStudy] = useState(false);
    const [ablationResults, setAblationResults] = useState(null);
    const [isRunningAblation, setIsRunningAblation] = useState(false);

    if (!response) return null;

    const handleTokenClick = (tokenIndex, token, isPrompt = true) => {
        setSelectedTokenInfo({ token, position: tokenIndex, isPrompt });
        setShowAnalysisMenu(true);
    };

    const handleAnalysisSelect = async (analysisType) => {
        setShowAnalysisMenu(false);

        if (analysisType === 'logit_lens') {
            await performLogitLensAnalysis();
        } else if (analysisType === 'ablation_study') {
            setShowAblationStudy(true);
        }
        // Other analysis types will be handled here later
    };

    const performLogitLensAnalysis = async () => {
        if (!selectedTokenInfo) return;

        const { token, position, isPrompt } = selectedTokenInfo;
        setIsAnalyzing(true);

        try {
            // Determine context based on whether it's prompt or response
            const contextTokens = isPrompt ? response.prompt.tokens : response.full_output.tokens;
            const contextTokenIds = isPrompt ? response.prompt.token_ids : response.full_output.token_ids;

            // For response tokens, we need to adjust the position to account for the full context
            const actualPosition = isPrompt ? position : response.prompt.tokens.length + position;

            const logitResponse = await fetch('/api/interpretability/logit_lens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model_id: selectedModel.model_id,
                    context_tokens: response.full_output.tokens.slice(0, actualPosition + 1), // Up to and including clicked token
                    context_token_ids: response.full_output.token_ids.slice(0, actualPosition + 1),
                    position: actualPosition
                })
            });

            if (logitResponse.ok) {
                const data = await logitResponse.json();
                setLogitLensData(data);
            } else {
                console.error('Failed to get logit lens analysis');
            }
        } catch (error) {
            console.error('Error during logit lens analysis:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleRunAblation = async (ablationData) => {
        setIsRunningAblation(true);

        try {
            const ablationResponse = await fetch('/api/interpretability/ablation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ablationData)
            });

            if (ablationResponse.ok) {
                const data = await ablationResponse.json();
                setAblationResults(data);
                setShowAblationStudy(false); // Close the setup modal
            } else {
                console.error('Failed to run ablation study');
            }
        } catch (error) {
            console.error('Error during ablation study:', error);
        } finally {
            setIsRunningAblation(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                </div>
                <div>
                    <h3 className="font-Archivo text-xl font-semibold text-slate-900">
                        Token Analysis & Exploration
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Hover over tokens to explore, then select positions for mechanistic analysis
                    </p>
                </div>
            </div>

            {/* Discovery callout */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-xl">
                <div className="flex items-start gap-3">
                    <FiTarget className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-purple-900 mb-1">
                            Ready for Mechanistic Interpretability
                        </h4>
                        <p className="text-sm text-purple-700">
                            Explore the tokens below by hovering. When you find interesting behavior,
                            click on specific tokens to dive deeper into the model's internal mechanisms.
                        </p>
                    </div>
                </div>
            </div>

            {/* Input Prompt - What You Gave */}
            <div className="mb-10">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <FiArrowDown className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="font-Archivo text-sm font-medium text-blue-800 uppercase tracking-wide">
                                Your Prompt
                            </h4>
                            <span className="text-xs text-blue-600">
                                {response.prompt.tokens.length} tokens
                            </span>
                        </div>
                    </div>

                    {/* PROMINENT PROMPT TEXT WITH HOVER TOKENS */}
                    <div className="bg-white rounded-lg p-6 border border-blue-300 shadow-sm">
                        <div className="mb-4">
                            <SubtleTokenDisplay
                                text={response.prompt.text}
                                tokens={response.prompt.tokens}
                                large={true}
                                quoted={false}
                                onTokenClick={(index, token) => handleTokenClick(index, token, true)}
                            />
                        </div>
                        <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">
                            Original Input • {response.prompt.tokens.length} tokens
                        </div>
                    </div>
                </div>
            </div>

            {/* Model Response - What It Gave You */}
            <div className="mb-10">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <FiArrowUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="font-Archivo text-sm font-medium text-green-800 uppercase tracking-wide">
                                Model Response
                            </h4>
                            <span className="text-xs text-green-600">
                                {response.generated.tokens.length} tokens generated
                            </span>
                        </div>
                    </div>

                    {/* PROMINENT RESPONSE TEXT WITH HOVER TOKENS */}
                    <div className="bg-white rounded-lg p-6 border border-green-300 shadow-sm">
                        <div className="mb-4">
                            <SubtleTokenDisplay
                                text={response.generated.text}
                                tokens={response.generated.tokens}
                                large={true}
                                quoted={false}
                                onTokenClick={(index, token) => handleTokenClick(index, token, false)}
                            />
                        </div>
                        <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">
                            Generated Response • {response.generated.tokens.length} tokens
                        </div>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-Inter text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FiArrowRight className="w-5 h-5 text-[#D4DB33]" />
                    Next: Mechanistic Analysis
                </h4>
                <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#D4DB33] text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            1
                        </div>
                        <p>
                            <strong>Hover over tokens</strong> above to see token boundaries and identify interesting positions
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#D4DB33] text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            2
                        </div>
                        <p>
                            <strong>Click on specific tokens</strong> to select positions for detailed mechanistic analysis
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#D4DB33] text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            3
                        </div>
                        <p>
                            <strong>Analyze attention patterns</strong>, activation values, and internal representations at those positions
                        </p>
                    </div>
                </div>
            </div>

            {/* Token Analysis Menu */}
            {showAnalysisMenu && selectedTokenInfo && (
                <TokenAnalysisMenu
                    selectedToken={selectedTokenInfo.token}
                    position={selectedTokenInfo.position}
                    onSelectAnalysis={handleAnalysisSelect}
                    onClose={() => {
                        setShowAnalysisMenu(false);
                        setSelectedTokenInfo(null);
                    }}
                />
            )}

            {/* Loading State */}
            {isAnalyzing && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200 flex items-center gap-3">
                        <FiLoader className="w-5 h-5 text-purple-500 animate-spin" />
                        <span className="text-slate-700">
                            Analyzing token: "<span className="font-medium text-purple-700">{selectedTokenInfo?.token}</span>"...
                        </span>
                    </div>
                </div>
            )}

            {/* Logit Lens Analysis Modal */}
            {logitLensData && selectedTokenInfo && (
                <LogitLensAnalysis
                    analysisData={logitLensData}
                    selectedToken={selectedTokenInfo.token}
                    position={selectedTokenInfo.position}
                    onClose={() => {
                        setLogitLensData(null);
                        setSelectedTokenInfo(null);
                    }}
                />
            )}

            {/* Ablation Study Setup Modal */}
            {showAblationStudy && selectedTokenInfo && (
                <AblationStudy
                    selectedToken={selectedTokenInfo.token}
                    position={selectedTokenInfo.position}
                    selectedModel={selectedModel}
                    originalPrompt={response.prompt.text}
                    originalResponse={response}
                    onRunAblation={handleRunAblation}
                    onClose={() => {
                        setShowAblationStudy(false);
                        setSelectedTokenInfo(null);
                    }}
                />
            )}

            {/* Ablation Running Loading Overlay */}
            {isRunningAblation && selectedTokenInfo && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 shadow-2xl border border-slate-200 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiLoader className="w-8 h-8 text-red-500 animate-spin" />
                            </div>
                            <h3 className="font-Archivo text-xl font-bold text-slate-900 mb-2">
                                Running Ablation Study
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Disabling selected components and regenerating response...
                            </p>
                            <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                                <p>Target token: "<span className="font-medium text-red-700">{selectedTokenInfo?.token}</span>"</p>
                                <p>Position: {selectedTokenInfo?.position}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ablation Results Comparison Modal */}
            {ablationResults && selectedTokenInfo && (
                <AblationComparison
                    ablationResults={ablationResults}
                    selectedToken={selectedTokenInfo.token}
                    position={selectedTokenInfo.position}
                    onClose={() => {
                        setAblationResults(null);
                        setSelectedTokenInfo(null);
                    }}
                />
            )}
        </div>
    );
};

export default AnalysisResults;