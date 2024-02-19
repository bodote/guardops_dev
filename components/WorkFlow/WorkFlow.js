import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { PlusBtnIcon } from "@/public/Assets/Icons/Allsvg";
import ToolsModal from "../modal/ToolsModal";
const nodeTypes = { custom: CustomNode };

const WorkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [flowData, setFlowData] = useEdgesState();
  const [toolsModal, setToolsModal] = useState(false);

  const getFlowData = async () => {
    try {
      const response = await fetch(`/api/manageEvaluation`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.flow_elements) {
          setFlowData(responseData.flow_elements);
          const updatedNodes = responseData.flow_elements.map((element) => ({
            id: element.id,
            type: "custom",
            position: { x: Math.random() * 1000, y: Math.random() * 500 },
            data: element,
          }));

          const updatedEdges = [];

          updatedNodes.forEach((sourceNode) => {
            sourceNode.data.outputs.forEach((output, outputIndex) => {
              updatedNodes.forEach((targetNode) => {
                targetNode.data.inputs.forEach((input, inputIndex) => {
                  if (input === output) {
                    updatedEdges.push({
                      id: `${sourceNode.id}-${targetNode.id}-${outputIndex}-${inputIndex}`,
                      source: sourceNode.id,
                      sourceHandle: `output-${sourceNode.id}-${outputIndex}`,
                      target: targetNode.id,
                      targetHandle: `input-${targetNode.id}-${inputIndex}`,
                    });
                  }
                });
              });
            });
          });

          setNodes(updatedNodes);
          setEdges(updatedEdges);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    getFlowData();
  }, []);
  return (
    <div style={{ height: "100vh" }} className="relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
      <button
        onClick={() => setToolsModal(!toolsModal)}
        className="absolute right-[23px] top-[10px]"
      >
        <PlusBtnIcon />
      </button>
      <ToolsModal
        toolsModal={toolsModal}
        setToolsModal={setToolsModal}
        flowData={flowData}
      />
    </div>
  );
};

export default WorkFlow;
