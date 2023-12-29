import React from "react";
import { RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import Templates from "../Templates/Templates";

const promptTemplateData = [
  {
    name: "React Prompt",
    description:
      "React Prompt Paradigma to use the Language Models as Controller for other tools",
    link: "https://axiv.org/abs/2210.03629",
    content:
      "Answer the Question best as you can!\n You have the following tools.\n\n[search] Search the internet \n[calculator] Use Calculator. \n\n Select the tool and answer the following question.",
  },
  {
    name: "Chain of Thought",
    description:
      "Enables complex reasoning capabilities through intermediate reasoning steps",
    link: "https://axiv.org/abs/2210.qw123123",
    content:
      "Answer the following question not directly. Rather answer it step by step",
  },
];
const PromptTemplates = ({ setIsModalOpen, onPromptOpen }) => {
  return (
    <>
      <>
        <div className="border-b border-b-[#CCCCCC]">
          <button
            className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
            onClick={() => setIsModalOpen(false)}
          >
            <RightcircleIcon />
          </button>
        </div>
        <div className="sm:px-[35px] px-[16px] py-[29px]">
          <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
            Choose Template to fill
          </h1>
          <div>
            {promptTemplateData.map((data,i) => (
              <Templates
              key={i}
                data={data}
                setIsModalOpen={setIsModalOpen}
                onPromptOpen={onPromptOpen}
              />
            ))}
          </div>

          <div className="flex justify-center sm:mt-[53px] mt-[30px]">
            <button
              className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
              //   onClick={handleSaveDataset}
            >
              <FiPlus />
              Add own Template
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default PromptTemplates;
