import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useState } from "react";

const Response = ({traceProject}) => {
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
                {`${traceProject?.attributes?.response}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Response;
