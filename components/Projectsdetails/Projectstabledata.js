import { ThreeDotsIcon, UpDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState, useRef } from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import TraceDetails from "./TraceDetails";

const Projectstabledata = ({
  searchTrace,
  setSelectedTrace,
  traceList,
  setTraceList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traceProject, setTraceProject] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [option, setOption] = useState(false);
  const modalRef = useRef();

  const openModal = (value) => {
    setIsModalOpen(true);
    setTraceProject(value);
  };

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

  const handleSelectTraces = (e, data) => {
    if (e.target.checked) {
      // If checked, add the data to the selectedRows state
      setSelectedTrace((prevSelectedTrace) => [...prevSelectedTrace, data]);
    } else {
      // If unchecked, remove the data from the selectedRows state
      setSelectedTrace((prevSelectedTrace) =>
        prevSelectedTrace.filter((row) => row !== data)
      );
    }
  };
  const sortData = () => {
    const sortedProjectList = [...traceList];

    sortedProjectList.sort((a, b) => {
      const nullParentA = a.find((obj) => obj.parent_id === null);
      const nullParentB = b.find((obj) => obj.parent_id === null);

      if (nullParentA && nullParentB) {
        const comparisonResult =
          new Date(nullParentA.start_time) - new Date(nullParentB.start_time);

        return sortOrder === "asc" ? comparisonResult : -comparisonResult;
      } else if (nullParentA) {
        return -1;
      } else if (nullParentB) {
        return 1;
      } else {
        return 0;
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    setTraceList(sortedProjectList);
  };

  const filteredProjects = traceList.filter((project) =>
    project.some(
      (item) =>
        item?.parent_id === null &&
        (item?.kind.toLowerCase().includes(searchTrace.toLowerCase()) ||
          item?.attributes.prompt
            .toLowerCase()
            .includes(searchTrace.toLowerCase()) ||
          item?.attributes.content
            .toLowerCase()
            .includes(searchTrace.toLowerCase()))
    )
  );

  return (
    <>
      <div className="overflow-auto">
        <table className="xl:w-full w-[1240px]">
          <thead>
            <tr className="border-b border-[#334851] border-opacity-[0.1]">
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26]">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
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
                  <div onClick={sortData} className="cursor-pointer">
                    <UpDownIcon />
                  </div>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                Latency
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                total tokens
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((data) =>
              data.map((val, innerEle) => {
                return (
                  val.parent_id == null && (
                    <tr
                      key={innerEle}
                      className="hover:bg-[#fffbeb] align-middle border-b border-[#334851] border-opacity-[0.1]"
                    >
                      <td className="py-[14px] px-[10px]  text-center">
                        <input
                          type="checkbox"
                          onChange={(e) => handleSelectTraces(e, val)}
                          className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                        />
                      </td>
                      <td className=" text-[#bbbbbb]">
                        <IoChevronForwardCircleOutline />
                      </td>

                      <td className="py-[14px] px-[10px] text-[14px] text-[#171C26] font-medium font-Inter text-center">
                        {innerEle}
                      </td>
                      <td
                        onClick={() => openModal(data)}
                        className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center"
                      >
                        <p className="hover:underline cursor-pointer">
                          {val.kind}
                        </p>
                      </td>
                      <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center min-w-[300px]">
                        <p className="line-clamp">{val.attributes?.prompt}</p>
                      </td>
                      <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                        <p className="line-clamp">{val.attributes?.output}</p>
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center min-w-[300px]">
                        {handleSpanStartTime(val.start_time)}
                        <br />
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-normal font-Inter text-[#464F60] text-center">
                        <p className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                          {handleLatency(val.start_time, val.end_time)}s
                        </p>
                      </td>
                      <td className="py-[14px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-center">
                        <p className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                          {val.attributes?.total_tokens}
                        </p>
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                        {val?.status.status_code}
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter ">
                        <div className="flex gap-[5px] items-center relative">
                          {/* {option &&

                      <div className="absolute top-[18px] right-[10px] bg-[#d8d8d9] border-[1px] border-[#868fa0] rounded-[5px] p-[3px]">
                        <div className="flex items-center"><RiAddBoxLine className="text-[#868fa0] text-[20px]" /><span className="text-[#868fa0] text-[16px]">Add</span></div>
                        <div className="flex items-center"><MdDeleteOutline className="text-[#868fa0] text-[20px]" /><span className="text-[#868fa0] text-[16px]">Delete</span></div>
                        </div>
                      } */}
                          <div onClick={() => setOption(!option)}>
                            <ThreeDotsIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                );
              })
            )}
            {isModalOpen && (
              <div
                // ref={modalRef}
                className="modal lg:w-[981px] w-auto flex absolute bg-white right-0 top-0 border-l border-[#CCCCCC] overflow-y-auto z-20 sm:flex-row flex-col"
              >
                <TraceDetails
                  traceProject={traceProject}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projectstabledata;
