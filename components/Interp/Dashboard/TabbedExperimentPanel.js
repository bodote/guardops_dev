'use client'
import { useState, useCallback } from "react";
import { FiLayers, FiXCircle, FiRefreshCw, FiTarget, FiPlus, FiX } from "react-icons/fi";

// Individual experiment components
import LogitLensExperiment from './Experiments/LogitLensExperiment';
import AblationExperiment from './Experiments/AblationExperiment';
import ActivationPatchingExperiment from './Experiments/ActivationPatchingExperiment';

const TabbedExperimentPanel = ({
    selectedToken,
    selectedModel,
    response,
    onRunExperiment
}) => {
    const [tabs, setTabs] = useState([]);
    const [activeTabId, setActiveTabId] = useState(null);
    const [showExperimentSelection, setShowExperimentSelection] = useState(false);

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

    const createTab = useCallback((experimentType) => {
        const experiment = experiments.find(exp => exp.id === experimentType);
        if (!experiment || !selectedToken) return;

        const newTab = {
            id: `${experimentType}_${Date.now()}`,
            experimentType,
            title: experiment.title,
            color: experiment.color,
            icon: experiment.icon,
            selectedToken,
            isRunning: false,
            results: null,
            config: {}
        };

        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTab.id);
    }, [selectedToken]);

    const closeTab = useCallback((tabId) => {
        setTabs(prev => prev.filter(tab => tab.id !== tabId));
        if (activeTabId === tabId) {
            setActiveTabId(tabs.length > 1 ? tabs[0].id : null);
        }
    }, [activeTabId, tabs]);

    const updateTab = useCallback((tabId, updates) => {
        setTabs(prev => prev.map(tab =>
            tab.id === tabId ? { ...tab, ...updates } : tab
        ));
    }, []);

    const handleRunExperiment = useCallback(async (tabId, config) => {
        const tab = tabs.find(t => t.id === tabId);
        if (!tab) return;

        updateTab(tabId, { isRunning: true, config });

        try {
            const results = await onRunExperiment(tab.experimentType, config);
            updateTab(tabId, { isRunning: false, results });
        } catch (error) {
            console.error('Experiment failed:', error);
            updateTab(tabId, { isRunning: false });
        }
    }, [tabs, updateTab, onRunExperiment]);

    const getExperimentComponent = (tab) => {
        const props = {
            selectedToken: tab.selectedToken,
            selectedModel,
            response,
            isRunning: tab.isRunning,
            results: tab.results,
            onRun: (config) => handleRunExperiment(tab.id, config)
        };

        switch (tab.experimentType) {
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
            <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">Experiments</h2>
                    <div className="text-sm text-slate-600">
                        Token: <span className="font-mono bg-purple-50 px-2 py-1 rounded text-purple-800">"{selectedToken.token}"</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            {tabs.length > 0 ? (
                <div className="flex-shrink-0 border-b border-slate-200 bg-slate-50">
                    <div className="flex overflow-x-auto">
                        {tabs.map(tab => (
                            <div
                                key={tab.id}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors cursor-pointer min-w-0 ${activeTabId === tab.id
                                    ? tab.color === 'purple'
                                        ? 'border-purple-500 bg-white text-purple-700'
                                        : tab.color === 'red'
                                            ? 'border-red-500 bg-white text-red-700'
                                            : 'border-orange-500 bg-white text-orange-700'
                                    : 'border-transparent bg-slate-50 text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                                    }`}
                                onClick={() => setActiveTabId(tab.id)}
                            >
                                <tab.icon className={`w-4 h-4 flex-shrink-0 ${activeTabId === tab.id
                                    ? tab.color === 'purple'
                                        ? 'text-purple-600'
                                        : tab.color === 'red'
                                            ? 'text-red-600'
                                            : 'text-orange-600'
                                    : 'text-slate-500'
                                    }`} />
                                <span className="text-sm font-medium truncate max-w-32">
                                    {tab.title}
                                </span>
                                {tab.isRunning && (
                                    <div className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${tab.color === 'purple' ? 'bg-purple-500' :
                                        tab.color === 'red' ? 'bg-red-500' :
                                            'bg-orange-500'
                                        }`}></div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTab(tab.id);
                                    }}
                                    className="p-1 hover:bg-slate-200 rounded transition-colors flex-shrink-0"
                                    title="Close tab"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setShowExperimentSelection(!showExperimentSelection)}
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap border-b-2 border-transparent"
                        >
                            <FiPlus className="w-4 h-4" />
                            New Experiment
                        </button>
                    </div>
                </div>
            ) : null}

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                {(tabs.length === 0 || showExperimentSelection) ? (
                    <div className="h-full flex flex-col">
                        {/* Experiment Selection */}
                        <div className="flex-1 flex items-center justify-center p-8">
                            <div className="text-center max-w-2xl">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiPlus className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    {tabs.length === 0 ? 'Start Your Analysis' : 'Create New Experiment'}
                                </h3>
                                <p className="text-slate-600 text-sm mb-6">
                                    Choose an experiment type to analyze the selected token. Each experiment provides different insights into how the model processes information.
                                </p>

                                {/* Experiment Creation Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {experiments.map(experiment => (
                                        <button
                                            key={experiment.id}
                                            onClick={() => {
                                                createTab(experiment.id);
                                                setShowExperimentSelection(false);
                                            }}
                                            disabled={!experiment.enabled}
                                            className={`p-4 rounded-lg border transition-all text-left ${experiment.enabled
                                                ? experiment.color === 'purple'
                                                    ? 'border-purple-300 bg-purple-50 hover:bg-purple-100 cursor-pointer'
                                                    : experiment.color === 'red'
                                                        ? 'border-red-300 bg-red-50 hover:bg-red-100 cursor-pointer'
                                                        : 'border-orange-300 bg-orange-50 hover:bg-orange-100 cursor-pointer'
                                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <experiment.icon className={`w-5 h-5 ${experiment.color === 'purple' ? 'text-purple-600' :
                                                    experiment.color === 'red' ? 'text-red-600' :
                                                        'text-orange-600'
                                                    }`} />
                                                <span className={`font-medium ${experiment.color === 'purple' ? 'text-purple-800' :
                                                    experiment.color === 'red' ? 'text-red-800' :
                                                        'text-orange-800'
                                                    }`}>
                                                    {experiment.title}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                {experiment.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                {tabs.length > 0 && (
                                    <button
                                        onClick={() => setShowExperimentSelection(false)}
                                        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        ← Back to experiments
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full overflow-hidden">
                        {tabs.find(tab => tab.id === activeTabId) && (
                            <div key={activeTabId} className="h-full">
                                {getExperimentComponent(tabs.find(tab => tab.id === activeTabId))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabbedExperimentPanel;