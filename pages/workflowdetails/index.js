import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon, SaveIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import WorkFlow from "@/components/WorkFlow/WorkFlow";
import { useSearchParams } from "next/navigation";
import { useEdgesState, useNodesState } from "reactflow";
import { toast } from "react-toastify";

const WorkflowDetails = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [evaluationID, setEvaluationID] = useState("");
  const params = useSearchParams();

  const handleSaveFlow = async () => {
    if (nodes.length > 0) {
      const updatedNodes = nodes.map((node, index) => {
        if (node.data.fields) {
          const updatedFields = node.data.fields.map((field) => {
            if (field.type === "select") {
              let t1 = "datasetDrop";
              const selectedOption = [
                ...document.querySelectorAll(`[proname=${t1}]`),
              ];
              // const idOfSelectedOption = selectedOption.getAttribute('id');

              const datasetId = selectedOption[index]?.getAttribute("id");
              return {
                ...field,
                value: datasetId,
              };
            } else {
              const selectedOption = [
                ...document.querySelectorAll(`#${field.name}`),
              ];
              return {
                ...field,
                value: selectedOption[index].value || "",
              };
            }
          });
          return {
            ...node,
            data: {
              ...node.data,
              fields: updatedFields,
            },
          };
        }
        return node;
      });
      const flowDefinition = {
        nodes: updatedNodes,
        edges: edges,
      };
      const formData = {
        flowDefinition,
        evaluation_id: evaluationID,
      };
      const response = await fetch("/api/manageFlow", {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Flow Saved successfully !!");
      } else {
        toast.error(responseData.detail);
        console.error("API request failed:", response.statusText);
      }
    } else {
      toast.error("Please drag the nodes from the modal");
    }
  };
  useEffect(() => {
    const ID = params.get("evaluationID");
    if (ID) {
      setEvaluationID(ID);
    }
  }, [params.get("evaluationID")]);

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
            <button onClick={handleSaveFlow}>
              <SaveIcon />
            </button>
          </div>
          <WorkFlow
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            evaluationID={evaluationID}
          />
        </div>
      </div>
    </>
  );
};

export default WorkflowDetails;
