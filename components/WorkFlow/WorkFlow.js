import React, { useCallback, useState } from "react";
import ReactFlow, { addEdge, Background } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { PlusBtnIcon } from "@/public/Assets/Icons/Allsvg";
import ToolsModal from "../modal/ToolsModal";

const nodeTypes = { custom: CustomNode };

const WorkFlow = ({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}) => {
  const [toolsModal, setToolsModal] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const toolDataString = event.dataTransfer.getData("application/reactflow");
    const toolData = JSON.parse(toolDataString);
    const position = {
      x: event.clientX - event.target.getBoundingClientRect().left,
      y: event.clientY - event.target.getBoundingClientRect().top,
    };

    const newNodeId = uuidv4();

    const newNode = {
      id: newNodeId,
      type: "custom",
      position,
      data: toolData,
    };

    setNodes((prev) => [...prev, newNode]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ height: "100vh" }}
      className="relative"
    >
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
      <ToolsModal toolsModal={toolsModal} />
    </div>
  );
};

export default WorkFlow;
