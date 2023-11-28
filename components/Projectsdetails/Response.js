import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useState } from "react";

const Response = () => {
  const [click, setClick] = useState(true);
  return (
    <>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] ">
          <div
            onClick={() => setClick(!click)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] "
          >
            <ArrowDownIcon className="fill-[#334851]" />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              API Response
            </h1>
          </div>
          {click && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]">
              <p>
                {`
    "id": "chatcmpl-abc123",
    "object": "chat.completion",
    "created": 1677858242,
    "model": "gpt-3.5-turbo-1106",
    "usage": {
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20
    },
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "\n\nThis is a test!"
            },
            "finish_reason": "stop",
            "index": 0
        }
    ]
`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Response;
