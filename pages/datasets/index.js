import React from "react";
import { LockIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import Sidebar from "@/components/Sidebar/Sidebar";
const Datasets = () => {
  return (
    <>
    <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto  ml-[96px]">
      <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
        <div className="flex items-center gap-[5px]">
          <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
          COAI
          </h1>
          <RightIcon />
          <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
          Dataset
          </h1>
        </div>
        <a href="/">
        <LockIcon />
        </a>
      </div>
      </div></div>
    </>
  );
};

export default Datasets;
