export default function ModelSettings({ settings, onSettingsChange }) {
  const calculateSliderBackground = (name, value) => {
    const percentage = (name / value) * 100;
    return `linear-gradient(to right, #0D859A 0%, #0D859A ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  };
  return (
    <>
      <div>
        <div className="flex flex-col space-y-[7px]">
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Max Tokens</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.maxOutputTokens ? settings.maxOutputTokens : 0}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4096"
              className="slider-main"
              value={settings.maxOutputTokens ? settings.maxOutputTokens : 0}
              id="max-tokens"
              onChange={(e) => onSettingsChange("maxTokens", e.target.value)}
              style={{
                background: calculateSliderBackground(settings.maxOutputTokens, 4096),
              }}
            />
          </div>
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Temperature</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.temperature ? settings.temperature : 0}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className="slider-main"
              value={settings.temperature ? settings.temperature : 0}
              id="temperature"
              onChange={(e) => onSettingsChange("temperature", e.target.value)}
              style={{
                background: calculateSliderBackground(settings.temperature, 1),
              }}
            />
          </div>
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Top P</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.topP ? settings.topP : 0}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className="slider-main"
              value={settings.topP ? settings.topP : 0}
              id="top-p"
              onChange={(e) => onSettingsChange("topP", e.target.value)}
              style={{
                background: calculateSliderBackground(settings.topP, 1),
              }}
            />
          </div>
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Top K</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.topK ? settings.topK : 0}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              className="slider-main"
              value={settings.topK ? settings.topK : 0}
              id="top-k"
              onChange={(e) => onSettingsChange("topK", e.target.value)}
              style={{
                background: calculateSliderBackground(settings.topK, 50),
              }}
            />
          </div>
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Frequency Penalty</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.frequencyPenalty ? settings.frequencyPenalty : 0}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className="slider-main"
              value={settings.frequencyPenalty ? settings.frequencyPenalty : 0}
              id="frequency-penalty"
              onChange={(e) =>
                onSettingsChange("frequencyPenalty", e.target.value)
              }
              style={{
                background: calculateSliderBackground(
                  settings.frequencyPenalty,
                  1
                ),
              }}
            />
          </div>
          <div className="slidecontainer-main">
            <div className="flex justify-between items-center mb-[6px]">
              <p className="text-[#5D6574] text-[12px]">Presence Penalty</p>
              <span className="text-[#5D6574] text-[12px]">
                {settings.presencePenalty ? settings.presencePenalty : 0}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              className="slider-main"
              value={settings.presencePenalty ? settings.presencePenalty : 0}
              id="presence-penalty"
              onChange={(e) =>
                onSettingsChange("presencePenalty", e.target.value)
              }
              style={{
                background: calculateSliderBackground(
                  settings.presencePenalty,
                  2
                ),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
