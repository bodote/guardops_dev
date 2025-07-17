"use client"
import React, { useState } from "react";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import MyPrompts from "@/components/PromptHub/MyPrompts";
import PublicPrompts from "@/components/PromptHub/PublicPrompts";
import TopicGPT from "@/components/PromptHub/TopicGPT";
import {
  DivisionIcon,
  DownIcon,
  RightIcon,
  SearchIcon
} from "@/public/Assets/Icons/Allsvg";
import { RiFilter2Fill, RiShareLine, RiDownloadLine, RiBarChartLine } from "react-icons/ri";

const Index = () => {
  const [tab, setTab] = useState("PublicPrompts");
  const [searchPrompt, setSearchPrompt] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 sm:ml-[96px] ml-[72px]">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-Archivo text-sm font-medium text-gray-600">COAI</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-gray-600">Monitoring</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-[#0D859A]">Prompt Hub</span>
            </div>
            <Logout />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-Archivo font-light text-gray-900 mb-2">
                  Prompt Hub
                </h1>
                <p className="text-gray-600 text-base">
                  Discover, share, and manage AI prompts with your team
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Community Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                <button
                  onClick={() => setTab("PublicPrompts")}
                  className={`relative pb-4 px-1 transition-all duration-200 ${tab === "PublicPrompts"
                    ? "text-[#0D859A] font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <RiDownloadLine className="w-4 h-4" />
                    <span>Discover Prompts</span>
                  </div>
                  {tab === "PublicPrompts" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D859A] rounded-t-full"></div>
                  )}
                </button>

                <button
                  onClick={() => setTab("MyPrompts")}
                  className={`relative pb-4 px-1 transition-all duration-200 ${tab === "MyPrompts"
                    ? "text-[#0D859A] font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <RiShareLine className="w-4 h-4" />
                    <span>My Prompts</span>
                  </div>
                  {tab === "MyPrompts" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D859A] rounded-t-full"></div>
                  )}
                </button>

                <button
                  onClick={() => setTab("TopicGPT")}
                  className={`relative pb-4 px-1 transition-all duration-200 ${tab === "TopicGPT"
                    ? "text-[#0D859A] font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <RiBarChartLine className="w-4 h-4" />
                    <span>Analyze Prompts</span>
                    <span className="ml-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                      Beta
                    </span>
                  </div>
                  {tab === "TopicGPT" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D859A] rounded-t-full"></div>
                  )}
                </button>
              </nav>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchPrompt}
                    onChange={(e) => setSearchPrompt(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0D859A] focus:border-transparent transition-all duration-200"
                    placeholder="Search prompts..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="bg-gray-100 rounded px-2 py-1">
                      <DivisionIcon className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200">
                  <RiFilter2Fill className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">All Categories</span>
                  <DownIcon className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {tab === "PublicPrompts" && <PublicPrompts searchPrompt={searchPrompt} />}
            {tab === "MyPrompts" && <MyPrompts searchPrompt={searchPrompt} />}
            {tab === "TopicGPT" && <TopicGPT searchPrompt={searchPrompt} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
