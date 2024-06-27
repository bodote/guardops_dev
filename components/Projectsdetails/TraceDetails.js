import {
  DocumentIcon,
  LineverticalbigIcon,
  RightcircleIcon,
} from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState } from "react";
import Info from "./Info";
import Response from "./Response";
import SignalsConcepts from "./SignalsConcepts";
import { Tooltip } from "react-tooltip";
import SelectDatasetModal from "../modal/SelectDatasetModal";
import { useRouter, useSearchParams } from "next/navigation";
import TraceElement from "./TraceElement";

const TraceDetails = ({
  traceProject,
  setIsModalOpen,
  minWidth,
  maxWidth,
  setWidth,
  isResized,
}) => {
  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentRootTrace, setCurrentRootTrace] = useState(null);
  const [isDatasetModelOpen, setIsDatasetModelOpen] = useState(false);
  const [tab, setTab] = useState("Info");
  const [type, setType] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const dataToPass = {
    project_name: params.get("name"),
    message: encodeURIComponent(selectedProject?.attributes.prompt),
  };
  const handleChatRowClick = (e, val) => {
    e.preventDefault();
    setType("chat");
    setSelectedProject(val);
  };
  

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((prevWidth) => {
        const newWidth = prevWidth - e.movementX / 20;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          return newWidth;
        } else {
          return prevWidth;
        }
      });
    };

    const handleMouseUp = () => {
      isResized.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minWidth, maxWidth, setWidth]);

  useEffect(() => {
    traceProject.map((trace) => {
      if (trace.parent_id == null) {
        setCurrentRootTrace(trace);
        setSelectedProject(trace);
      }
    });
  }, [traceProject]);

  const buildNestedStructure = (elements) => {
    const elementMap = new Map();
  
    // Initialize the map
    elements.forEach((ele) => {
      elementMap.set(ele.context.span_id, { ...ele, children: [] });
    });
  
    // Populate the children
    elements.forEach((ele) => {
      if (ele.parent_id) {
        const parent = elementMap.get(ele.parent_id);
        if (parent) {
          parent.children.push(elementMap.get(ele.context.span_id));
        }
      }
    });
  
    // Filter out the root elements
    return elements.filter((ele) => !ele.parent_id).map((ele) => elementMap.get(ele.context.span_id));
  };
  
  const nestedTraceProject = buildNestedStructure(traceProject);
  
  
  
  

  



  return (
    <>
      <div className="trace-scroll">
        <div className="w-full overflow-y-auto lg:h-screen scroll-auto">
          <div className="border-b border-b-[#CCCCCC]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-[9px] px-[11px] border-r border-r-[#CCCCCC] "
            >
              <RightcircleIcon />
            </button>
          </div>
          <div className="px-[11px]">
            <h1 className="text-[32px] font-Archivo font-normal text-[#000000] my-[10px_0]">
              Trace Details
            </h1>
            <div className="relative trace-detail cursor-pointer">
            <div className="relative after:content-[''] after:bg-[#d1d1d1] after:min-h-[calc(100%+58px)] after:left-[10px] after:top-[-27px] after:absolute after:w-[1px]">
      {nestedTraceProject.map((element) => (
        <TraceElement key={element.context.span_id} element={element} handleClick={handleChatRowClick} />
      ))}
    </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="border-b border-b-[#CCCCCC]">
          <div className="h-[42px] flex items-center justify-end gap-[12px] px-[16px] border-l border-l-[#CCCCCC]">
            <button
              className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[14px] rounded-md"
              onClick={() => {
                setIsDatasetModelOpen(!isDatasetModelOpen);
              }}
            >
              Add to dataset
            </button>
            <button
              onClick={() =>
                router.push(`/playground?data=${JSON.stringify(dataToPass)}`)
              }
              className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[14px] rounded-md"
            >
              Open in playground
            </button>
          </div>
          {isDatasetModelOpen && (
            <SelectDatasetModal
              setIsDatasetModelOpen={setIsDatasetModelOpen}
              traceProject={traceProject}
            />
          )}
        </div>
        <div className="px-[23px] pt-[8px] pb-[5px] border-b border-b-[#ccc] border-l border-l-[#CCCCCC]">
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
        <div className="w-full overflow-x-auto border-l border-l-[#CCCCCC] h-[calc(100vh-128px)]">
        {tab === "Info" && (
  <Info traceProject={selectedProject?.attributes} />
)}

          {tab === "Response" && (
            <Response
              traceProject={currentRootTrace?.attributes}
              selected={selectedProject?.attributes}
              type={type}
            />
          )}
          {tab === "SignalsConcepts" && <SignalsConcepts   traceProject={currentRootTrace?.attributes}
              selected={selectedProject?.attributes}
              type={type}/>}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default TraceDetails;
