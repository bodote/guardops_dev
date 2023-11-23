import {
  DivisionIcon,
  DownIcon,
  LockIcon,
  RightIcon,
  SearchIcon,
  ThreeDotsIcon,
  UpDownIcon,
} from "@/public/Assets/Icons/Allsvg";
import React from "react";
import Projectstabledata from "../../components/Projectsdetails/Projectstabledata";
import { RiFilter2Fill } from "react-icons/ri";
import ProjectsChart from "@/components/Projectsdetails/ProjectsChart";
import Sidebar from "@/components/Sidebar/Sidebar";

const Projects = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
                COAL
              </h1>
              <RightIcon />
              <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
                Projects
              </h1>
              <RightIcon />
              <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
                Dias Assistant
              </h1>
            </div>
            <LockIcon />
          </div>

          <div>
            <ProjectsChart />
          </div>

          <div className=" sm:px-[22px] px-[16px] py-[9px] flex items-center justify-between flex-wrap">
            <div className="flex w-fit">
              <button
                id="dropdown-button-2"
                data-dropdown-toggle="dropdown-search-city"
                className="gap-[8px] flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4  text-[#464F60] border border-gray-300 rounded-s-lg "
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
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5  border-s-gray-50   "
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3 "
                >
                  <DivisionIcon className="bg-[#E9EDF5]" />
                </button>
              </div>
            </div>

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
              <div className=" hover:border-b-2 border-[#0D859A] ">
                <div className="mb-[8px] flex gap-[6px] ">
                  <h1 className="text-[14px] font-bold font-Inter text-[#464F60]">
                    Risk
                  </h1>
                  <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                    4
                  </p>
                </div>
              </div>
              <div className="mb-[8px] flex gap-[6px]">
                <h1 className="text-[14px] font-bold font-Inter text-[#464F60]">
                  On hold
                </h1>
                <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                  4
                </p>
              </div>
              <div className="mb-[8px] flex gap-[6px]">
                <h1 className="text-[14px] font-bold font-Inter text-[#464F60]">
                  Potential risk
                </h1>
                <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                  7
                </p>
              </div>
              <div className="mb-[8px] flex gap-[6px] border-r border-[#D5DBE5]">
                <h1 className="text-[14px] font-bold font-Inter text-[#464F60]">
                  On track
                </h1>
                <p className="text-[10px] mr-[24px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                  12
                </p>
              </div>
              <div className="mb-[8px] flex gap-[6px] ">
                <h1 className="text-[14px] font-bold font-Inter text-[#464F60]">
                  Archived
                </h1>
                <p className="text-[10px] font-medium font-Inter text-[#5A6376] px-[6px] py-[3px] bg-[#E9EDF5] rounded-full">
                  9
                </p>
              </div>
            </div>
          </div>

          <div>
            <Projectstabledata />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
