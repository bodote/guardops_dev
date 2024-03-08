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
const dataAPI = {
  "Sum1 Evaluation": {
    0: {
      Date: "2024-03-03T17:35:20.892000",
      Value: 48,
    },
    1: {
      Date: "2024-03-03T17:44:24.961000",
      Value: 48,
    },
    2: {
      Date: "2024-03-03T17:49:00.545000",
      Value: 0.6097078263759613,
    },
    3: {
      Date: "2024-03-03T17:51:08.065000",
      Value: 0.5873412869193337,
    },
    4: {
      Date: "2024-03-03T17:53:07.255000",
      Value: 0.5637056463294559,
    },
    5: {
      Date: "2024-03-03T17:55:15.287000",
      Value: 0.5368134184525564,
    },
    6: {
      Date: "2024-03-03T17:57:50.392000",
      Value: 0.5440701510225023,
    },
    7: {
      Date: "2024-03-03T18:00:26.954000",
      Value: 0.547993008295695,
    },
    8: {
      Date: "2024-03-03T18:03:37.432000",
      Value: 0.554340234292405,
    },
    9: {
      Date: "2024-03-03T18:06:56.468000",
      Value: 0.5466712161022074,
    },
    10: {
      Date: "2024-03-03T18:10:25.565000",
      Value: 0.5487073479611196,
    },
  },
  "Total Evaluation Simulation2": {
    0: {
      Date: "2024-03-03T18:15:12.526000",
      Value: 0.514406755566597,
    },
    1: {
      Date: "2024-03-03T18:16:12.635000",
      Value: 0.5569723606109619,
    },
    2: {
      Date: "2024-03-03T18:17:33.229000",
      Value: 0.5979314545790354,
    },
    3: {
      Date: "2024-03-03T18:18:58.620000",
      Value: 0.5966737674815314,
    },
    4: {
      Date: "2024-03-03T18:20:50.859000",
      Value: 0.6066305220127106,
    },
    5: {
      Date: "2024-03-03T18:22:59.515000",
      Value: 0.6013812566245044,
    },
    6: {
      Date: "2024-03-03T18:25:16.157000",
      Value: 0.5791817852428981,
    },
    7: {
      Date: "2024-03-03T18:27:52.946000",
      Value: 0.571568445048549,
    },
  },
};

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
    legend: {
      show: false,
      customLegendItems: ["Team A"],
      inverseOrder: true,
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

  const handleSetChart = async (data) => {
    const traceSeriesArray = [];

    for (const [datasetName, dataset] of Object.entries(data)) {
      const parsedData = Object.values(dataset);
      const dailyData = parsedData.reduce((acc, item) => {
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

      const traceData = Object.entries(dailyData).map(([date, values]) => ({
        x: date,
        y: [values.min, values.max],
      }));

      const newTraceSeries = [
        {
          type: "rangeArea",
          name: `${datasetName}`,
          data: traceData,
        },
        {
          type: "line",
          name: `${datasetName} Median`,
          data: Object.entries(dailyData).map(([date, values]) => ({
            x: date,
            y: parseFloat((values.total / values.count).toFixed(3)), // Convert mean value to have 3 digits after the decimal point
          })),
        },
      ];

      traceSeriesArray.push(newTraceSeries);
    }
    setEvalSeries(traceSeriesArray);
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
        if (responseData.length) {
          await handleSetChart(responseData);
        } else {
          await handleSetChart(dataAPI);
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
          const parsedData = Object.values(responseData);
          const dailyData = parsedData.reduce((acc, item) => {
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
          const traceData = Object.entries(dailyData).map(([date, values]) => ({
            x: date,
            y: [values.min, values.max],
          }));

          const newTraceSeries = [
            {
              type: "rangeArea",
              name: "Team A Range",
              data: traceData,
            },
            {
              type: "line",
              name: "Team A Median",
              data: Object.entries(dailyData).map(([date, values]) => ({
                x: date,
                y: parseFloat((values.total / values.count).toFixed(3)), // Convert mean value to have 3 digits after the decimal point
              })),
            },
          ];
          setTraceSeries(newTraceSeries);
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
                          <Listbox.Options className="absolute z-10 max-h-56 overflow-y-auto mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[209px]">
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
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    1 h
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    6 h
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    1 d
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    3 d
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    7 d
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    15 d
                  </button>
                  <button className="lg:w-[53px] md:w-[48px] p-[6px] whitespace-nowrap border-r-[#CCCCCC] border-r-[1px] font-thin">
                    30 d
                  </button>
                  <button className="lg:w-[53px] w-[48px] font-thin h-[27px]">
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
                    {evalSeries &&
                      evalSeries.map((series, index) => (
                        <div key={index}>
                          <h2 className="text-[18px] font-Archivo font-thin mt-[16px]">
                            {series[0].name}
                          </h2>
                          <div className="chart-monitoring">
                            <div id="chart">
                              {/* <ReactApexChart
                          options={options}
                          series={series}
                          type="rangeArea"
                          height={350}
                        /> */}
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
                      ))}
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <h1 className="text-[20px] font-Archivo font-thin mb-[43px]">
                      Latency of the Traces in Project over Time
                    </h1>
                    <div className="chart-monitoring">
                      <div id="chart">
                        {traceSeries && (
                          <ReactApexChart
                            options={traceOptions}
                            series={traceSeries}
                            type="rangeArea"
                            height={350}
                          />
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
