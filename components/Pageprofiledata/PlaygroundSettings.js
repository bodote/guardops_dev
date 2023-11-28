import React from "react";
import { FiPlus } from "react-icons/fi";

const PlaygroundSettings = () => {
  return (
    <>
      <div>
        <p className="sm:text-[16px] text-[14px] font-normal font-Archivo text-[#000000] mt-[10px] max-w-[820px]">
          Enter the API keys of each Model Provider, which you want to use in
          the the playground of coai monitoring solution. The API keys are not
          stored server side, rather are stored on client side. The api will be
          directly provided to the model provider not to coai. Only the Input
          and Response is stored on coai servers for tracing and versioning.
        </p>

        <div className="sm:w-[465px] w-auto mt-[60px]">
          <div className="">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              OPENAI
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap ">
              <div className="sm:w-[360px] w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
              <button
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for openAI.
            </p>
          </div>
          <div className="my-[31px]">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Huggingface
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap">
              <div className="sm:w-[360px]  w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
                <button
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for Huggingface.
            </p>
          </div>
          <div className="">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Together.ai
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap">
              <div className="sm:w-[360px]  w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
              <button
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for Togehter.ai.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaygroundSettings;
