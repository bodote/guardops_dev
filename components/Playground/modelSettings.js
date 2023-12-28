export default function ModelSettings({ settings, onSettingsChange }) {
  const calculateSliderBackground = (name, value) => {
    const percentage = (name / value) * 100;
    return `linear-gradient(to right, #0D859A 0%, #0D859A ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  };
  return (
    <div className="max-w-[285px] w-full mx-auto bg-white shadow-lg rounded-lg absolute sm:top-[40px] top-[80px] right-0 p-[13px_23px_17px_25px]">
      <div className="flex flex-col space-y-[7px]">
        <div className="slidecontainer-main">
          <div className="flex justify-between items-center mb-[6px]">
            <p className="text-[#5D6574] text-[12px]">Max Tokens</p>
            <span className="text-[#5D6574] text-[12px]">
              {settings.maxTokens}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4000"
            className="slider-main"
            value={settings.maxTokens}
            id="max-tokens"
            onChange={(e) => onSettingsChange("maxTokens", e.target.value)}
            style={{
              background: calculateSliderBackground(settings.maxTokens, 4000),
            }}
          />
        </div>
        <div className="slidecontainer-main">
          <div className="flex justify-between items-center mb-[6px]">
            <p className="text-[#5D6574] text-[12px]">Temperature</p>
            <span className="text-[#5D6574] text-[12px]">
              {settings.temperature}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="slider-main"
            value={settings.temperature}
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
            <span className="text-[#5D6574] text-[12px]">{settings.topP}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="slider-main"
            value={settings.topP}
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
            <span className="text-[#5D6574] text-[12px]">{settings.topK}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="slider-main"
            value={settings.topK}
            id="top-k"
            onChange={(e) => onSettingsChange("topK", e.target.value)}
            style={{
              background: calculateSliderBackground(settings.topK, 1),
            }}
          />
        </div>
        <div className="slidecontainer-main">
          <div className="flex justify-between items-center mb-[6px]">
            <p className="text-[#5D6574] text-[12px]">Frequency Penalty</p>
            <span className="text-[#5D6574] text-[12px]">
              {settings.frequencyPenalty}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="slider-main"
            value={settings.frequencyPenalty}
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
              {settings.presencePenalty}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="slider-main"
            value={settings.presencePenalty}
            id="presence-penalty"
            onChange={(e) =>
              onSettingsChange("presencePenalty", e.target.value)
            }
            style={{
              background: calculateSliderBackground(
                settings.presencePenalty,
                1
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
