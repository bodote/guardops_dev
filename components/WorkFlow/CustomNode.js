import {
  CoinIcon,
  ColorPaletteIcon,
  DirectionIcon,
  LayersIcon,
  TimeIcon,
} from "@/public/Assets/Icons/Allsvg";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Switch, Transition } from "@headlessui/react";
import { Handle, Position } from "reactflow";
import { MdKeyboardArrowUp } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomNode = ({ data }) => {
  const [projectList, setProjectList] = useState([]);
  const [datasetList, setDatasetList] = useState([]);
  const [models, setModels] = useState([]);
  const [ActiveTool, setActiveTool] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [APIKey, setAPIKey] = useState("");
  const [proname, setProname] = useState({
    name: "Select",
  });

  const getProjectList = async () => {
    try {
      const response = await fetch(`/api/manageProjects`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.projects) {
          setProjectList(responseData.projects);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getDatasetList = async () => {
    try {
      const response = await fetch(`/api/manageDataset`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.datasets) {
          setDatasetList(responseData.datasets);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getModels = async () => {
    const response = await fetch(`/api/manageModels`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.models) {
      setModels(data.models);
    }
  };

  const handleDaySelection = (index) => {
    if (selectedDayIndex === index) {
      setSelectedDayIndex(null);
    } else {
      setSelectedDayIndex(index);
    }
  };

  const handleSetApiKey = (item) => {
    item.provider === "openai" && setAPIKey(localStorage.getItem("openAIKey"));
    item.provider === "fireworks" &&
      setAPIKey(localStorage.getItem("fireworksAIKey"));
    item.provider === "custom" &&
      setAPIKey(localStorage.getItem("customAIKey"));
    item.provider === "togethercompute" &&
      setAPIKey(localStorage.getItem("togetherAIKey"));
  };

  useEffect(() => {
    getProjectList();
    getDatasetList();
    getModels();
  }, []);

  const OptionItem = ({ name, item }) => (
    <Listbox.Option
      key={
        name === "dataset"
          ? item.dataset_id
          : name === "model"
          ? item.model_id
          : item.project_id
      }
      className={({ active }) =>
        classNames(
          active ? "bg-[#f0efef]  rounded-[6px]" : "text-[#000]",
          "relative cursor-default select-none sm:py-2 py-1 sm:pl-[30px] pl-2 pr-2 sm:pr-9"
        )
      }
      value={item}
      onClick={() => {
        item.model_id && handleSetApiKey(item);
      }}
    >
      <div className="flex items-center">
        <span
          className={classNames(
            proname
              ? "text-[#656565] text-[12px] font-Inter font-medium"
              : "font-normal",
            "block truncate"
          )}
        >
          {item.name}
        </span>
      </div>
    </Listbox.Option>
  );

  const formatInputText = (text) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="border border-[#A8A8A8] rounded-[6px] bg-white max-w-[196px] min-w-[196px]">
      <div>
        <div className="flex justify-center items-center gap-[21px] py-[10px]">
          {data.category.includes("metric") && <DirectionIcon />}
          {data.category.includes("evaluation") && <ColorPaletteIcon />}
          {data.category.includes("model") && <LayersIcon />}
          {data.category.includes("dataset") && <CoinIcon />}
          {data.category.includes("trigger") && <TimeIcon />}
          {data.category.includes("config") && <DirectionIcon />}
          {data.category.includes("exporting") && <TimeIcon />}
          <h1 className="text-center text-[10px] font-medium font-Inter max-w-[130px] truncate">
            {data.label && data.label}
          </h1>
        </div>
        <div className="text-center bg-[#F9F9F9] text-[#656565] py-[5px] text-[10px]">
          Inputs
        </div>
        {data.inputs &&
          data.inputs.map((input, index) => {
            return (
              <div
                key={index}
                style={{ position: "relative" }}
                className="mt-[13px]"
              >
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`input-${data.id}-${index}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  className="flow-handle"
                />
                <p className="ml-2 text-[#656565] text-[10px] font-medium">
                  {input.label}
                </p>
              </div>
            );
          })}
        {/* <div className="px-[13px] mt-[13px]">
          {(data.id.includes("metric") || data.id.includes("trigger")) && (
            <p className="text-[10px] font-medium text-[#656565]">
              {data.description}
            </p>
          )}
          {data.fields.map(
            (field, index) =>
              field.type === "boolean" && (
                <div
                  key={index}
                  className="flex items-center gap-[16px] mt-[8px] mx-1"
                >
                  <Switch
                    checked={ActiveTool}
                    onChange={setActiveTool}
                    className={classNames(
                      ActiveTool ? "bg-[#0D859A]" : "bg-gray-200",
                      "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        ActiveTool ? "translate-x-[11px]" : "translate-x-0",
                        "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <p className="text-[10px] font-medium">Run immediately</p>
                </div>
              )
          )}
          {data.fields.map(
            (field, index) =>
              field.type === "selection" && (
                <div
                  key={index}
                  className="mx-1 flex items-center gap-[10px] mt-[22px]"
                >
                  <p className="text-[#656565] text-[8px] font-medium">Day:</p>
                  <div className="border-[#A8A8A8] border-[1px] flex items-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                      <div
                        key={index}
                        className={`border-r-[#A8A8A8] border-r-[1px] w-[16px] h-[16px] flex justify-center items-center text-[#656565] text-[8px] font-medium pt-[3px] ${
                          selectedDayIndex === index ? "bg-[#A8A8A8]" : ""
                        }`}
                        onClick={() => handleDaySelection(index)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
          {data.fields.map(
            (field, index) =>
              field.type === "time_selector" && (
                <div
                  key={index}
                  className="mt-[25px] flex items-center gap-[6px]"
                >
                  <p className="text-[#656565] text-[8px] font-medium">Time:</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="border-[#A8A8A8] border-[1px] rounded-[3px] h-[17px] w-[25px] px-[3px] text-[8px] text-center"
                    />
                    <p className="text-[#656565] mx-[6px]"> : </p>
                    <input
                      type="text"
                      className="border-[#A8A8A8] border-[1px] rounded-[3px] h-[17px] w-[25px] px-[3px] text-[8px] text-center"
                    />
                  </div>
                </div>
              )
          )}
        </div> */}
        <div className="p-[11px_16px]">
          {/* {data.fields.map(
            (field, index) =>
              field.type === "password" && (
                <div key={index} className="mb-[10px]">
                  <label className="text-[#656565] text-[10px] font-medium mb-[5px] block">
                    API Key
                  </label>
                  <input
                    type="text"
                    defaultValue={APIKey}
                    className="text-[#656565] text-[12px] text border border-[#CCCCCC] rounded-[6px] h-[22px] w-full"
                  />
                </div>
              )
          )} */}
          {data.fields?.map(
            (field, index) =>
              field.type === "text" && (
                <div key={index} className="mb-[10px]">
                  <label className="text-[#656565] text-[10px] font-medium mb-[5px] block">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    defaultValue={field.value}
                    type={field.type}
                    className="text-[#656565] text-[12px] text border border-[#CCCCCC] rounded-[6px] h-[22px] w-full nodrag"
                  />
                </div>
              )
          )}
          {/* {data.fields.map(
            (field, index) =>
              field.type === "List[Dict[Any,Any]]" && (
                <Listbox key={index} value={proname} onChange={setProname}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="text-[#656565] text-[10px] font-medium mb-[5px] mt-[10px]">
                        {formatInputText(field.name)}
                      </Listbox.Label>
                      <div className="">
                        <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal pl-[10px] pr-[20px] py-[3px] ">
                          <span className="flex items-center">
                            <span className=" block truncate mr-3">
                              {proname?.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <MdKeyboardArrowUp
                              className={
                                open
                                  ? "h-5 w-5 text-gray-400 rotate-[0]"
                                  : "h-5 w-5 text-gray-400 rotate-[180deg]"
                              }
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute overflow-x-auto z-10 mt-1 max-h-56 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
                            {data.category.includes("dataset")
                              ? datasetList.map((item) => (
                                  <OptionItem
                                    key={item.dataset_id}
                                    item={item}
                                    name="dataset"
                                  />
                                ))
                              : data.category.includes("model")
                              ? models.map((item) => (
                                  <OptionItem
                                    key={item.model_id}
                                    item={item}
                                    name="model"
                                  />
                                ))
                              : projectList.map((item) => (
                                  <OptionItem
                                    key={item.project_id}
                                    item={item}
                                    name="project"
                                  />
                                ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              )
          )} */}
          {/* {data.fields.map(
            (field, index) =>
              field.type === "modal_button" && (
                <button
                  key={index}
                  className="border-[#A8A8A8] border-[1px] rounded-[6px] text-[#464F60] text-[10px] h-[22px] flex justify-center items-center w-full mt-[20px]"
                >
                  {field.descriptions}
                </button>
              )
          )} */}
        </div>
        <div className="text-center bg-[#F9F9F9] rounded-b-md text-[#656565] py-[5px] text-[10px]">
          Outputs
        </div>
        {data.outputs &&
          data.outputs.map((output, index) => (
            <div key={index} style={{ position: "relative" }}>
              <p className="ml-2 text-[#656565] text-[10px] font-medium text-end mr-2 py-[12px] mb-[7px]">
                {output.label}
              </p>
              <Handle
                type="source"
                position={Position.Right}
                id={`output-${data.id}-${index}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                className="flow-handle"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomNode;
