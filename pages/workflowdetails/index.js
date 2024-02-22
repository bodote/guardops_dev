import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon, ImageIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import WorkFlow from "@/components/WorkFlow/WorkFlow";

const WorkflowDetails = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  return (
    <>
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
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                WorkFlow Eval Builder
              </h1>
            </div>
            <Logout />
          </div>
          <div className="border-b-[#CCCCCC] border-b-[1px] p-[8px_22px] flex justify-between items-center">
            <p className="font-Archivo text-[12px] font-normal text-[#000]">
              Name of Workflow
            </p>
            <ImageIcon />
          </div>
          <WorkFlow
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
          />
        </div>
      </div>
    </>
  );
};

export default WorkflowDetails;
