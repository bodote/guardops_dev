import React, { useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);
  //   useEffect(() => {
  //     console.log("Data: ", data);
  //   }, []);

  return (
    <div className="border border-black w-[196px]">
      <div>
        <h1 className="font-medium text-center">
          {data.name ? data.name : data.description}
        </h1>
        <div className="text-center bg-[#F9F9F9]">Inputs</div>
        {data.inputs &&
          data.inputs.map((input, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Handle
                type="target"
                position={Position.Left}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <p>{input}</p>
            </div>
          ))}

        <div className="text-center bg-[#F9F9F9]">Outputs</div>
        {data.outputs &&
          data.outputs.map((output, index) => (
            <div key={index} style={{ position: "relative" }}>
              <p className="text-right">{output}</p>
              <Handle
                type="source"
                position={Position.Right}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          ))}
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
    </div>
  );
};

export default CustomNode;
