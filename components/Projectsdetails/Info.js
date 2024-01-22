import { ArrowDownIcon } from '@/public/Assets/Icons/Allsvg';
import React, { useState } from 'react';

const Info = ({ traceProject }) => {
  const [trace, setTrace] = useState(true);
  const [click, setClick] = useState(true);
  return (
    <>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div
          onClick={() => setClick(!click)}
          className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] "
        >
          <div className="flex gap-[13px] items-center p-[13px_23px_15px_23px] ">
            <ArrowDownIcon className="fill-[#334851]" />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              Input
            </h1>
          </div>
          {click && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]">
              {traceProject?.prompt
                ? traceProject?.prompt
                : traceProject?.llm_prompts_0_content || 'null'}
            </div>
          )}
        </div>
      </div>
      <div className="lg:m-[39px_45px_10px_49px] m-[0px_16px_0px_16px]">
        <div
          onClick={() => setTrace(!trace)}
          className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] bg-[rgba(13,133,150,0.2)]"
        >
          <div className="flex gap-[13px] items-center p-[13px_23px_15px_23px] ">
            <ArrowDownIcon className="fill-[#334851]" />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              Output
            </h1>
          </div>
          {trace && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  overflow-auto   border-t border-t-[#CCCCCC]">
              {traceProject?.output
                ? traceProject?.output
                : traceProject?.llm_completions_0_content || 'null'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
