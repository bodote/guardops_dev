import React, { useState } from "react";
import { FiPlus, FiEye, FiEyeOff } from "react-icons/fi";

const APIKeyInput = ({ apiKey, setApiKey, saveApiKey, label }) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  const handleSave = () => {
    saveApiKey();
    alert(`${label} API Key saved successfully!`);
  };

  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  return (
    <div className="">
      <label className="text-[#252525] font-medium text-[14px] font-Inter">
        {label}
      </label>
      <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap">
        <div className="sm:w-[360px] w-full relative">
          <input
            type={isKeyVisible ? "text" : "password"}
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="h-10 border border-[#EAEBF0] my-[6px] rounded w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] font-normal text-[15px] font-Inter"
            required=""
          />
          <button 
            type="button" 
            onClick={toggleKeyVisibility} 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {isKeyVisible ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
        >
          <FiPlus /> Save
        </button>
      </div>
      <p className="text-[#68727D] font-normal text-[14px] font-Inter">
        Enter the API-Key for {label}.
      </p>
    </div>
  );
};

export default APIKeyInput;
