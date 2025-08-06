'use client'
import { FiMessageSquare, FiZap, FiStar } from "react-icons/fi";

const PromptInterface = ({
    prompt,
    onPromptChange,
    onGenerate,
    onClear,
    isLoading,
    selectedModel,
    compact = false
}) => {
    const promptSuggestions = [
        "Explain the concept of recursion in programming",
        "What are the ethical implications of artificial intelligence?",
        "Compare democracy and autocracy as forms of government",
        "Describe how photosynthesis works step by step",
        "Write a creative story about a time traveler"
    ];

    const handleSuggestionClick = (suggestion) => {
        onPromptChange(suggestion);
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 mb-6 ${compact ? 'opacity-90' : ''}`}>
            <div className={compact ? "p-4" : "p-6"}>
                {!compact && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            2
                        </div>
                        <div>
                            <h2 className="font-Archivo text-xl font-semibold text-slate-900">
                                Explore with Prompts
                            </h2>
                            <p className="text-sm text-slate-600 mt-1">
                                Try different prompts to discover interesting model behaviors
                            </p>
                        </div>
                    </div>
                )}

                {compact && (
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            2
                        </div>
                        <h3 className="font-Archivo text-sm font-semibold text-slate-900">
                            Prompting
                        </h3>
                    </div>
                )}

                {/* Prompt Suggestions - only show if not compact and no prompt */}
                {!compact && !prompt && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <FiStar className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium text-slate-700">Try these examples:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {promptSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    disabled={isLoading || !selectedModel}
                                    className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="relative">
                    <textarea
                        className={`w-full p-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none font-Inter text-slate-800 placeholder-slate-400 transition-all duration-200 ${compact ? 'h-24 text-sm' : 'h-40 text-base'}`}
                        placeholder={selectedModel ? "Enter your prompt here to explore model behavior..." : "Please select a model first..."}
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        disabled={isLoading || !selectedModel}
                    />
                    {!compact && (
                        <div className="absolute top-3 right-3">
                            <FiMessageSquare className="w-5 h-5 text-slate-300" />
                        </div>
                    )}
                </div>

                <div className={`flex justify-between items-center ${compact ? 'mt-3' : 'mt-4'}`}>
                    <div className="text-sm text-slate-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                            {prompt.length} characters
                        </span>
                        {!selectedModel && (
                            <span className="text-amber-600 text-sm">⚠️ Select a model first</span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClear}
                            className={`border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-Inter disabled:opacity-50 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
                            disabled={isLoading || !prompt}
                        >
                            Clear
                        </button>
                        <button
                            onClick={onGenerate}
                            disabled={isLoading || !selectedModel || !prompt.trim()}
                            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-Inter shadow-lg flex items-center gap-2 ${compact ? 'px-6 py-1.5 text-xs' : 'px-8 py-3 text-sm'}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className={`animate-spin ${compact ? "w-3 h-3" : "w-4 h-4"}`} fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FiZap className={compact ? "w-3 h-3" : "w-4 h-4"} />
                                    Generate Response
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptInterface;