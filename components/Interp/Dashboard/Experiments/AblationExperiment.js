'use client'
import AblationConfigPanel from './AblationConfigPanel';
import AblationResultsPanel from './AblationResultsPanel';

const AblationExperiment = ({ selectedToken, selectedModel, response, isRunning, results, onRun }) => {
    return (
        <div className="h-full flex">
            {/* Left Panel: Configuration - Fixed and independently scrollable */}
            <div className="w-1/3 h-full flex-shrink-0">
                <AblationConfigPanel
                    selectedToken={selectedToken}
                    selectedModel={selectedModel}
                    response={response}
                    isRunning={isRunning}
                    onRun={onRun}
                />
            </div>

            {/* Right Panel: Results - Independently scrollable */}
            <div className="w-2/3 h-full flex-shrink-0">
                <AblationResultsPanel
                    selectedToken={selectedToken}
                    isRunning={isRunning}
                    results={results}
                />
            </div>
        </div>
    );
};

export default AblationExperiment;