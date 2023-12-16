import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import APIKeyInput from './APIKeyInput'; // Adjust the path as necessary


const PlaygroundSettings = () => {
  // State for API keys
  const [openAIKey, setOpenAIKey] = useState('');
  const [huggingfaceKey, setHuggingfaceKey] = useState('');
  const [togetherAIKey, setTogetherAIKey] = useState('');
  const [fireworksAIKey, setFireworksAIKey] = useState('');

  // Load keys from Local Storage
  useEffect(() => {
    setOpenAIKey(localStorage.getItem('openAIKey') || '');
    setHuggingfaceKey(localStorage.getItem('huggingfaceKey') || '');
    setTogetherAIKey(localStorage.getItem('togetherAIKey') || '');
    setFireworksAIKey(localStorage.getItem('fireworksAIKey') || '');
  }, []);

  // Save API key to Local Storage
  const saveApiKey = (keyName, keyValue) => {
    localStorage.setItem(keyName, keyValue);
  };

  return (
    <>
      <div>
        {/* ... */}
        <APIKeyInput 
          apiKey={openAIKey} 
          setApiKey={setOpenAIKey} 
          saveApiKey={() => saveApiKey('openAIKey', openAIKey)}
          label="OPENAI" 
        />
        <APIKeyInput 
          apiKey={huggingfaceKey} 
          setApiKey={setHuggingfaceKey} 
          saveApiKey={() => saveApiKey('huggingfaceKey', huggingfaceKey)}
          label="Huggingface" 
        />
        <APIKeyInput 
          apiKey={togetherAIKey} 
          setApiKey={setTogetherAIKey} 
          saveApiKey={() => saveApiKey('togetherAIKey', togetherAIKey)}
          label="Together.ai" 
        />
        <APIKeyInput 
          apiKey={fireworksAIKey} 
          setApiKey={setFireworksAIKey} 
          saveApiKey={() => saveApiKey('fireworksAIKey', fireworksAIKey)}
          label="Fireworks.ai" 
        />
        
        {/* ... */}
      </div>
    </>
  );
};

export default PlaygroundSettings;
