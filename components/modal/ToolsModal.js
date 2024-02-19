import {
  CoinIcon,
  ColorPaletteIcon,
  DirectionIcon,
  LayersIcon,
  Search2Icon,
  TimeIcon,
} from "@/public/Assets/Icons/Allsvg";
import React from "react";

const ToolsModal = ({ toolsModal, flowData }) => {
  return (
    <>
      {toolsModal && (
        <div className="absolute top-[60px] right-[10px] border-[#EAEBF0] border-[1px] rounded-md bg-white sm:w-[289px] w-[230px]">
          <div className="p-[9px]">
            <div className="border-b-[#D6D6D6] border-b-[1px] p-[12px_9px_19px_9px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Tools"
                  className="border-[#EAEBF0] border-[1px] bg-[#FAFAFA] w-full h-[31px] rounded-[6px] text-[15px] pr-[34px] !ring-transparent !shadow-none focus:!border-[#EAEBF0]"
                />
                <Search2Icon className="absolute right-[12px] top-[50%] translate-y-[-50%]" />
              </div>
            </div>
            <div className="mt-[14px] border-b-[#D6D6D6] border-b-[1px] pb-[17px]">
              <p className="text-[15px] text-black pl-[4px]"> -Trigger</p>
              {flowData.map(
                (data, ind) =>
                  data.id.includes("trigger") && (
                    <div
                      key={ind}
                      className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                    >
                      <TimeIcon />
                      <p className="text-[12px] text-black">
                        {" "}
                        {data.description}
                      </p>
                    </div>
                  )
              )}
            </div>
            <div className="mt-[14px] border-b-[#D6D6D6] border-b-[1px] pb-[17px]">
              <p className="text-[15px] text-black pl-[4px]"> -Datasets</p>
              {flowData.map(
                (data, ind) =>
                  data.id.includes("dataset") && (
                    <div
                      key={ind}
                      className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                    >
                      <CoinIcon />
                      <p className="text-[12px] text-black"> {data.name}</p>
                    </div>
                  )
              )}
            </div>
            <div className="mt-[14px] border-b-[#D6D6D6] border-b-[1px] pb-[17px]">
              <p className="text-[15px] text-black pl-[4px]"> -Models</p>
              {flowData.map(
                (data, ind) =>
                  data.id.includes("model") && (
                    <div
                      key={ind}
                      className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                    >
                      <LayersIcon />
                      <p className="text-[12px] text-black"> {data.name}</p>
                    </div>
                  )
              )}
            </div>
            <div className="mt-[14px] border-b-[#D6D6D6] border-b-[1px] pb-[17px]">
              <p className="text-[15px] text-black pl-[4px]"> -Metrics</p>
              {flowData.map(
                (data, ind) =>
                  data.id.includes("metric") && (
                    <div
                      key={ind}
                      className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                    >
                      <DirectionIcon />
                      <p className="text-[12px] text-black"> {data.name}</p>
                    </div>
                  )
              )}
            </div>
            <div className="mt-[14px] pb-[17px]">
              <p className="text-[15px] text-black pl-[4px]"> -Evaluation</p>
              {flowData.map(
                (data, ind) =>
                  data.id.includes("evaluator") && (
                    <div
                      key={ind}
                      className="flex gap-[9px] items-center ml-[32px] mt-[13px]"
                    >
                      <ColorPaletteIcon />
                      <p className="text-[12px] text-black"> {data.name}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToolsModal;
