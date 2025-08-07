'use client'
import { useState } from "react";
import { FiLayers, FiXCircle, FiRefreshCw, FiPlay, FiEye, FiTarget, FiPlus } from "react-icons/fi";

// Individual experiment components
import LogitLensExperiment from './Experiments/LogitLensExperiment';
import AblationExperiment from './Experiments/AblationExperiment';
import ActivationPatchingExperiment from './Experiments/ActivationPatchingExperiment';

const DashboardExperimentPanel = ({
    selectedToken,
    selectedModel,
    response,
    activeExperiments,
    experimentResults,
    runningExperiments,
    onToggleExperiment,
    onRunExperiment
}) => {
    const experiments = [
        {
            id: 'logit_lens',
            title: 'Logit Lens',
            description: 'See what other tokens the model considered at each layer',
            icon: FiLayers,
            color: 'purple',
            enabled: true
        },
        {
            id: 'ablation_study',
            title: 'Ablation Study',
            description: 'Disable specific components and see how output changes',
            icon: FiXCircle,
            color: 'red',
            enabled: true
        },
        {
            id: 'activation_patching',
            title: 'Activation Patching',
            description: 'Inject activations from another context',
            icon: FiRefreshCw,
            color: 'orange',
            enabled: true
        }
    ];

    const getExperimentComponent = (experimentId) => {
        const props = {
            selectedToken,
            selectedModel,
            response,
            isRunning: runningExperiments[experimentId],
            results: experimentResults[experimentId],
            onRun: (config) => onRunExperiment(experimentId, config)
        };

        switch (experimentId) {
            case 'logit_lens':
                return <LogitLensExperiment {...props} />;
            case 'ablation_study':
                return <AblationExperiment {...props} />;
            case 'activation_patching':
                return <ActivationPatchingExperiment {...props} />;
            default:
                return null;
        }
    };

    if (!selectedToken) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiTarget className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">No Token Selected</h3>
                    <p className="text-slate-600 text-sm">
                        Click on any token in the response panel to start running experiments and exploring model internals.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-white">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Experiments</h2>

                {/* Experiment Toggles */}
                <div className="space-y-2">
                    {experiments.map(experiment => (
                        <button
                            key={experiment.id}
                            onClick={() => onToggleExperiment(experiment.id)}
                            disabled={!experiment.enabled}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${activeExperiments[experiment.id]
                                ? `border-${experiment.color}-300 bg-${experiment.color}-50`
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                                } ${!experiment.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeExperiments[experiment.id]
                                ? `bg-${experiment.color}-500 text-white`
                                : 'bg-slate-100 text-slate-600'
                                }`}>
                                {activeExperiments[experiment.id] ? (
                                    <FiEye className="w-4 h-4" />
                                ) : (
                                    <FiPlus className="w-4 h-4" />
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-medium text-slate-800">{experiment.title}</div>
                                <div className="text-xs text-slate-600">{experiment.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Experiments */}
            <div className="flex-1 overflow-y-auto">
                {experiments.map(experiment => (
                    activeExperiments[experiment.id] && (
                        <div key={experiment.id} className="border-b border-slate-200 last:border-b-0">
                            {getExperimentComponent(experiment.id)}
                        </div>
                    )
                ))}

                {Object.values(activeExperiments).every(active => !active) && (
                    <div className="h-full flex items-center justify-center p-8">
                        <div className="text-center max-w-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPlus className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Add Experiments</h3>
                            <p className="text-slate-600 text-sm">
                                Click on the experiment buttons above to start analyzing the selected token.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardExperimentPanel;