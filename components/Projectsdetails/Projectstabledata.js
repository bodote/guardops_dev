import { ThreeDotsIcon, UpDownIcon } from '@/public/Assets/Icons/Allsvg';
import React, { useEffect, useState, useRef } from 'react';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';
import TraceDetails from './TraceDetails';
import { RiAddBoxLine } from 'react-icons/ri';
import { MdDeleteOutline } from 'react-icons/md';

const Projectstabledata = ({ currentProjectID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [traceProject, setTraceProject] = useState(null);
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
    const formattedDate = startDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format time
    const formattedTime = startDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const FormatedTime = `${formattedDate} ${formattedTime}`;
    return FormatedTime;
  };

  const getProjectDetails = async () => {
    try {
      // const urlParams = new URLSearchParams(traceProject?.attributes?.http_url);
      // const project_id = '7b0ad838-1eae-4b28-b148-9bc8aaaaab03';
      const url = new URL( window.location.href);
      const projectId = url.pathname.split('/').pop()
  
      const response = await fetch(
        `/api/manageProjectTrace?project_id=${projectId}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.traces) {
          setProjectList(responseData.traces);
        }
      } else {
        console.error('API request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

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
                  <a href="">
                    <UpDownIcon />
                  </a>
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
            {projectList.map((data, outerEle) =>
              data.map((val, innerEle) => {
                return (
                  val.parent_id == null && (
                    <tr
                      key={innerEle}
                      onClick={() => openModal(data)}
                      className="hover:bg-[#fffbeb] align-middle border-b border-[#334851] border-opacity-[0.1]"
                    >
                      <td className="py-[14px] px-[10px]  text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                        />
                      </td>
                      <td className=" text-[#bbbbbb]">
                        <IoChevronForwardCircleOutline />
                      </td>

                      <td className="py-[14px] px-[10px] text-[14px] text-[#171C26] font-medium font-Inter text-center">
                        {innerEle}
                      </td>
                      <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                        <a href="#" className="hover:underline">
                          {val.kind}
                        </a>
                      </td>
                      <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center min-w-[300px]">
                        <a href="#" className="hover:underline line-clamp">
                          {val.attributes?.prompt}
                        </a>
                      </td>
                      <td className=" py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                        <a href="#" className="hover:underline line-clamp">
                          {val.attributes?.content}
                        </a>
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center min-w-[300px]">
                        {handleSpanStartTime(val.start_time)}
                        <br />
                      </td>
                      <td className="py-[14px] px-[10px] text-[14px] font-normal font-Inter text-[#464F60] text-center">
                        <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                          {handleLatency(val.start_time, val.end_time)}s
                        </button>
                      </td>
                      <td className="py-[14px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-center">
                        <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                          {val.attributes?.total_tokens}
                        </button>
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
