import React from "react";
import { FiPlus } from "react-icons/fi";

const Templates = ({ data, onPromptOpen }) => {
  const handleAddToPromptClick = (content) => {
    onPromptOpen(content);
  };
  return (
    <>
      <div className="flex items-center justify-between mt-[42px] p-[10px_13px_14px_12px] border-b-[#CCCCCC] border-b-[1px] gap-[9px]">
        <div>
          <h3 className="text-[14px] font-bold text-black font-Inter mb-2">
            {data.name}
          </h3>
          <p className="text-[14px] font-light tracking-[.5px] mt-[8px] text-black font-Inter max-w-[334px]">
            {data.description}
          </p>
          <a
            href={data.link}
            className="font-Inter mt-2 block font-medium text-[14px] cursor-pointer"
          >
            {data.link}
          </a>
        </div>
        <button
          onClick={() => handleAddToPromptClick(data.template)}
          className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium w-[161px] text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
        >
          <FiPlus />
          Add to Prompt
        </button>
      </div>
    </>
  );
};

export default Templates;
