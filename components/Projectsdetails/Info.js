import React, { useState } from "react";
import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Info = ({ traceProject }) => {
  const [showInput, setShowInput] = useState(true);
  const [showOutput, setShowOutput] = useState(true);
  const [showModel, setShowModel] = useState(true);
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
              Input
            </h1>
          </div>
          {showInput && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]">
              {traceProject?.prompt
                ? traceProject?.prompt
                : traceProject?.llm_prompts_0_content || "null"}
            </div>
          )}
        </div>
      </div>
      <div className="lg:m-[39px_45px_10px_49px] m-[0px_16px_0px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] bg-[rgba(13,133,150,0.2)]">
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
              Output
            </h1>
          </div>
          {showOutput && (
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]"
            >
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{
                        display: "block",
                        listStyleType: "disc",
                        paddingInlineStart: "40px",
                      }}
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      style={{
                        display: "block",
                        listStyleType: "decimal",
                        paddingInlineStart: "40px",
                      }}
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 className="font-bold text-6xl" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                      {...props}
                    />
                  ),
                }}
                remarkPlugins={[gfm]}
              >
                {traceProject?.output
                  ? traceProject?.output.replace(/\{"tokens":\d+\}/g, "")
                  : traceProject?.llm_completions_0_content || "null"}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="lg:m-[39px_45px_10px_49px] m-[0px_16px_0px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] bg-[rgba(13,133,150,0.2)]">
          <div
            onClick={() => setShowModel(!showModel)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] cursor-pointer"
          >
            <ArrowDownIcon
              className={`fill-[#334851] ${
                showModel ? "rotate-[180deg]" : "rotate-[0]"
              }`}
            />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              Model
            </h1>
          </div>
          {showModel && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]">
              {traceProject?.model
                ? traceProject?.model
                : traceProject?.llm_completions_0_content || "null"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
