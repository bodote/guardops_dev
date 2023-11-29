import {
  DocumentIcon,
  LinebigIcon,
  LinesmallIcon,
  LineverticalIcon,
  LineverticalbigIcon,
  RightcircleIcon,
} from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState, useRef } from "react";
import Info from "./Info";
import Response from "./Response";
import SignalsConcepts from "./SignalsConcepts";

const TraceDetails = () => {
  const [tab, setTab] = useState("Info");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="lg:w-[424px] w-full border-r border-r-[#CCCCCC]">
        <div className="border-b border-b-[#CCCCCC]">
          <button
            onClick={() => setIsModalOpen(false)}
            className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
          >
            <RightcircleIcon />
          </button>
        </div>
        <div className="px-[11px]">
          <h1 className="text-[32px] font-Archivo font-normal text-[#000000] ">
            Trace Details
          </h1>
          <div className=" mb-[18px] mt-[24px] relative ">
            <div className="border border-[#CCCCCC] hover:bg-[#fffbeb] rounded-2xl w-fit h-[24px] overflow-clip flex items-center">
              <div className="p-[7px_10px_7px_16px]">
                <DocumentIcon />
              </div>
              <div className="md:p-[6px_19px_7px_15px] p-[8px] border-x">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  chain
                </h1>
              </div>
              <div className="md:p-[6px_74px_7px_12px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  query
                </h1>
              </div>
              <div className="md:p-[7px_20px_8px_8px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2456 T
                </h1>
              </div>
              <div className="md:p-[7px_13px_8px_6px] p-[8px]">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2.55 s
                </h1>
              </div>
            </div>
            <LinebigIcon className="absolute left-[23px]" />
          </div>
          <div className="flex  mb-[18px] ml-[33px] items-center relative">
            <LineverticalIcon className="absolute left-[-10px]" />
            <div className=" border border-[#CCCCCC] rounded-2xl w-fit h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb]">
              <div className="md:p-[7px_10px_7px_16px] p-[8px]">
                <DocumentIcon />
              </div>
              <div className="md:p-[6px_19px_7px_15px] p-[8px] border-x">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  chain
                </h1>
              </div>
              <div className="md:p-[6px_74px_7px_12px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  query
                </h1>
              </div>
              <div className="md:p-[7px_20px_8px_8px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2456 T
                </h1>
              </div>
              <div className="md:p-[7px_13px_8px_6px] p-[8px]">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2.55 s
                </h1>
              </div>
            </div>
            <LineverticalbigIcon className="absolute bottom-[-33px] left-[25px]" />
          </div>
          <div className="flex mb-[18px] ml-[71px] items-center relative">
            <LinesmallIcon className="absolute top-[-18px] left-[-13px]" />
            <div className="border border-[#CCCCCC] rounded-2xl w-fit h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb] ">
              <div className="p-[7px_10px_7px_16px]">
                <DocumentIcon />
              </div>
              <div className="md:p-[6px_19px_7px_15px] p-[8px] border-x">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  chain
                </h1>
              </div>
              <div className="md:p-[6px_74px_7px_12px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  query
                </h1>
              </div>
              <div className="md:p-[7px_20px_8px_8px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2456 T
                </h1>
              </div>
              <div className="md:p-[7px_13px_8px_6px] p-[8px]">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2.55 s
                </h1>
              </div>
            </div>
          </div>
          <div className="flex  mb-[18px] ml-[33px] items-center relative">
            <LineverticalIcon className="absolute left-[-10px]" />
            <div className="border border-[#CCCCCC] rounded-2xl w-fit h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb] ">
              <div className="p-[7px_10px_7px_16px]">
                <DocumentIcon />
              </div>
              <div className="md:p-[6px_19px_7px_15px] p-[8px] border-x">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  chain
                </h1>
              </div>
              <div className="md:p-[6px_74px_7px_12px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  query
                </h1>
              </div>
              <div className="md:p-[7px_20px_8px_8px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2456 T
                </h1>
              </div>
              <div className="md:p-[7px_13px_8px_6px] p-[8px]">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2.55 s
                </h1>
              </div>
            </div>
          </div>

          <div className="flex mb-[18px] ml-[71px] items-center relative">
            <LinesmallIcon className="absolute top-[-18px] left-[-13px]" />
            <LineverticalbigIcon className="absolute left-[-13px]" />
            <div className="border border-[#CCCCCC] rounded-2xl w-fit h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb] ">
              <div className="p-[7px_10px_7px_16px]">
                <DocumentIcon />
              </div>
              <div className="md:p-[6px_19px_7px_15px] p-[8px] border-x">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  chain
                </h1>
              </div>
              <div className="md:p-[6px_74px_7px_12px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  query
                </h1>
              </div>
              <div className="md:p-[7px_20px_8px_8px] p-[8px] border-r">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2456 T
                </h1>
              </div>
              <div className="md:p-[7px_13px_8px_6px] p-[8px]">
                <h1 className="text-[10px] font-Archivo font-normal text-[#000000]">
                  2.55 s
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[557px]  w-full">
        <div className="border-b border-b-[#CCCCCC]">
          <div className="h-[42px] flex items-center justify-end gap-[12px] px-[16px]">
            <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[20px] rounded-md">
              Add to dataset
            </button>
            <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] sm:px-[35px] px-[20px] rounded-md">
              Open in playground
            </button>
          </div>
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
          {tab === "Info" && <Info />}
          {tab === "Response" && <Response />}
          {tab === "SignalsConcepts" && <SignalsConcepts />}
        </div>
      </div>
    </>
  );
};

export default TraceDetails;
