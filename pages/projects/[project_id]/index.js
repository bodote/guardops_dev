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
import { RiFilter2Fill, RiAddLine, RiBarChartLine, RiTimeLine, RiShieldLine, RiAlertLine, RiPauseLine, RiCheckLine, RiArchiveLine } from "react-icons/ri";
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
  const [activeTab, setActiveTab] = useState("All");
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

  const tabs = [
    { name: "All", count: 27, icon: RiBarChartLine },
    { name: "Risk", count: 4, icon: RiAlertLine },
    { name: "On hold", count: 4, icon: RiPauseLine },
    { name: "Potential risk", count: 7, icon: RiShieldLine },
    { name: "On track", count: 12, icon: RiCheckLine },
    { name: "Archived", count: 9, icon: RiArchiveLine, separated: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 sm:ml-[96px] ml-[72px]">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-Archivo text-sm font-medium text-gray-600">COAI</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-gray-600">Projects</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-[#0D859A]">{projectName}</span>
            </div>
            <Logout />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-[#0D859A] to-[#0A6B7A] rounded-lg">
                <RiBarChartLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-Archivo font-light text-gray-900">
                  {projectName}
                </h1>
                <p className="text-gray-600 text-sm">
                  Real-time monitoring and analysis of AI model traces
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Critical Traces Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Critical Traces</h3>
                <div className="p-1.5 bg-red-100 rounded-md">
                  <RiAlertLine className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="h-20">
                    <DonutChart />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Pass Through</span>
                    <span className="px-1.5 py-0.5 bg-[#D4DB33] text-gray-900 text-xs font-semibold rounded">
                      23,456
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Filtered</span>
                    <span className="px-1.5 py-0.5 bg-[#0D859A] text-white text-xs font-semibold rounded">
                      2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Blocked</span>
                    <span className="px-1.5 py-0.5 bg-[#D4DB33] text-gray-900 text-xs font-semibold rounded">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traces per Month Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Traces per Month</h3>
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <RiBarChartLine className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="h-24">
                {tracesNumber ? (
                  <BarChart tracesNumber={tracesNumber} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-6 h-6 border-2 border-[#0D859A] border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                      <span className="text-xs text-gray-500">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Latency & Tokens Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Latency & Tokens</h3>
                <div className="p-1.5 bg-green-100 rounded-md">
                  <RiTimeLine className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Input Tokens</span>
                      <span className="px-1.5 py-0.5 bg-[#D4DB33] text-gray-900 text-xs font-semibold rounded">
                        {totalInputTokens.toLocaleString()} T
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">P55</span>
                      <span className="px-1.5 py-0.5 bg-[#0D859A] text-white text-xs font-semibold rounded">
                        2.55
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Output Tokens</span>
                      <span className="px-1.5 py-0.5 bg-[#D4DB33] text-gray-900 text-xs font-semibold rounded">
                        {totalOutputTokens.toLocaleString()} T
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">P99</span>
                      <span className="px-1.5 py-0.5 bg-[#0D859A] text-white text-xs font-semibold rounded">
                        2.55
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search and Filter */}
              <div className="flex gap-3">
                <div className="flex max-w-md">
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <RiFilter2Fill className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">All</span>
                    <DownIcon className="w-3 h-3 text-gray-400" />
                  </button>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTrace}
                      onChange={(e) => setSearchTrace(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#0D859A] focus:border-transparent transition-all duration-200"
                      placeholder="Search traces..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="bg-gray-100 rounded px-1.5 py-0.5">
                        <DivisionIcon className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add to Dataset Button */}
                {selectedTrace.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setActive(!active)}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#D4DB33] to-[#B8C42A] hover:from-[#0D859A] hover:to-[#0A6B7A] text-gray-900 hover:text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                      <RiAddLine className="w-4 h-4" />
                      Add to Dataset ({selectedTrace.length})
                    </button>
                    {active && (
                      <SelectDatasetModal
                        setIsDatasetModelOpen={setActive}
                        selectedTrace={selectedTrace}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.name;

                  return (
                    <div key={tab.name} className="flex">
                      {tab.separated && (
                        <div className="w-px bg-gray-200 my-2"></div>
                      )}
                      <button
                        onClick={() => setActiveTab(tab.name)}
                        className={`relative px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                          ? 'text-[#0D859A] bg-blue-50 border-b-2 border-[#0D859A]'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{tab.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${isActive
                            ? 'bg-[#0D859A] text-white'
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            {tab.count}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Traces Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div
              style={{
                height: 'calc(100vh - 520px)',
                overflow: 'auto',
              }}
            >
              <InfiniteScroll
                dataLength={traceList.length}
                next={() => { }} // Empty function since we're loading automatically
                hasMore={hasMore}
                loader={
                  <div className="text-center py-6">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#0D859A] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Loading more traces...</span>
                    </div>
                  </div>
                }
                scrollableTarget="scrollableDiv"
              >
                <Projectstabledata
                  searchTrace={searchTrace}
                  setSelectedTrace={setSelectedTrace}
                  selectedTrace={selectedTrace}
                  traceList={traceList}
                  setTraceList={setTraceList}
                />
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
