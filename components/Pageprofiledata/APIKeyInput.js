import React, { useState } from "react";
import { FiPlus, FiEye, FiEyeOff, FiLock, FiUnlock } from "react-icons/fi";
import { toast } from "react-toastify";

const APIKeyInput = ({ apiKey, setApiKey, saveApiKey, label }) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const hasKey = apiKey && apiKey.trim().length > 0;

  const handleSave = () => {
    saveApiKey();
    toast.success(`${label} Key saved successfully`);
  };

  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  return (
    <div className={`border rounded-xl p-4 transition-all duration-200 ${hasKey
      ? 'border-[#D4DB33] bg-[#D4DB33]/5 shadow-sm'
      : 'border-slate-200 bg-slate-50/50'
      }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${hasKey
          ? 'bg-[#D4DB33] text-black'
          : 'bg-slate-300 text-slate-500'
          }`}>
          {hasKey ? (
            <FiUnlock className="w-3 h-3" />
          ) : (
            <FiLock className="w-3 h-3" />
          )}
        </div>
        <label className={`font-Archivo font-medium text-sm transition-colors ${hasKey
          ? 'text-[#D4DB33]'
          : 'text-slate-600'
          }`}>
          {label}
        </label>
        <div className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${hasKey
          ? 'bg-[#D4DB33]/20 text-[#D4DB33] border border-[#D4DB33]/30'
          : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
          {hasKey ? 'Configured' : 'Not Set'}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-0 relative">
          <input
            type={isKeyVisible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={`h-10 border rounded-lg w-full focus:ring-2 focus:outline-none font-Archivo text-sm pr-10 px-3 transition-all duration-200 ${hasKey
              ? 'border-[#D4DB33] focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] bg-white'
              : 'border-slate-300 focus:ring-slate-200 focus:border-slate-400 bg-white'
              }`}
            placeholder={`Enter ${label} API key...`}
          />
          <button
            type="button"
            onClick={toggleKeyVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isKeyVisible ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white font-Archivo font-medium text-sm py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FiPlus className="w-3 h-3" />
          Save
        </button>
      </div>
      <p className="text-slate-500 font-Archivo text-xs mt-2 leading-relaxed">
        {hasKey
          ? `${label} API key is configured and ready to use.`
          : `Enter your ${label} API key to enable this provider.`
        }
      </p>
    </div>
  );
};

export default APIKeyInput;
