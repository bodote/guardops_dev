import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  BookIcon,
  DivisionIcon,
  DownIcon,
  LockIcon,
  RightIcon,
  SearchIcon,
  UpDownIcon,
} from "@/public/Assets/Icons/Allsvg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiFilter2Fill } from "react-icons/ri";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const index = () => {
  const [selected, setSelected] = useState({
    name: "Select an option",
  });
  const [projectList, setProjectList] = useState([]);
  const [evaluationList, setEvaluationList] = useState([]);
  const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

  const getProjectList = async () => {
    try {
      const user_id = "demouser2";
      const response = await fetch(`/api/manageProjects?user_id=${user_id}`, {
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

  const getEvaluationList = async (project) => {
    try {
      const response = await fetch(
        `/api/manageEvaluation?project_id=${project}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setEvaluationList(responseData.evaluation_list);
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    getProjectList();
  }, []);

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
                Monitoring
              </h1>
            </div>
            <a href="/">
              <LockIcon />
            </a>
          </div>
          <div className="lg:pl-[42px] sm:pl-[20px] pl-[14px] sm:pr-[20px] pr-[14px] mt-[24px] flex md:flex-row flex-col gap-[20px] justify-between md:items-center">
            <div>
              <h1 className="lg:text-[32px] text-[22px] text-black font-thin">
                Evaluation Runs
              </h1>
              <Listbox
                value={selected}
                onChange={(value) => {
                  setSelected(value);
                  getEvaluationList(value.project_id);
                }}
              >
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[209px] px-[8px] py-[3px]">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selected.name}
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
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[209px]">
                          {projectList.map((project) => (
                            <Listbox.Option
                              key={project.project_id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f0efef]  rounded-[6px]"
                                    : "text-[#000]",
                                  "relative cursor-default select-none lg:py-2 py-1 px-[10px]"
                                )
                              }
                              value={project}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "text-[#656565] text-[12px] font-Inter font-medium"
                                          : "font-normal text-[#656565] text-[12px]",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {project.name}
                                    </span>
                                  </div>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="flex sm:w-[370px] w-auto">
              <button
                id="dropdown-button-2"
                data-dropdown-toggle="dropdown-search-city"
                className="gap-[8px] flex-shrink-0 inline-flex items-center py-[2px] px-4  text-[#464F60] border border-gray-300 rounded-s-lg "
                type="button"
              >
                <RiFilter2Fill />
                <h1 className="text-[14px] font-medium font-Inter ">All</h1>
                <DownIcon />
              </button>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon className="text-[#868FA0]" />
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="focus:ring-0 focus:outline-none focus:!border-gray-300  border border-gray-300 text-gray-900 text-sm rounded-[0_8px_8px_0]  block w-full sm:ps-10 pl-[36px] py-[5px]  border-s-gray-50 placeholder:text-[#A1A9B8]"
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
          </div>
          <div className="overflow-auto mt-[41px]">
            <table className="xl:w-full w-[1240px]">
              <thead>
                <tr className="border-b border-[#334851] border-opacity-[0.1] bg-[#F9FAFD]">
                  <th className="py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#171C26]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                    />
                  </th>
                  <th></th>
                  <th className="py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#171C26] ">
                    <div className="flex items-center justify-center">
                      #
                      <a href="">
                        <UpDownIcon />
                      </a>
                    </div>
                  </th>
                  <th className="uppercase px-[10px] py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[210px] text-left">
                    <div className="flex items-center justify-left">
                      Title
                      <a href="">
                        <UpDownIcon />
                      </a>
                    </div>
                  </th>

                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] text-left">
                    Used Evaluation Frameworks
                  </th>
                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] ">
                    <div className="flex items-center justify-center">
                      start Time
                      <a href="">
                        <UpDownIcon />
                      </a>
                    </div>
                  </th>
                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] ">
                    <div className="flex items-center justify-center">
                      Duration
                    </div>
                  </th>
                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] min-w-[150px] text-end">
                    Total Tests
                  </th>
                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] min-w-[150px] text-center">
                    Total Score
                  </th>
                  <th className="uppercase py-[8px] px-[10px] text-[12px] font-medium font-Inter text-[#687182] min-w-[150px]">
                    status
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {evaluationList.map((data, index) => {
                  return (
                    <tr
                      key={data.evaluation_id}
                      className="hover:bg-[#fffbeb] align-middle border-b border-[#334851] border-opacity-[0.1]"
                    >
                      <td className="py-[3.5px] px-[10px]  text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                        />
                      </td>
                      <td className=" text-[#bbbbbb]">
                        <IoChevronForwardCircleOutline />
                      </td>

                      <td className="py-[3.5px] px-[10px] text-[14px] text-[#171C26] font-medium font-Inter text-center">
                        {index}
                      </td>
                      <td className=" py-[3.5px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-left">
                        <p className="hover:underline cursor-pointer">
                          {data.name}
                        </p>
                      </td>
                      <td className=" py-[3.5px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-left min-w-[300px]">
                        <p className="line-clamp">
                          {data.frameworks.join(", ")}
                        </p>
                      </td>
                      <td className=" py-[3.5px] px-[10px] text-[10px] font-normal font-Inter text-[#171C26] text-center">
                        <p className="line-clamp leading-[20px] max-w-[84px] mx-auto">
                          {formatDate(data.date)}
                        </p>
                      </td>
                      <td className="py-[3.5px] px-[10px] text-[14px] font-medium font-Inter text-center min-w-[200px]">
                        <span className="bg-[#E9EDF5] rounded-[6px] h-[24px] text-[#464F60] p-[3.5px_8px]">
                          138 min
                        </span>
                        <br />
                      </td>
                      <td className="py-[3.5px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-end">
                        <span className="bg-[#E9EDF5] rounded-[6px] h-[24px] text-[#464F60] p-[3.5px_8px]">
                          4589
                        </span>
                      </td>
                      <td className="py-[3.5px] px-[10px] text-center">
                        <span className="bg-[#E9EDF5] rounded-[6px] h-[24px] text-[#464F60] p-[3.5px_8px] text-[12px]">
                          {data.evaluations.map(
                            (res) => res.data.eval_data.total_score
                          )}
                        </span>
                      </td>
                      <td>
                        {data.evaluations.map((res, index) => (
                          <DynamicReactJson
                            key={index}
                            src={res.data.eval_data.scores}
                            theme="summerfruit:inverted"
                            collapsed={true}
                          />
                        ))}
                      </td>
                      <td className="py-[3.5px] px-[10px] text-[14px] font-medium font-Inter text-end min-w-[100px]">
                        <div className="flex gap-[5px] items-center relative">
                          <div>
                            <BookIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
