import { ClosecrossIcon, RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import React from "react";
import { FiPlus } from "react-icons/fi";

const Intromodel = () => {
  return (
    <>
      <div className="border-b border-b-[#CCCCCC]">
        <button
          onClick={() => setIsModalOpen(false)}
          className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
        >
          <RightcircleIcon />
        </button>
      </div>
      <div className="sm:px-[35px] px-[16px] py-[29px]">
        <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
          Create New Project
        </h1>
        <div className="sm:mt-[53px] mt-[10px]">
          <label
            for="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Name of Project
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="NegotiationGPT"
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Enter name of Project
          </p>
        </div>
        <div className="mt-[36px]">
          <label
            for="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Description of Project
          </label>
          <textarea
            type="text"
            name="message"
            id="message"
            className="h-[122px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="Input Text"
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Give a clear Description of the Project you want to start
          </p>
        </div>
        <div className="sm:mt-[45px] mt-[35px] sm:mb-[61px] mb-[30px]">
          <div className="flex items-center justify-between">
            <label
              for="tag"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Tags
            </label>
            <p className="text-[#68727D] font-semibold text-[14px] font-Inter">
              Clear
            </p>
          </div>
          <div className="h-[48px] gap-[10px] border px-[10px] border-[#EAEBF0] my-[8px] rounded w-full flex items-center font-medium text-[15px] font-Inter">
            <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
              <p className="text-[#0D859A]">Law</p>
              <ClosecrossIcon />
            </div>
            <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
              <p className="text-[#0D859A]">GPT</p>
              <ClosecrossIcon />
            </div>
            <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
              <p className="text-[#0D859A]">Eval</p>
              <ClosecrossIcon />
            </div>
          </div>
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Enter meaningful tags to ensure proper filtering later
          </p>
        </div>
        <div className="flex gap-[16px] sm:flex-row flex-col">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hs-basic-with-description-checked"
                className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent  rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                              disabled:opacity-50  checked:bg-none checked:text-[#0D859A] dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-600 before:inline-block 
                              before:w-6 before:h-6 before:bg-white checked:before:bg-[#fff] before:translate-x-0 checked:before:translate-x-full before:rounded-full"
                checked
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[16px] font-Inter text-[#252525]">
              Activate Retention
            </h1>
            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Tracing Data will only be kept for the given period
            </p>
          </div>
          <div class="slidecontainer">
            <input
              type="range"
              min="1"
              max="100"
              defaultValue="50"
              className="slider"
              id="myRange"
            />
            <p className="text-[#68727D] font-medium text-[14px] pl-[34px] mt-[4px] font-Inter">
              15 page
            </p>
          </div>
        </div>
        <div className="flex justify-center sm:mt-[77px] mt-[50px]">
          <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]">
            <FiPlus />
            Save Project
          </button>
        </div>
      </div>
    </>
  );
};

export default Intromodel;
