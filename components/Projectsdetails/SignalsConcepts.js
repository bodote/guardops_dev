import React, { useEffect, useState } from "react";
import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { JsonViewer } from "@textea/json-viewer"; 

const SignalsConcepts = ({ selected }) => {
  const [showInput, setShowInput] = useState(true);
  const [showOutput, setShowOutput] = useState(true);


  return (
    <>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] ">
          <div
            onClick={() => setShowInput(!showInput)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] cursor-pointer"
          >
            <ArrowDownIcon
              className={`fill-[#334851] ${
                showInput ? "rotate-[180deg]" : "rotate-[0]"
              }`}
            />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              Prompt Moderation
            </h1>
          </div>
          {showInput && (
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  border-t border-t-[#CCCCCC]"
            >
           
 <JsonViewer className="text-[14px]" value={selected?.prompt_moderation}></JsonViewer>      

           
            </div>
          )}
        </div>
        
      </div>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] ">
          <div
            onClick={() => setShowOutput(!showOutput)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] cursor-pointer"
          >
            <ArrowDownIcon
              className={`fill-[#334851] ${
                showOutput ? "rotate-[180deg]" : "rotate-[0]"
              }`}
            />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              Response Moderation
            </h1>
          </div>
          {showOutput && (
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  border-t border-t-[#CCCCCC]"
            >
             
             <JsonViewer className="text-[14px]" value={selected?.output_moderation}></JsonViewer>      


            </div>
          )}
        </div>
        
      </div>
    </>
  );
};

export default SignalsConcepts;
