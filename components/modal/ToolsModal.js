import React, { useEffect, useState } from "react";
import {
  CoinIcon,
  ColorPaletteIcon,
  DirectionIcon,
  LayersIcon,
  Search2Icon,
  TimeIcon,
} from "@/public/Assets/Icons/Allsvg";

const ToolsModal = ({ toolsModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [flowData, setFlowData] = useState([]);

  const handleDragStart = (event, tool) => {
    // const nodeDetails = { nodeId: uuidv4(), ...tool };
    // event.dataTransfer.setData(
    //   "application/reactflow",
    //   JSON.stringify(nodeDetails)
    // );
    event.dataTransfer.setData("application/reactflow", JSON.stringify(tool));
  };

  const getFlowData = async () => {
    try {
      const response = await fetch(`/api/manageFlow`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.flow_elements) {
          setFlowData(responseData.flow_elements);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const filteredCategories = {
    trigger: [],
    dataset: [],
    model: [],
    metric: [],
    evaluation: [],
    config: [],
    exporting: [],
  };

  flowData?.forEach((data) => {
    if (data.label?.toLowerCase().includes(searchQuery.toLowerCase())) {
      if (data?.category?.includes("trigger"))
        filteredCategories.trigger.push(data);
      else if (data?.category?.includes("dataset"))
        filteredCategories.dataset.push(data);
      else if (data?.category?.includes("model"))
        filteredCategories.model.push(data);
      else if (data?.category?.includes("metric"))
        filteredCategories.metric.push(data);
      else if (data?.category?.includes("evaluation"))
        filteredCategories.evaluation.push(data);
      else if (data?.category?.includes("config"))
        filteredCategories.config.push(data);
      else if (data?.category?.includes("exporting"))
        filteredCategories.exporting.push(data);
    }
  });

  useEffect(() => {
    getFlowData();
  }, []);

  return (
    <>
      {toolsModal && (
        <div className="absolute top-[60px] right-[10px] border-[#EAEBF0] border-[1px] rounded-md bg-white sm:w-[289px] w-[230px]">
          <div className="p-[9px] tools-border">
            <div className="border-b-[#D6D6D6] border-b-[1px] p-[12px_9px_19px_9px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Tools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-[#EAEBF0] border-[1px] bg-[#FAFAFA] w-full h-[31px] rounded-[6px] text-[15px] pr-[34px] !ring-transparent !shadow-none focus:!border-[#EAEBF0]"
                />
                <Search2Icon className="absolute right-[12px] top-[50%] translate-y-[-50%]" />
              </div>
            </div>
            {Object.entries(filteredCategories).map(([category, dataArr]) => {
              if (dataArr.length > 0) {
                return (
                  <div
                    key={category}
                    className="mt-[14px] border-b-[#D6D6D6] border-b-[1px] pb-[17px]"
                  >
                    <p className="text-[15px] text-black pl-[4px]">
                      {category === "trigger" && "-Trigger"}
                      {category === "dataset" && "-Datasets"}
                      {category === "model" && "-Models"}
                      {category === "metric" && "-Metrics"}
                      {category === "evaluation" && "-Evaluation"}
                      {category === "config" && "-Config"}
                      {category === "exporting" && "-Exporting"}
                    </p>
                    {dataArr.map((data, ind) => (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, data)}
                        key={ind}
                        className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                      >
                        {category === "trigger" && <TimeIcon />}
                        {category === "dataset" && <CoinIcon />}
                        {category === "model" && <LayersIcon />}
                        {category === "metric" && <DirectionIcon />}
                        {category === "evaluation" && <ColorPaletteIcon />}
                        {category === "config" && <DirectionIcon />}
                        {category === "exporting" && <TimeIcon />}
                        <p className="text-[12px] text-black cursor-pointer">
                          {data.label && data.label}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ToolsModal;
