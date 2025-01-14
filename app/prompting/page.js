"use client"
import React, { useState } from "react";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";

import ManualPrompting from "@/components/Prompting/ManualPrompting";
import AIPrompting from "@/components/Prompting/AIPrompting";
import AIRefinement from "@/components/Prompting/AIRefinement";

import {
  DivisionIcon,
  DownIcon,
  RightIcon,
  SearchIcon
} from "@/public/Assets/Icons/Allsvg";
import { RiFilter2Fill } from "react-icons/ri";
import { FaPencilAlt, FaMagic, FaLightbulb } from "react-icons/fa";


const Index = () => {
  
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'manual', 'generate', 'refine'
  const renderContent = () => {
    switch(currentView) {
      case 'manual':
        return <ManualPrompting onBack={() => setCurrentView('menu')} />;
      case 'generate':
        return <AIPrompting onBack={() => setCurrentView('menu')} />;
      case 'refine':
        return <AIRefinement onBack={() => setCurrentView('menu')} />;
      default:
 return (
   <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-Archivo text-center mb-8 text-gray-800">
              What would you like to do?
            </h2>
             <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              <button
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col items-center gap-3 hover:bg-blue-100 group"
                onClick={() => setCurrentView('manual')}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FaPencilAlt className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-Archivo font-medium text-lg text-center">
                  Manually Create a New Prompt
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Create your own custom prompt from scratch
                </p>
              </button>

              <button
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col items-center gap-3 hover:bg-green-100 group"
                onClick={() => setCurrentView('generate')}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <FaMagic className="text-green-600 text-xl" />
                </div>
                <h3 className="font-Archivo font-medium text-lg text-center">
                  AI-Assisted Prompt Generation
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Let AI help you create the perfect prompt
                </p>
              </button>

              <button
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col items-center gap-3 hover:bg-purple-100 group"
                onClick={() => setCurrentView('refine')}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <FaLightbulb className="text-purple-600 text-xl" />
                </div>
                <h3 className="font-Archivo font-medium text-lg text-center">
                  AI-Assisted Prompt Refinement
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Improve your existing prompts with AI
                </p>
              </button>
            </div>
          </div>
    );
    }
  };
  return (
       <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px]">
        {/* ... existing header with COAI > Prompting ... */}
        
        <div className="sm:px-[55px] px-[16px] mt-[24px]">
          <h1 className="font-Archivo lg:text-[32px] text-[22px] text-black font-thin">
            COAI Prompting Center
          </h1>
          
       {renderContent()}
          
        </div>
      </div>
    </div>
  );
};

export default Index;
