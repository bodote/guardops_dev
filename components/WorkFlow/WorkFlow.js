import React, { useCallback, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
const nodeTypes = { custom: CustomNode };

const WorkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getFlowData = async () => {
    try {
      const response = await fetch(`/api/manageFlow`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.flow_elements) {
          const updatedNodes = responseData.flow_elements.map((element) => ({
            id: element.id,
            type: "custom",
            position: { x: Math.random() * 1000, y: Math.random() * 500 },
            data: element,
          }));

          const updatedEdges = [];

          updatedNodes.forEach((sourceNode) => {
            sourceNode.data.outputs.forEach((output) => {
              const targetNode = updatedNodes.find((node) =>
                node.data.inputs.some((input) => input === output)
              );
              if (targetNode) {
                const input = targetNode.data.inputs.find(
                  (input) => input === output
                );
                updatedEdges.push({
                  id: `${sourceNode.id}-${targetNode.id}-${output}`,
                  source: sourceNode.id,
                  //   sourceHandle: output,
                  target: targetNode.id,
                  //   targetHandle: input,
                });
              }
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
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
};

export default WorkFlow;
