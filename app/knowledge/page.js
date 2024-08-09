"use client"
import React, { useState } from "react";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import MyPrompts from "@/components/PromptHub/MyPrompts";
import PublicPrompts from "@/components/PromptHub/PublicPrompts";
import FileManagement from "@/components/Knowledge/FileManagement";
import MemoryManagement from "@/components/Knowledge/MemoryManagement";
import {
  DivisionIcon,
  DownIcon,
  RightIcon,
  SearchIcon
} from "@/public/Assets/Icons/Allsvg";
import { RiFilter2Fill } from "react-icons/ri";

const Index = () => {
  const [tab, setTab] = useState("FileManagement");
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
              Knowledge
            </h1>
          </div>
          <Logout />
        </div>
        <div className="sm:px-[55px] px-[16px] mt-[24px]">
          <h1 className="font-Archivo lg:text-[32px] text-[22px] text-black font-thin">
            Knowledge Base Management
          </h1>
          <div className="sm:px-[22px] px-[16px]">
            <div className="mt-[18px] flex gap-[10px] items-center sm:justify-start justify-between flex-wrap">
              <button
                onClick={() => setTab("FileManagement")}
                className={`${
                  tab === "FileManagement"
                    ? "font-bold border-coai-blue sm:text-[14px] text-[12px] text-coai-blue"
                    : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                } pb-3  border-b-2`}
              >
                File Management
              </button>
              <div ></div>
              <button
                onClick={() => setTab("MemoryManagement")}
                className={`${
                  tab === "MemoryManagement"
                    ? "font-bold border-coai-blue sm:text-[14px] text-[12px] text-coai-blue"
                    : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                } pb-3  border-b-2`}
              >
                Memory Management
              </button>
            
            </div>
           
            <div className="w-full overflow-x-auto">
              {tab === "FileManagement" && <FileManagement  />}
              {tab === "MemoryManagement" && <MemoryManagement />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
