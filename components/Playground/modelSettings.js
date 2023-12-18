export default function ModelSettings({ settings, onSettingsChange }) {
    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="max-tokens">Max Tokens</label>
                    <input
                        className="w-full"
                        id="max-tokens"
                        max="4000"
                        min="0"
                        type="range"
                        value={settings.maxTokens}
                        onChange={(e) => onSettingsChange('maxTokens', e.target.value)}
                    />
                    <span className="font-semibold">{settings.maxTokens}</span>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="temperature">Temperature</label>
                    <input
                        className="w-full"
                        id="temperature"
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        value={settings.temperature}
                        onChange={(e) => onSettingsChange('temperature', e.target.value)}
                    />
                    <span className="font-semibold">{settings.temperature}</span>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="top-p">Top P</label>
                    <input
                        className="w-full"
                        id="top-p"
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        value={settings.topP}
                        onChange={(e) => onSettingsChange('topP', e.target.value)}
                    />
                    <span className="font-semibold">{settings.topP}</span>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="top-k">Top K</label>
                    <input
                        className="w-full"
                        id="top-k"
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        value={settings.topK}
                        onChange={(e) => onSettingsChange('topK', e.target.value)}
                    />
                    <span className="font-semibold">{settings.topK}</span>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="frequency-penalty">Frequency Penalty</label>
                    <input
                        className="w-full"
                        id="frequency-penalty"
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        value={settings.frequencyPenalty}
                        onChange={(e) => onSettingsChange('frequencyPenalty', e.target.value)}
                    />
                    <span className="font-semibold">{settings.frequencyPenalty}</span>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-semibold" htmlFor="presence-penalty">Presence Penalty</label>
                    <input
                        className="w-full"
                        id="presence-penalty"
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        value={settings.presencePenalty}
                        onChange={(e) => onSettingsChange('presencePenalty', e.target.value)}
                    />
                    <span className="font-semibold">{settings.presencePenalty}</span>
                </div>
            </div>
        </div>
    );
}
