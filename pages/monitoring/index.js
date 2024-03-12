import React, { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon } from "@/public/Assets/Icons/Allsvg";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Monitoring = () => {
  const [selected, setSelected] = useState({
    name: "Select a project",
  });
  const [projectList, setProjectList] = useState([]);
  const [searchProject, setSearchProject] = useState("");
  const [evalSeries, setEvalSeries] = useState();
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "rangeArea",
      animations: {
        speed: 500,
      },
    },
    colors: ["#5c78af", "#5c78af"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 1],
    },
    stroke: {
      curve: "straight",
      width: [0, 2],
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    yaxis: {
      title: {
        text: "Summarization Total Accuracy", // Your y-axis title
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
  });
  const [traceSeries, setTraceSeries] = useState();
  const [traceOptions, setTraceOptions] = useState({
    chart: {
      height: 350,
      type: "rangeArea",
      animations: {
        speed: 500,
      },
    },
    colors: ["#e5e5e5", "#000af5"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.5, 1],
    },
    stroke: {
      curve: "straight",
      width: [0, 2],
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    yaxis: {
      title: {
        text: "Latency (seconds)", // Your y-axis title
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
  });

  const [evalData, setEvalData] = useState({});
  const [traceGraphData, setTraceGraphData] = useState();
  const [selectedTimeDuration, setSelectedTimeDuration] = useState("all");

  const handleSetChart = (selectedTimeframe, data) => {
    const evalSeriesArray = [];
    let filteredData = null;
    setSelectedTimeDuration(selectedTimeframe);
    for (const [datasetName, dataset] of Object.entries(data)) {
      const parsedData = Object.values(dataset);
      if (selectedTimeframe !== "all") {
        filteredData = parsedData.filter((item) =>
          isWithinTimeframe(item.Date, selectedTimeframe)
        );
      } else {
        filteredData = parsedData;
      }
      if (filteredData.length === 0) {
        const newEvalSeries = [];
        evalSeriesArray.push(newEvalSeries);
      } else {
        const timeframeData = filteredData.reduce((acc, item) => {
          const date = new Date(item.Date).toISOString().slice(0, 10);
          if (!acc[date]) {
            acc[date] = {
              count: 0,
              total: 0,
              min: Infinity,
              max: -Infinity,
            };
          }
          const value = parseFloat(item.Value.toFixed(3));
          acc[date].count++;
          acc[date].total += value;
          acc[date].min = Math.min(acc[date].min, value);
          acc[date].max = Math.max(acc[date].max, value);
          return acc;
        }, {});

        const evalData = Object.entries(timeframeData).map(
          ([date, values]) => ({
            x: date,
            y: [values.min, values.max],
          })
        );
        const newEvalSeries = [
          {
            type: "rangeArea",
            name: `${datasetName}`,
            data: evalData,
          },
          {
            type: "line",
            name: `${datasetName} Median`,
            data: Object.entries(timeframeData).map(([date, values]) => ({
              x: date,
              y: parseFloat((values.total / values.count).toFixed(3)),
            })),
          },
        ];

        evalSeriesArray.push(newEvalSeries);
      }
    }
    setEvalSeries(evalSeriesArray);
  };

  const handleSetTraceChart = (selectedTimeframe, data) => {
    const parsedData = Object.values(data);
    let filteredData = null;
    if (selectedTimeframe !== "all") {
      filteredData = parsedData.filter((item) =>
        isWithinTimeframe(item.start_time, selectedTimeframe)
      );
    } else {
      filteredData = parsedData;
    }
    if (filteredData.length === 0) {
      const newTraceSeries = [];
      setTraceSeries(newTraceSeries);
    } else {
      const timeframeData = filteredData.reduce((acc, item) => {
        const date = new Date(item.start_time).toISOString().slice(0, 10);
        if (!acc[date]) {
          acc[date] = { count: 0, total: 0, min: Infinity, max: -Infinity };
        }
        const runtime = parseFloat(item.runtime.toFixed(3));
        acc[date].count++;
        acc[date].total += runtime;
        acc[date].min = Math.min(acc[date].min, runtime);
        acc[date].max = Math.max(acc[date].max, runtime);
        return acc;
      }, {});

      const traceData = Object.entries(timeframeData).map(([date, values]) => ({
        x: date,
        y: [values.min, values.max],
      }));

      const newTraceSeries = [
        {
          type: "rangeArea",
          name: "Range",
          data: traceData,
        },
        {
          type: "line",
          name: "Median",
          data: Object.entries(timeframeData).map(([date, values]) => ({
            x: date,
            y:
              values.count > 0
                ? parseFloat((values.total / values.count).toFixed(3))
                : 0,
          })),
        },
      ];
      setTraceSeries(newTraceSeries);
    }
  };

  const isWithinTimeframe = (dateString, selectedTimeframe) => {
    const currentDate = new Date(dateString);
    const currentTime = currentDate.getTime();
    const currentTimeframe =
      Date.now() - getTimeframeInMilliseconds(selectedTimeframe);
    return currentTime >= currentTimeframe;
  };

  const getTimeframeInMilliseconds = (selectedTimeframe) => {
    switch (selectedTimeframe) {
      case "1h":
        return 3600000;
      case "6h":
        return 21600000;
      case "1d":
        return 86400000;
      case "3d":
        return 259200000;
      case "7d":
        return 604800000;
      case "15d":
        return 1296000000;
      case "30d":
        return 2592000000;
      default:
        return 0;
    }
  };

  const getProjectList = async () => {
    try {
      const response = await fetch(`/api/manageProjects`, {
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

  const getEvalsData = async (project_id) => {
    try {
      const response = await fetch(
        `/api/manageMonitoring?projectID=${project_id}&type=eval`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setEvalData(responseData);
          await handleSetChart("all", responseData);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getTracesData = async (project_id) => {
    try {
      const response = await fetch(
        `/api/manageMonitoring?projectID=${project_id}&type=trace`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setTraceGraphData(responseData);
          handleSetTraceChart("all", responseData);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getThresholdData = async (project_id) => {
    try {
      const response = await fetch(
        `/api/manageMonitoring?projectID=${project_id}&type=threshold`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          const newTraceOptions = {
            ...traceOptions,
            annotations: {
              yaxis: [
                {
                  y: responseData.latency_critical_thresholds,
                  y2: 999,
                  borderColor: "#f7cecd",
                  fillColor: "#b75758",
                  opacity: 0.3,
                },
                {
                  y: responseData.latency_warning_thresholds,
                  y2: responseData.latency_critical_thresholds,
                  borderColor: "#ffff00",
                  fillColor: "#ffff00",
                  opacity: 0.3,
                },
              ],
            },
          };

          // Set the updated traceOptions state
          setTraceOptions(newTraceOptions);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  const filteredProjects = projectList.filter((project) => {
    const trimmedSearchProject = searchProject.replace(/[^\w\s]/g, "").trim();
    const regex = new RegExp(trimmedSearchProject, "gi");
    const trimmedProjectName = project.name
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "");
    return trimmedProjectName.match(regex);
  });

  const handleSelect = (value) => {
    setSelected(value);
    getEvalsData(value.project_id);
    getTracesData(value.project_id);
    getThresholdData(value.project_id);
  };

  const isDataAvailable = () => {
    return (
      evalData &&
      Object.keys(evalData).length > 0 &&
      traceGraphData &&
      Object.keys(traceGraphData).length > 0
    );
  };

  useEffect(() => {
    getProjectList();
  }, []);

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <div>
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
            <Logout />
          </div>
          <div className="lg:pl-[42px] sm:pl-[20px] pl-[14px] sm:pr-[20px] pr-[14px] mt-[24px] flex md:flex-row flex-col gap-[20px] justify-between md:items-center">
            <div className="w-full">
              <h1 className="lg:text-[32px] text-[22px] text-black font-thin font-Archivo">
                Monitoring
              </h1>
              <div className="flex gap-[33px] items-center justify-between flex-wrap mt-2">
                <Listbox
                  value={selected}
                  onChange={(value) => handleSelect(value)}
                >
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[209px] px-[8px] py-[1px]">
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
                          <Listbox.Options className="absolute z-[8] max-h-56 overflow-y-auto mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[209px]">
                            <div className="bg-white sticky top-0 z-[9] p-1">
                              <input
                                type="text"
                                className="border-b border-gray-300 focus:outline-none px-2 py-1 w-[97%] bg-white rounded-[6px] ml-[4px] mt-[3px]"
                                placeholder="Search..."
                                value={searchProject}
                                onChange={(e) =>
                                  setSearchProject(e.target.value)
                                }
                              />
                            </div>
                            {filteredProjects.map((project) => (
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
                <div className="border-[#CCCCCC] border-[1px] rounded-[12px]">
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin rounded-[12px_0_0_12px] ${
                      selectedTimeDuration === "1h" && "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("1h", evalData),
                        handleSetTraceChart("1h", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    1 h
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "6h" && "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("6h", evalData),
                        handleSetTraceChart("6h", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    6 h
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "1d" && "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("1d", evalData),
                        handleSetTraceChart("1d", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    1 d
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "3d" && "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("3d", evalData),
                        handleSetTraceChart("3d", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    3 d
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "7d" && "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("7d", evalData),
                        handleSetTraceChart("7d", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    7 d
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "15d" &&
                      "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("15d", evalData),
                        handleSetTraceChart("15d", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    15 d
                  </button>
                  <button
                    className={`lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin ${
                      selectedTimeDuration === "30d" &&
                      "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("30d", evalData),
                        handleSetTraceChart("30d", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    30 d
                  </button>
                  <button
                    className={`lg:w-[53px] w-[48px] font-thin rounded-[0_12px_12px_0] p-[6px] ${
                      selectedTimeDuration === "all" &&
                      selected.project_id &&
                      "bg-[#0D859A] text-white"
                    }`}
                    onClick={() => {
                      handleSetChart("all", evalData),
                        handleSetTraceChart("all", traceGraphData);
                    }}
                    disabled={!isDataAvailable()}
                  >
                    All
                  </button>
                </div>
              </div>
              <div className="flex w-full mt-[40px] xl:gap-[80px]">
                <div className="flex flex-col w-full gap-[32px]">
                  <div>
                    <h1 className="text-[20px] font-Archivo font-thin">
                      Evaluation Runs in Project over Time
                    </h1>
                    {evalSeries && evalSeries.flat().length
                      ? evalSeries.map((series, index) => (
                          <div key={index}>
                            <h2 className="text-[18px] font-Archivo font-thin mt-[16px]">
                              {series[0].name}
                            </h2>
                            <div className="chart-monitoring">
                              <div id="chart">
                                <ReactApexChart
                                  options={options}
                                  series={series}
                                  type="rangeArea"
                                  height={350}
                                />
                              </div>
                            </div>
                            <div id="html-dist"></div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <h1 className="text-[20px] font-Archivo font-thin mb-[43px]">
                      Latency of the Traces in Project over Time
                    </h1>
                    <div className="chart-monitoring">
                      <div id="chart">
                        {traceSeries && traceSeries.length ? (
                          <ReactApexChart
                            options={traceOptions}
                            series={traceSeries}
                            type="rangeArea"
                            height={350}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div id="html-dist"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
