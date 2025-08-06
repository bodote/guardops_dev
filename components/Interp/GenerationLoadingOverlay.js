'use client'
import { useState, useEffect } from "react";
import { FiClock, FiCpu, FiZap, FiInfo } from "react-icons/fi";
import { FaMicroscope } from "react-icons/fa";

const GenerationLoadingOverlay = ({ isVisible, prompt, selectedModel }) => {
    const [elapsed, setElapsed] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);

    const loadingTips = [
        "🧠 The model is processing your prompt through billions of parameters...",
        "⚡ Internal activations are being computed across multiple layers...",
        "🔍 We're capturing intermediate states for interpretability analysis...",
        "📊 Token probabilities are being calculated at each layer...",
        "🎯 Attention patterns are being recorded for later analysis...",
        "🔬 This deep analysis provides unprecedented insights into model behavior...",
        "⏳ Complex models need time to reveal their internal reasoning...",
        "💡 Each second of processing unlocks new understanding of AI cognition..."
    ];

    useEffect(() => {
        if (!isVisible) {
            setElapsed(0);
            return;
        }

        const timer = setInterval(() => {
            setElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const tipTimer = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % loadingTips.length);
        }, 4000); // Change tip every 4 seconds

        return () => clearInterval(tipTimer);
    }, [isVisible, loadingTips.length]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressMessage = () => {
        if (elapsed < 30) return "🚀 Initializing model and processing prompt...";
        if (elapsed < 120) return "🔄 Deep analysis in progress...";
        if (elapsed < 300) return "⚙️ Computing detailed interpretability data...";
        if (elapsed < 600) return "🧮 Performing comprehensive layer analysis...";
        return "🔬 Finalizing advanced interpretability insights...";
    };

    const getEstimatedTime = () => {
        if (elapsed < 60) return "Estimated: 1-15 minutes";
        if (elapsed < 300) return "Estimated: 5-15 minutes remaining";
        if (elapsed < 600) return "Estimated: 2-10 minutes remaining";
        return "Almost complete...";
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center relative">
                            <FaMicroscope className="w-6 h-6 text-white" />
                            <div className="absolute -inset-1 border-2 border-blue-300 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <h2 className="font-Archivo text-2xl font-bold text-slate-900">
                                Generating Response
                            </h2>
                            <p className="text-slate-600">
                                Deep analysis with {selectedModel?.model_id.split('/').pop() || 'selected model'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Progress Indicator */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-slate-900">
                                {getProgressMessage()}
                            </span>
                            <div className="flex items-center gap-2 text-slate-600">
                                <FiClock className="w-4 h-4" />
                                <span className="font-mono text-lg font-bold">
                                    {formatTime(elapsed)}
                                </span>
                            </div>
                        </div>

                        {/* Animated progress bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        </div>

                        <p className="text-sm text-slate-600 text-center">
                            {getEstimatedTime()}
                        </p>
                    </div>

                    {/* Current Prompt */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                            <FiZap className="w-4 h-4 text-blue-500" />
                            Processing Prompt:
                        </h4>
                        <p className="text-slate-700 text-sm bg-white p-3 rounded border italic">
                            "{prompt.length > 200 ? prompt.substring(0, 200) + '...' : prompt}"
                        </p>
                    </div>

                    {/* Educational Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <FiInfo className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">
                                    Why does this take time?
                                </h4>
                                <p className="text-sm text-blue-800 transition-all duration-500 ease-in-out">
                                    {loadingTips[currentTip]}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-2">
                            <FiCpu className="w-6 h-6 text-slate-600 mx-auto" />
                            <p className="text-xs text-slate-600">
                                <span className="font-medium text-slate-900 block">Internal Access</span>
                                Capturing layer states
                            </p>
                        </div>
                        <div className="space-y-2">
                            <FaMicroscope className="w-6 h-6 text-slate-600 mx-auto" />
                            <p className="text-xs text-slate-600">
                                <span className="font-medium text-slate-900 block">Deep Analysis</span>
                                Token-level insights
                            </p>
                        </div>
                        <div className="space-y-2">
                            <FiZap className="w-6 h-6 text-slate-600 mx-auto" />
                            <p className="text-xs text-slate-600">
                                <span className="font-medium text-slate-900 block">Rich Output</span>
                                Interpretability data
                            </p>
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
                        💡 This detailed analysis provides insights unavailable in standard chat interfaces
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationLoadingOverlay;