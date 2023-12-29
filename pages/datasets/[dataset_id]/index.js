import {
  DivisionIcon,
  DownIcon,
  LockIcon,
  RightIcon,
  SearchIcon,
} from "@/public/Assets/Icons/Allsvg";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Projectstabledata from "@/components/Projectsdetails/Projectstabledata";
import { RiFilter2Fill } from "react-icons/ri";
import Sidebar from "@/components/Sidebar/Sidebar";
import DonutChart from "@/components/Projectsdetails/DonutChart";
import BarChart from "@/components/Projectsdetails/BarChart";

const ProjectDetails = () => {
  const [currentProject, setCurrentProject] = useState("");
  // useEffect(()=>{
  //   // const url = new URL( window.location.href);
  //   // const projectId = url.pathname.split('/').pop()
  //   console.log("check value+++++++++++++", projectId);
  //   projectId && setCurrentProject(projectId)
  // },[])

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto  sm:ml-[96px] ml-[72px]">
          <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                COAI
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                Projects
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                Dias Assistant
              </h1>
            </div>
            <LockIcon />
          </div>

          <div className="flex lg:flex-row flex-col my-[14px] sm:pl-[22px] pl-[16px] sm:pr-[35px] pr-[16px] xl:gap-[52px] gap-[20px]">
            <div className="grid sm:grid-cols-2 grid-cols-1 bg-[#f5f5f5] sm:p-[8px_16px_8px_0] p-[0_10px_10px_10px] rounded-xl xl:min-w-[350px] sm:min-w-[230px]">
              <div>
                <h1 className="font-Inter text-[14px] text-center font-normal text-[#000000] ">
                  Critical Traces
                </h1>
                <DonutChart />
              </div>
              <div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                    Pass Trough
                  </h1>
                  <button className=" py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#D4DB33] ">
                    23.456
                  </button>
                </div>
                <div className="grid grid-cols-2 my-[10px]">
                  <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                    Filtered
                  </h1>
                  <button className=" py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#0D859A] ">
                    2
                  </button>
                </div>
                <div className="grid grid-cols-2">
                  <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                    Blocked
                  </h1>
                  <button className=" py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#D4DB33] ">
                    1
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] rounded-xl w-full">
              <h1 className="font-Inter text-[12px]  font-normal text-[#000000] ">
                Traces per month
              </h1>
              <BarChart />
            </div>
            <div className="bg-[#f5f5f5] p-[2px_16px_15px_8px] rounded-xl lg:min-w-[285px]">
              <h1 className="font-Inter text-[14px] font-normal text-[#000000] ">
                Latenztime & Tokens
              </h1>
              <div className="">
                <div className="flex sm:flex-nowrap flex-wrap pl-[8px] gap-[20px] mt-[11px] mb-[15px]">
                  <div className="flex items-center gap-[20px] ">
                    <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                      Inputtokens
                    </h1>
                    <button className=" py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#D4DB33] ">
                      1,234 T
                    </button>
                  </div>
                  <div className="flex items-center gap-[10px] ">
                    <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                      P55
                    </h1>
                    <button className="w-[56px] py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#0D859A] ">
                      2,55
                    </button>
                  </div>
                </div>
                <div className="flex sm:flex-nowrap flex-wrap pl-[8px] gap-[20px]">
                  <div className="flex items-center gap-[10px]">
                    <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                      Outputtokens
                    </h1>
                    <button className=" py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#D4DB33] ">
                      2,345 T
                    </button>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <h1 className=" font-Rubik text-[12px] font-normal text-[#000000] ">
                      P99
                    </h1>
                    <button className="w-[56px] py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#0D859A] ">
                      2,55
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" sm:px-[22px] px-[16px] py-[9px] flex items-center justify-between flex-wrap gap-[20px]">
            <div className="flex sm:w-[370px] w-auto">
              <button
                id="dropdown-button-2"
                data-dropdown-toggle="dropdown-search-city"
                className="gap-[8px] flex-shrink-0 inline-flex items-center py-2.5 px-4  text-[#464F60] border border-gray-300 rounded-s-lg "
                type="button"
              >
                <RiFilter2Fill />
                <h1 className="text-[14px] font-medium font-Inter ">All</h1>
                <DownIcon />
              </button>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="focus:ring-0 focus:outline-none focus:!border-gray-300  border border-gray-300 text-gray-900 text-sm rounded-[0_8px_8px_0]  block w-full sm:ps-10 ps-7 p-[12px]  border-s-gray-50   "
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex me-3 bg-[#E9EDF5] w-[16px] h-[16px] rounded justify-center items-center translate-y-[-50%] top-[50%]"
                >
                  <DivisionIcon className="" />
                </button>
              </div>
            </div>
            <div className="flex gap-[48px] flex-wrap sm:mt-0 mt-[10px]">
              <div className="flex gap-[24px] flex-wrap sm:mt-0 mt-[10px]">
                <div className=" border-b-2 border-[#0D859A] ">
                  <div className="mb-[8px] flex gap-[6px] ">
                    <h1 className="text-[14px] font-bold font-Inter text-[#0D859A]">
                      All
                    </h1>
                    <p className="text-[10px] font-medium font-Inter text-[#0D859A] px-[6px] py-[3px] bg-[#EDEDFC] rounded-full">
                      27
                    </p>
                  </div>
                </div>
                <div className=" hover:border-b-2 border-[#000] group">
                  <div className="mb-[8px] flex gap-[6px] ">
                    <h1 className=" text-[14px] font-bold font-Inter text-[#464F60] group-hover:text-[#000]">
                      Risk
                    </h1>
                    <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                      4
                    </p>
                  </div>
                </div>
                <div className=" hover:border-b-2 border-[#000] group">
                  <div className="mb-[8px] flex gap-[6px]">
                    <h1 className="text-[14px] font-bold font-Inter text-[#464F60] group-hover:text-[#000]">
                      On hold
                    </h1>
                    <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                      4
                    </p>
                  </div>
                </div>
                <div className=" hover:border-b-2 border-[#000] group">
                  <div className="mb-[8px] flex gap-[6px]">
                    <h1 className="text-[14px] font-bold font-Inter text-[#464F60] group-hover:text-[#000]">
                      Potential risk
                    </h1>
                    <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                      7
                    </p>
                  </div>
                </div>
                <div className=" hover:border-b-2 border-[#000] group">
                  <div className="mb-[8px] flex gap-[6px] ">
                    <h1 className="text-[14px] font-bold font-Inter text-[#464F60] group-hover:text-[#000]">
                      On track
                    </h1>
                    <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                      12
                    </p>
                  </div>
                </div>
              </div>
              <div className=" hover:border-b-2 border-[#000] group relative after:content-[''] after:h-[16px] after:w-[1px] after:absolute after:bg-[#D5DBE5] after:top-[3px] after:left-[-24px]">
                <div className="mb-[8px] flex gap-[6px]">
                  <h1 className="text-[14px] font-bold font-Inter text-[#464F60] group-hover:text-[#000]">
                    Archived
                  </h1>
                  <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                    9
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Projectstabledata currentProjectID={currentProject} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
