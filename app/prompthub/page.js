"use client"
import React, { useState } from "react";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import MyPrompts from "@/components/PromptHub/MyPrompts";
import PublicPrompts from "@/components/PromptHub/PublicPrompts";
import {
  DivisionIcon,
  DownIcon,
  RightIcon,
  SearchIcon
} from "@/public/Assets/Icons/Allsvg";
import { RiFilter2Fill } from "react-icons/ri";

const Index = () => {
  const [tab, setTab] = useState("PublicPrompts");
  const [searchPrompt, setSearchPrompt] = useState("");

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px]">
        <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
          <div className="flex items-center gap-[5px]">
            <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
              COAI
            </h1>
            <RightIcon />
            <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
              Monitoring
            </h1>
          </div>
          <Logout />
        </div>
        <div className="sm:px-[55px] px-[16px] mt-[24px]">
          <h1 className="font-Archivo lg:text-[32px] text-[22px] text-black font-thin">
            COAI Prompt Hub
          </h1>
          <div className="sm:px-[22px] px-[16px]">
            <div className="mt-[18px] flex gap-[10px] items-center sm:justify-start justify-between flex-wrap">
              <button
                onClick={() => setTab("PublicPrompts")}
                className={`${
                  tab === "PublicPrompts"
                    ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                    : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                } pb-3  border-b-2`}
              >
                Discover Prompts
              </button>
              <button
                onClick={() => setTab("MyPrompts")}
                className={`${
                  tab === "MyPrompts"
                    ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                    : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                } pb-3  border-b-2`}
              >
                My Prompts
              </button>
            </div>
            <div className="flex sm:w-[370px] w-auto">
              <button
                id="dropdown-button-2"
                data-dropdown-toggle="dropdown-search-city"
                className="gap-[8px] flex-shrink-0 inline-flex items-center py-2.5 px-4  text-[#464F60] border border-gray-300 rounded-s-lg "
                type="button"
              >
                <RiFilter2Fill />
                <h1 className="text-[14px] font-medium font-Inter">All</h1>
                <DownIcon />
              </button>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  id="voice-search"
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  className="focus:ring-0 focus:outline-none focus:!border-gray-300 border border-gray-300 text-gray-900 text-sm rounded-[0_8px_8px_0] block w-full sm:ps-10 ps-7 p-[12px] border-s-gray-50"
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex me-3 bg-[#E9EDF5] w-[16px] h-[16px] rounded justify-center items-center translate-y-[-50%] top-[50%]"
                >
                  <DivisionIcon className="" />
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              {tab === "MyPrompts" && <MyPrompts searchPrompt={searchPrompt} />}
              {tab === "PublicPrompts" && <PublicPrompts searchPrompt={searchPrompt}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
