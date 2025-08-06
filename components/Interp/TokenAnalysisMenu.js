'use client'
import { FiLayers, FiTarget, FiZap, FiHelpCircle, FiArrowRight, FiXCircle } from "react-icons/fi";
import { FaMicroscope } from "react-icons/fa";

const TokenAnalysisMenu = ({ selectedToken, position, onSelectAnalysis, onClose }) => {
    const analysisOptions = [
        {
            id: 'logit_lens',
            title: 'Logit Lens Analysis',
            description: 'What else could the model have said here?',
            detail: 'See layer-by-layer predictions and alternative tokens the model considered at this position.',
            icon: FiLayers,
            color: 'purple',
            available: true
        },
        {
            id: 'attention_analysis',
            title: 'Attention Pattern Analysis',
            description: 'What was the model paying attention to?',
            detail: 'Visualize which previous tokens influenced the generation of this token across different attention heads.',
            icon: FiTarget,
            color: 'blue',
            available: false
        },
        {
            id: 'ablation_study',
            title: 'Ablation Study',
            description: 'What happens if we turn off specific parts?',
            detail: 'Selectively disable layers or neurons and regenerate to see their causal impact on the output.',
            icon: FiXCircle,
            color: 'red',
            available: true
        },
        {
            id: 'activation_analysis',
            title: 'Activation Analysis',
            description: 'How did the model internally represent this?',
            detail: 'Explore internal activations, neuron firing patterns, and feature representations for this token.',
            icon: FiZap,
            color: 'green',
            available: false
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#D4DB33] rounded-full flex items-center justify-center">
                            <FaMicroscope className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h2 className="font-Archivo text-2xl font-bold text-slate-900">
                                Token Analysis
                            </h2>
                            <p className="text-slate-600">
                                You clicked on: "<span className="font-semibold text-[#D4DB33] bg-[#D4DB33]/10 px-2 py-1 rounded">{selectedToken}</span>" at position {position}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <FiHelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h3 className="font-medium text-blue-900 mb-1">What would you like to explore?</h3>
                                <p className="text-sm text-blue-700">
                                    Choose an analysis type to dive deeper into how the model processed this specific token.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analysis Options */}
                <div className="p-6 space-y-4">
                    {analysisOptions.map((option) => {
                        const IconComponent = option.icon;
                        const isAvailable = option.available;

                        return (
                            <button
                                key={option.id}
                                onClick={() => isAvailable ? onSelectAnalysis(option.id) : null}
                                disabled={!isAvailable}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isAvailable
                                    ? `border-${option.color}-200 hover:border-${option.color}-300 hover:bg-${option.color}-50 cursor-pointer`
                                    : 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAvailable
                                        ? option.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            option.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                option.color === 'red' ? 'bg-red-100 text-red-600' :
                                                    'bg-green-100 text-green-600'
                                        : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className={`font-semibold ${isAvailable ? 'text-slate-900' : 'text-slate-500'}`}>
                                                {option.title}
                                            </h3>
                                            {!isAvailable && (
                                                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm mb-2 ${isAvailable ? 'text-slate-700' : 'text-slate-500'}`}>
                                            {option.description}
                                        </p>
                                        <p className={`text-xs ${isAvailable ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {option.detail}
                                        </p>
                                    </div>

                                    {isAvailable && (
                                        <FiArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 p-4 rounded-b-2xl bg-slate-50">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-600">
                            💡 Tip: Each analysis reveals different aspects of how the model processed this token
                        </p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenAnalysisMenu;