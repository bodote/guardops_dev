import {
  ArrowDownIcon,
  ClosecrossIcon,
  DocumentIcon,
  LinebigIcon,
  LinesmallIcon,
  LineverticalIcon,
  LineverticalbigIcon,
  LineverticalsmallIcon,
  RightcircleIcon,
  ThreeDotsIcon,
  UpDownIcon,
} from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Info from "./Info";
import Response from "./Response";
import SignalsConcepts from "./SignalsConcepts";
const data = [
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
];

const Projectstabledata = () => {
  const [tab, setTab] = useState("Info");
  const [open, setopen] = useState(true);
  const [click, setClick] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
  };

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
      <div className="overflow-auto">
        <table className="xl:w-full w-[1240px]">
          <thead>
            <tr className="border-b border-[#334851] border-opacity-[0.1]">
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26]">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded"
                />
              </th>
              <th></th>
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26] ">
                <div className="flex items-center justify-center">
                  #
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  Kind
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>

              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                input
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                Output
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  start Time
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                Latency
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                total tokens
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, i) => (
              <tr
                key={i}
                className="hover:bg-[#fffbeb] align-middle border-b border-[#334851] border-opacity-[0.1]"
                onClick={openModal}
              >
                <td className="py-[14px] px-[10px]  text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded"
                  />
                </td>
                <td>
                  <IoChevronForwardCircleOutline />
                </td>

                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center">
                  {val.id}
                </td>
                <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.kind}
                </td>
                <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.input}
                </td>
                <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.output}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center">
                  {val.starttime}
                  <br />
                  {val.datetime}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-normal font-Inter text-[#464F60] text-center">
                  <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                    {val.latency}
                  </button>
                </td>
                <td className="py-[14px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-center">
                  <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                    {val.totaltokens}
                  </button>
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.status}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter ">
                  <ThreeDotsIcon />
                </td>
              </tr>
            ))}
            {isModalOpen && (
              <div
                ref={modalRef}
                className="modal lg:w-[981px] w-auto flex absolute bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto z-20 sm:flex-row flex-col"
              >
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
                      <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[35px] rounded-md">
                        Add to dataset
                      </button>
                      <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[35px] rounded-md">
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
                      <div className="mt-[18px] flex  gap-[23px] items-center sm:justify-start justify-between">
                        <button
                          onClick={() => setTab("Info")}
                          className={`${
                            tab === "Info"
                              ? "font-bold border-[#0D859A] sm:text-[14px] px-[10px] text-[12px] text-[#0D859A]"
                              : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                          } pb-2  border-b-2`}
                        >
                          Info
                        </button>
                        <button
                          onClick={() => setTab("Response")}
                          className={`${
                            tab === "Response"
                              ? "font-bold border-[#0D859A] sm:text-[14px]  px-[10px]  text-[12px] text-[#0D859A]"
                              : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                          } pb-2  border-b-2`}
                        >
                          Full Response
                        </button>
                        <button
                          onClick={() => setTab("SignalsConcepts")}
                          className={`${
                            tab === "SignalsConcepts"
                              ? "font-bold border-[#0D859A] sm:text-[14px]  px-[10px]  text-[12px] text-[#0D859A]"
                              : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
                          } pb-2  border-b-2`}
                        >
                          Signals/Concepts
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    {tab === "Info" && <Info />}
                    {tab === "Response" && <Response />}
                    {tab === "SignalsConcepts" && <SignalsConcepts />}
                  </div>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projectstabledata;
