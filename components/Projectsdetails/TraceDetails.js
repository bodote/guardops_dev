import {
  DocumentIcon,
  LinebigIcon,
  LinesmallIcon,
  LineverticalIcon,
  LineverticalbigIcon,
  RightcircleIcon,
} from "@/public/Assets/Icons/Allsvg";
import React, {
  useEffect,
  Fragment,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import Info from "./Info";
import Response from "./Response";
import SignalsConcepts from "./SignalsConcepts";
import { Tooltip } from "react-tooltip";
import { IoAdd, IoChevronDownOutline } from "react-icons/io5";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import SelectDatasetModal from "../modal/SelectDatasetModal";

const TraceDetails = ({ traceProject, setIsModalOpen }) => {
  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentRootTrace, setCurrentRootTrace] = useState(null);
  const [isDatasetModelOpen, setIsDatasetModelOpen] = useState(false);
  const [tab, setTab] = useState("Info");

  const handleLatency = (startTime, endTime) => {
    const TempStartTime = new Date(startTime);
    const TempendTime = new Date(endTime);
    const latency = (TempendTime - TempStartTime) / 1000;
    return latency;
  };

  const handleSpanStartTime = (startTime) => {
    const startDate = new Date(startTime);
    const formattedDate = startDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format time
    const formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const FormatedTime = `${formattedDate} ${formattedTime}`;
    return FormatedTime;
  };

  const handleTreeRowClick = (e, val, parent = false) => {
    if (parent) {
      setOpen(!open);
    }
    e.preventDefault();
    setSelectedProject(val);
  };

  useEffect(() => {
    traceProject.map((trace) => {
      if (trace.parent_id == null) {
        setCurrentRootTrace(trace);
        setSelectedProject(trace);
      }
    });
  }, [traceProject]);

  return (
    <>
      <div className="trace-scroll">
        <div className="lg:w-[509px] w-full overflow-y-auto h-screen scroll-auto border-r border-r-[#CCCCCC]">
          <div className="border-b border-b-[#CCCCCC]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-[9px] px-[11px] border-r border-r-[#CCCCCC] "
            >
              <RightcircleIcon />
            </button>
          </div>
          <div className="px-[11px]">
            <h1 className="text-[32px] font-Archivo font-normal text-[#000000] ">
              Trace Details
            </h1>
            <div className="relative trace-detail cursor-pointer">
              <div className="relative after:content-[''] after:bg-[#d1d1d1] after:min-h-[calc(100%+58px)] after:left-[22px] after:top-[-27px] after:absolute after:w-[1px]">
                {traceProject.map((outerEle, innerEleIndx) => {
                  return (
                    outerEle.parent_id == null && (
                      <div
                        onClick={(e) => handleTreeRowClick(e, outerEle, true)}
                        key={innerEleIndx}
                        className="flex mb-[18px] ml-[20px] items-center relative bg-[#fff] z-[9] max-w-[466px]"
                      >
                        {/* <LinesmallIcon className="absolute top-[12px] left-[-13px]" /> */}
                        {/* <LineverticalbigIcon className="absolute left-[-13px]" /> */}
                        <div className="border border-[#CCCCCC] rounded-2xl w-fit h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb]  ">
                          <div className="p-[7px_10px_7px_16px]">
                            <DocumentIcon />
                          </div>
                          <div className="md:p-[4px_0px_4px_6px] p-[8px] border-x">
                            <h1
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={outerEle.kind}
                              className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                            >
                              {outerEle.kind}
                            </h1>
                          </div>
                          <div className="md:p-[4px_0px_4px_6px] pl-[2px] border-r">
                            <h1
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={outerEle.name}
                              className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                            >
                              {outerEle.name}
                            </h1>
                          </div>
                          <div className="md:p-[4px_0px_4px_6px] p-[8px] border-r">
                            <h1
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={handleSpanStartTime(
                                outerEle.start_time
                              )}
                              className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                            >
                              {handleSpanStartTime(outerEle.start_time)}
                            </h1>
                          </div>
                          <div className="md:p-[4px_0px_4px_6px] p-[8px]">
                            <h1
                              data-tooltip-id="my-tooltip"
                              className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                            >
                              {handleLatency(
                                outerEle.start_time,
                                outerEle.end_time
                              )}{" "}
                              s
                            </h1>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
                {traceProject.map((innerEle, innerEleIndx) => {
                  return (
                    innerEle.parent_id !== null && (
                      <div key={innerEleIndx}>
                        {open && (
                          <div
                            key={innerEleIndx}
                            onClick={(e) => handleTreeRowClick(e, innerEle)}
                          >
                            <div className="flex mb-[18px] ml-[58px] items-center relative after:content-[''] after:bg-[#d1d1d1] after:h-[44px] after:left-[-14px] after:top-[-32px] after:absolute after:w-[1px]">
                              {/* <LinesmallIcon className="absolute top-[-18px] left-[-13px]" /> */}
                              <LineverticalbigIcon className="absolute left-[-13px]" />
                              <div className="border border-[#CCCCCC] rounded-2xl h-[24px] flex items-center hover:bg-[#fffbeb]">
                                <div className="p-[7px_10px_7px_16px]">
                                  <DocumentIcon />
                                </div>
                                <div className="md:p-[4px_0px_4px_6px] p-[8px] border-x">
                                  <h1
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={innerEle.kind}
                                    className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px] "
                                  >
                                    {innerEle.kind}
                                  </h1>
                                </div>
                                <div className="md:p-[4px_0px_4px_6px] p-[8px] border-r">
                                  <h1
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={innerEle.name}
                                    className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                                  >
                                    {innerEle.name}
                                  </h1>
                                </div>
                                <div className="md:p-[4px_0px_4px_6px] p-[8px] border-r">
                                  <h1
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={handleSpanStartTime(
                                      innerEle.start_time
                                    )}
                                    className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[90px]"
                                  >
                                    {handleSpanStartTime(innerEle.start_time)}
                                  </h1>
                                </div>
                                <div className="md:p-[4px_0px_4px_6px] p-[8px]">
                                  <h1 className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[60px]">
                                    {handleLatency(
                                      innerEle.start_time,
                                      innerEle.end_time
                                    )}{" "}
                                    s
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[557px]  w-full">
        <div className="border-b border-b-[#CCCCCC]">
          <div className="h-[42px] flex items-center justify-end gap-[12px] px-[16px]">
            <button
              className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[20px] rounded-md"
              onClick={() => {
                setIsDatasetModelOpen(!isDatasetModelOpen);
              }}
            >
              Add to dataset
            </button>
            <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[20px] rounded-md">
              Open in playground
            </button>
          </div>
          {isDatasetModelOpen && (
            <SelectDatasetModal
              isDatasetModelOpen={isDatasetModelOpen}
              setIsDatasetModelOpen={setIsDatasetModelOpen}
            />
          )}
        </div>
        <div className="px-[23px] pt-[8px] pb-[5px] border-b border-b-[#ccc]">
          <div className="gap-[13px] flex">
            <button className="bg-[#D4DB33]  text-[#2F2C53] font-bold text-[14px] font-Exo rounded-full px-[9px]">
              Chain
            </button>
            <button className="  text-[#000000] font-bold text-[14px] font-Exo ">
              query
            </button>
          </div>
          <div className=" ">
            <div className="mt-[18px] flex  gap-[23px] items-center sm:justify-start justify-between ">
              <div className="group">
                <button
                  onClick={() => setTab("Info")}
                  className={`${
                    tab === "Info"
                      ? "font-semibold border-b-[#0D859A] text-[#0D859A] border-b-2"
                      : "group-hover:text-[#000] group-hover:border-b-[#000] font-bold text-[#464F60] border-b-transparent border-b-2"
                  } pb-2 font-Inter sm:text-[14px] text-[12px] px-[10px]`}
                >
                  Info
                </button>
              </div>
              <div className="group">
                <button
                  onClick={() => setTab("Response")}
                  className={`${
                    tab === "Response"
                      ? "font-semibold  border-b-[#0D859A] text-[#0D859A] border-b-2"
                      : " group-hover:text-[#000] group-hover:border-b-[#000] font-bold text-[#464F60] border-b-transparent border-b-2"
                  } pb-2 font-Inter sm:text-[14px] text-[12px] px-[10px] `}
                >
                  Full Response
                </button>
              </div>
              <div className="group">
                <button
                  onClick={() => setTab("SignalsConcepts")}
                  className={`${
                    tab === "SignalsConcepts"
                      ? "font-semibold border-b-[#0D859A] text-[#0D859A] border-b-2"
                      : "group-hover:text-[#000] group-hover:border-b-[#000] font-bold text-[#464F60] border-b-transparent border-b-2"
                  } pb-2 font-Inter sm:text-[14px] text-[12px] px-[10px]`}
                >
                  Signals/Concepts
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          {tab === "Info" && (
            <Info traceProject={selectedProject?.attributes} />
          )}
          {tab === "Response" && (
            <Response traceProject={currentRootTrace?.attributes} />
          )}
          {tab === "SignalsConcepts" && <SignalsConcepts />}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default TraceDetails;
