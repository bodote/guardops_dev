import {
  DivisionIcon,
  DownIcon,
  LockIcon,
  RightIcon,
  SearchIcon,
} from "@/public/Assets/Icons/Allsvg";
import InfiniteScroll from 'react-infinite-scroll-component';

import React, { useEffect, useRef, useState } from "react";
import Projectstabledata from "@/components/Projectsdetails/Projectstabledata";
import { RiFilter2Fill } from "react-icons/ri";
import Sidebar from "@/components/Sidebar/Sidebar";
import DonutChart from "@/components/Projectsdetails/DonutChart";
import BarChart from "@/components/Projectsdetails/BarChart";
import { MdOutlineAdd } from "react-icons/md";
import SelectDatasetModal from "@/components/modal/SelectDatasetModal";
import { useSearchParams } from "next/navigation";
import Logout from "@/components/Logout/Logout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectDetails = () => {
  const [active, setActive] = useState(false);
  const [tracesNumber, setTracesNumber] = useState();
  const [tracesData, setTracesData] = useState();
  const [searchTrace, setSearchTrace] = useState("");
  const [selectedTrace, setSelectedTrace] = useState([]);
  const [traceList, setTraceList] = useState([]);
  const modalRef = useRef();
  const searchParams = useSearchParams();
  const projectName = searchParams.get("name");
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [active]);
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getProjectDetails(nextPage);
    }
  };

  const getProjectDetails = async (pageNum = 1) => {
    try {
      console.log('Fetching page:', pageNum);
      setLoading(true);
      const url = new URL(window.location.href);
      const projectId = url.pathname.split("/").pop();

      const response = await fetch(
        `/api/manageTraces?project_id=${projectId}&page=${pageNum}&limit=20`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (responseData.traces) {
          if (pageNum === 1) {
            setTraceList(responseData.traces);
          } else {
            setTraceList(prevTraces => [...prevTraces, ...responseData.traces]);
          }

          setHasMore(responseData.has_more);

          // Process traces for charts
          let traces = [];
          responseData.traces.forEach((trace) => {
            trace.forEach((data) => {
              if (data.parent_id === null) {
                traces.push(data);
              }
            });
          });

          if (traces.length > 0) {
            if (pageNum === 1) {
              setTracesData(traces);
              // Initialize month counts
              const monthCounts = Array(12).fill(0);
              traces.forEach((trace) => {
                const startTime = new Date(trace.start_time);
                const monthIndex = startTime.getMonth();
                monthCounts[monthIndex]++;
              });
              setTracesNumber(monthCounts);
            } else {
              // Update existing traces data and month counts
              setTracesData(prevData => {
                const newData = [...prevData, ...traces];

                // Recalculate month counts with all data
                const monthCounts = Array(12).fill(0);
                newData.forEach((trace) => {
                  const startTime = new Date(trace.start_time);
                  const monthIndex = startTime.getMonth();
                  monthCounts[monthIndex]++;
                });
                setTracesNumber(monthCounts);

                return newData;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error during API request:", error);
    } finally {
      setLoading(false);
    }
  };
  // Automatic background loading
  useEffect(() => {
    const loadNextPage = async () => {
      if (!loading && hasMore) {
        const nextPage = page + 1;
        console.log('Auto-loading next page:', nextPage);
        setPage(nextPage);
        await getProjectDetails(nextPage);
      }
    };

    // Start loading next page after a short delay
    const timer = setTimeout(() => {
      loadNextPage();
    }, 1000); // 1 second delay between loads

    return () => clearTimeout(timer);
  }, [page, hasMore, loading]);

  // Initial load
  useEffect(() => {
    console.log('Initial load');
    getProjectDetails(1);
  }, []);


  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  if (tracesData) {
    tracesData.forEach((trace) => {
      // Extract prompt_tokens and completion_tokens from attributes
      const { prompt_tokens, completion_tokens } = trace.attributes;

      // Add prompt_tokens to totalInputTokens
      totalInputTokens += prompt_tokens;

      // Add completion_tokens to totalOutputTokens
      totalOutputTokens += completion_tokens;
    });
  }
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
                {projectName}
              </h1>
            </div>
            {/* <LockIcon /> */}
            <Logout />
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
              {tracesNumber ? (
                <BarChart tracesNumber={tracesNumber} />
              ) : (
                <div className="text-center py-4">Loading chart data...</div>
              )}
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
                      {totalInputTokens} T
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
                      {totalOutputTokens} T
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
            <div className="flex gap-[40px] ">
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
                    value={searchTrace}
                    onChange={(e) => setSearchTrace(e.target.value)}
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
              <div className="relative">
                <button
                  onClick={() => setActive(!active)}
                  className="bg-[#cce037] hover:bg-[#0D859A] text-white rounded-lg flex gap-2 items-center p-[10px_14px]"
                >
                  <MdOutlineAdd className="text-[26px] text-white" />
                  Add to Dataset
                </button>
                {active && (
                  <SelectDatasetModal
                    setIsDatasetModelOpen={setActive}
                    selectedTrace={selectedTrace}
                  />
                )}
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
          <div
            id="scrollableDiv"
            style={{
              height: 'calc(100vh - 300px)',
              overflow: 'auto',
              marginTop: '20px'
            }}
          >
            <InfiniteScroll
              dataLength={traceList.length}
              next={() => { }} // Empty function since we're loading automatically
              hasMore={hasMore}
              loader={
                <div className="text-center py-4">
                  <h4>Loading more traces...</h4>
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <Projectstabledata
                searchTrace={searchTrace}
                setSelectedTrace={setSelectedTrace}
                traceList={traceList}
                setTraceList={setTraceList}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
