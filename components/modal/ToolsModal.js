import React, { useEffect, useState } from "react";
import {
  CoinIcon,
  ColorPaletteIcon,
  DirectionIcon,
  LayersIcon,
  Search2Icon,
  TimeIcon,
} from "@/public/Assets/Icons/Allsvg";

const flowData = [
  {
    id: "evaluator",
    name: "Evaluator",
    description: "Evaluates models using datasets and metrics.",
    inputs: ["Trigger", "ModelInstance", "Dataset", "Metrics"],
    outputs: ["EvaluationResults"],
    classPath: "evaluation.Evaluator",
    fields: [
      {
        name: "evaluation_framework",
        type: "select",
        options: ["DefaultEvaluationFramework", "MMLUEvaluationFramework"],
        description: "Framework to use for evaluation",
      },
      {
        name: "add_params",
        type: "modal_button",
        descriptions: "Additional Parameters",
        values: [
          {
            name: "param1",
            type: "textinput",
            description: "Parameter 1",
          },
          {
            name: "param2",
            type: "textinput",
            description: "Parameter 2",
          },
        ],
      },
    ],
  },
  {
    id: "openai_model",
    name: "Open AI Model",
    description: "Evaluates models using datasets and metrics.",
    inputs: ["system_prompt", "prompt"],
    outputs: ["ModelInstance"],
    classPath: "evaluation.Evaluator",
    fields: [
      {
        name: "api_key",
        type: "password",
      },
      {
        name: "models",
        type: "select",
        options: ["DefaultEvaluationFramework", "MMLUEvaluationFramework"],
        description: "Framework to use for evaluation",
      },
      {
        name: "add_params",
        type: "modal_button",
        descriptions: "Additional Parameters",
        values: [
          {
            name: "param1",
            type: "textinput",
            description: "Parameter 1",
          },
          {
            name: "param2",
            type: "textinput",
            description: "Parameter 2",
          },
        ],
      },
    ],
  },
  {
    id: "evaluation_dataset",
    name: "Evaluation Dataset",
    description: "Evaluates models using datasets and metrics.",
    inputs: [],
    outputs: ["Dataset"],
    classPath: "evaluation.Evaluator",
    fields: [
      {
        name: "datasets",
        type: "select",
        options: ["DefaultEvaluationFramework", "MMLUEvaluationFramework"],
        description: "Framework to use for evaluation",
      },
      {
        name: "add_params",
        type: "modal_button",
        descriptions: "Additional Parameters",
        values: [
          {
            name: "param1",
            type: "textinput",
            description: "Parameter 1",
          },
          {
            name: "param2",
            type: "textinput",
            description: "Parameter 2",
          },
        ],
      },
    ],
  },
];

const ToolsModal = ({ toolsModal }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragStart = (event, tool) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(tool));
  };

  // const getFlowData = async () => {
  //   try {
  //     const response = await fetch(`/api/manageEvaluation`, {
  //       method: "GET",
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       if (responseData.flow_elements) {
  //         // console.log(responseData.flow_elements);
  //       }
  //     } else {
  //       console.error("API request failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error during API request:", error);
  //   }
  // };

  const filteredCategories = {
    trigger: [],
    dataset: [],
    model: [],
    metric: [],
    evaluator: [],
  };

  flowData?.forEach((data) => {
    if (
      data.name
        ? data.name?.toLowerCase().includes(searchQuery.toLowerCase())
        : data.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      if (data?.id?.includes("trigger")) filteredCategories.trigger.push(data);
      else if (data?.id?.includes("dataset"))
        filteredCategories.dataset.push(data);
      else if (data?.id?.includes("model")) filteredCategories.model.push(data);
      else if (data?.id?.includes("metric"))
        filteredCategories.metric.push(data);
      else if (data?.id?.includes("evaluator"))
        filteredCategories.evaluator.push(data);
    }
  });

  // useEffect(() => {
  //   getFlowData();
  // }, []);

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
                      {category === "evaluator" && "-Evaluation"}
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
                        {category === "evaluator" && <ColorPaletteIcon />}
                        <p className="text-[12px] text-black">
                          {data.name ? data.name : data.description}
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
