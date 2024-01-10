import React, { useState, useEffect } from "react";
import APIKeyInput from "./APIKeyInput"; // Adjust the path as necessary
import CustomAPIEndpoint from "./CustomAPIEndpoint";

const PlaygroundSettings = () => {
  // State for API keys
  const [openAIKey, setOpenAIKey] = useState("");
  const [huggingfaceKey, setHuggingfaceKey] = useState("");
  const [togetherAIKey, setTogetherAIKey] = useState("");
  const [fireworksAIKey, setFireworksAIKey] = useState("");
  const [customAIKey, setCustomAIKey] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");

  // Load keys from Local Storage
  useEffect(() => {
    setOpenAIKey(localStorage.getItem("openAIKey") || "");
    setHuggingfaceKey(localStorage.getItem("huggingfaceKey") || "");
    setTogetherAIKey(localStorage.getItem("togetherAIKey") || "");
    setFireworksAIKey(localStorage.getItem("fireworksAIKey") || "");
    setCustomAIKey(localStorage.getItem("customAIKey") || "");
    setCustomEndpoint(localStorage.getItem("customEndpoint") || "");
  }, []);

  // Save API key to Local Storage
  const saveApiKey = (keyName, keyValue) => {
    localStorage.setItem(keyName, keyValue);
  };

  const saveApiKeyWithEndpoint = (values) => {
    if (typeof values === "object") {
      for (const key in values) {
        localStorage.setItem(key, values[key]);
      }
    }
  };

  return (
    <>
      <div className="mb-[30px]">
        {/* ... */}
        <APIKeyInput
          apiKey={openAIKey}
          setApiKey={setOpenAIKey}
          saveApiKey={() => saveApiKey("openAIKey", openAIKey)}
          label="OPENAI"
        />
        <APIKeyInput
          apiKey={huggingfaceKey}
          setApiKey={setHuggingfaceKey}
          saveApiKey={() => saveApiKey("huggingfaceKey", huggingfaceKey)}
          label="Huggingface"
        />
        <APIKeyInput
          apiKey={togetherAIKey}
          setApiKey={setTogetherAIKey}
          saveApiKey={() => saveApiKey("togetherAIKey", togetherAIKey)}
          label="Together.ai"
        />
        <APIKeyInput
          apiKey={fireworksAIKey}
          setApiKey={setFireworksAIKey}
          saveApiKey={() => saveApiKey("fireworksAIKey", fireworksAIKey)}
          label="Fireworks.ai"
        />
        <CustomAPIEndpoint
          apiKey={customAIKey}
          setApiKey={setCustomAIKey}
          apiEndpint={customEndpoint}
          setApiEndpoint={setCustomEndpoint}
          saveApiKeyWithEndpoint={() =>
            saveApiKeyWithEndpoint({
              customAIKey: customAIKey,
              customEndpoint: customEndpoint,
            })
          }
          label="Custom Provider"
        />
        {/* ... */}
      </div>
    </>
  );
};

export default PlaygroundSettings;
