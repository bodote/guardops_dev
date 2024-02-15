import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import WorkFlow from "@/components/WorkFlow/WorkFlow";

const WorkflowDetails = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto  sm:ml-[96px] ml-[72px]">
          <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                COAI
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                Monitoring
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                WorkFlow Eval Builder
              </h1>
            </div>
            <Logout />
          </div>
          <p className="font-Archivo text-[12px] font-normal text-[#000]">
            Name of Workflow
          </p>
          <WorkFlow />
        </div>
      </div>
    </>
  );
};

export default WorkflowDetails;
