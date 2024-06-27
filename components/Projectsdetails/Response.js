import React, { useEffect, useState } from "react";
import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Response = ({ traceProject, selected, type }) => {
  const [response, setResponse] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    if (traceProject?.response) {
      setApiResponse(traceProject?.response);
    } else if (traceProject?.response_lm3openai) {
      setApiResponse(traceProject?.response_lm3openai);
    } else if (traceProject?.response_openai) {
      setApiResponse(traceProject?.response_openai);
    } else {
      setApiResponse("");
    }
  }, [traceProject]);
  return (
    <>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] ">
          <div
            onClick={() => setResponse(!response)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] cursor-pointer"
          >
            <ArrowDownIcon
              className={`fill-[#334851] ${
                response ? "rotate-[180deg]" : "rotate-[0]"
              }`}
            />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              API Response
            </h1>
          </div>
          {response && (
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  border-t border-t-[#CCCCCC]"
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
                {type === "chat"
                  ? selected?.response.replace(/\{"tokens":\d+\}/g, "")
                  : apiResponse.replace(/\{"tokens":\d+\}/g, "")}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Response;
