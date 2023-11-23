import React from "react";
import { LockIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
const Datasets = () => {
  return (
    <>
      <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
        <div className="flex items-center gap-[5px]">
          <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
            COAL
          </h1>
          <RightIcon />
          <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
            Traces
          </h1>
        </div>
        <LockIcon />
      </div>
    </>
  );
};

export default Datasets;
