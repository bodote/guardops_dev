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
import { FiDatabase, FiFolderPlus, FiCpu } from "react-icons/fi";

const Index = () => {
  const [tab, setTab] = useState("FileManagement");
  const [searchPrompt, setSearchPrompt] = useState("");

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px] bg-slate-50">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow-sm border-b border-slate-200 sm:px-[22px] px-[16px] py-4">
          <div className="flex items-center gap-2">
            <h1 className="font-Archivo text-sm font-medium text-slate-600">
              COAI
            </h1>
            <RightIcon className="w-3 h-3 text-slate-400" />
            <h1 className="font-Archivo text-sm font-semibold text-slate-900">
              Knowledge
            </h1>
          </div>
          <Logout />
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Compact Header */}
          <div className="text-center mb-6">
            <h1 className="font-Archivo text-2xl font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
              <FiDatabase className="w-6 h-6 text-[#D4DB33]" />
              Knowledge Base Management
            </h1>
            <p className="text-slate-600 text-sm">
              Organize files and create intelligent vector databases for AI interactions
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
            <div className="px-6 py-4">
              <div className="flex justify-center items-center">
                <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setTab("FileManagement")}
                    className={`px-6 py-2.5 rounded-lg font-Archivo text-sm font-medium transition-all duration-200 flex items-center gap-2 ${tab === "FileManagement"
                      ? "bg-[#D4DB33] text-black shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                      }`}
                  >
                    <FiFolderPlus className="w-4 h-4" />
                    File Management
                  </button>
                  <button
                    onClick={() => setTab("MemoryManagement")}
                    className={`px-6 py-2.5 rounded-lg font-Archivo text-sm font-medium transition-all duration-200 flex items-center gap-2 ${tab === "MemoryManagement"
                      ? "bg-[#D4DB33] text-black shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                      }`}
                  >
                    <FiCpu className="w-4 h-4" />
                    Memory Management
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {tab === "FileManagement" && <FileManagement />}
            {tab === "MemoryManagement" && <MemoryManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
