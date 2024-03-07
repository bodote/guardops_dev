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
          // console.log("EVAL: ", responseData);
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
          // console.log("TRACE: ", responseData);
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
          // console.log("THRESHOLD: ", responseData);
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
    legend: {
      show: false,
      customLegendItems: ["Team A"],
      inverseOrder: true,
    },
    // title: {
    //   text: "Range Area with Forecast Line (Team A)",
    // },
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

  const [series, setSeries] = useState([
    {
      type: "rangeArea",
      name: "Team A Range",
      data: [
        { x: "01-03-2024", y: [3100, 3400] },
        { x: "08-03-2024", y: [4200, 5200] },
        { x: "15-03-2024", y: [3900, 4900] },
        { x: "22-03-2024", y: [3400, 3900] },
        { x: "01-04-2024", y: [5100, 5900] },
        { x: "08-04-2024", y: [5400, 6700] },
        { x: "15-04-2024", y: [4300, 4600] },
      ],
    },
    {
      type: "line",
      name: "Team A Median",
      data: [
        { x: "Jan", y: 3300 },
        { x: "Feb", y: 4900 },
        { x: "Mar", y: 4300 },
        { x: "Apr", y: 3700 },
        { x: "May", y: 5500 },
        { x: "Jun", y: 5900 },
        { x: "Jul", y: 4500 },
      ],
    },
  ]);

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
    // title: {
    //   text: "Range Area with Forecast Line (Team A)",
    // },
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
    annotations: {
      yaxis: [
        {
          y: 0.6,
          y2: 1,
          borderColor: "#f7cecd",
          fillColor: "#b75758",
          opacity: 0.3,
        },
        {
          y: 0.4,
          y2: 0.6,
          borderColor: "#ffff00",
          fillColor: "#ffff00",
          opacity: 0.3,
        },
      ],
    },
  });

  const handleSelect = (value) => {
    setSelected(value);
    getEvalsData(value.project_id);
    getTracesData(value.project_id);
    getThresholdData(value.project_id);
  };
  const [traceSeries, setTraceSeries] = useState();
  useEffect(() => {
    getProjectList();
  }, []);

  const data22 = {
    0: {
      start_time: "2024-01-30T18:06:25.481000",
      runtime: 0.198,
    },
    1: {
      start_time: "2024-01-30T17:25:10.102000",
      runtime: 0.157,
    },
    2: {
      start_time: "2024-01-30T17:25:10.102000",
      runtime: 0.149,
    },
    3: {
      start_time: "2024-02-03T12:31:38.970000",
      runtime: 0.124,
    },
    4: {
      start_time: "2024-02-08T09:37:26.451000",
      runtime: 0.264,
    },
    5: {
      start_time: "2024-02-01T07:22:37.192000",
      runtime: 0.115,
    },
    6: {
      start_time: "2024-02-03T12:30:57.156000",
      runtime: 0.074,
    },
    7: {
      start_time: "2024-01-30T17:02:07.882000",
      runtime: 0.206,
    },
    8: {
      start_time: "2024-02-01T07:24:38.815000",
      runtime: 0.107,
    },
    9: {
      start_time: "2024-01-30T17:12:58.595000",
      runtime: 0.142,
    },
    10: {
      start_time: "2024-01-30T17:32:08.722000",
      runtime: 0.183,
    },
    11: {
      start_time: "2024-01-30T18:10:48.131000",
      runtime: 0.198,
    },
    12: {
      start_time: "2024-01-30T17:24:41.052000",
      runtime: 0.162,
    },
    13: {
      start_time: "2024-03-04T11:59:34.281000",
      runtime: 0.273,
    },
    14: {
      start_time: "2024-03-04T11:59:34.281000",
      runtime: 0.573,
    },
    15: {
      start_time: "2024-03-04T11:59:34.281000",
      runtime: 0.278,
    },
    16: {
      start_time: "2024-03-04T11:59:34.281000",
      runtime: 0.873,
    },
    17: {
      start_time: "2024-02-03T11:52:48.002000",
      runtime: 0.073,
    },
    18: {
      start_time: "2024-02-01T07:23:59.272000",
      runtime: 0.109,
    },
    19: {
      start_time: "2024-02-09T20:25:30.104000",
      runtime: 0.821,
    },
    20: {
      start_time: "2024-02-09T20:25:30.104000",
      runtime: 0.821,
    },
    21: {
      start_time: "2024-02-09T20:25:30.104000",
      runtime: 0.821,
    },
    22: {
      start_time: "2024-02-05T15:00:11.518000",
      runtime: 0.155,
    },
    23: {
      start_time: "2024-01-30T18:00:31.552000",
      runtime: 0.202,
    },
    24: {
      start_time: "2024-01-30T17:34:07.308000",
      runtime: 0.195,
    },
    25: {
      start_time: "2024-01-30T17:05:30.790000",
      runtime: 0.142,
    },
    26: {
      start_time: "2024-02-03T12:37:08.143000",
      runtime: 0.149,
    },
    27: {
      start_time: "2024-01-30T17:09:26.700000",
      runtime: 0.156,
    },
    28: {
      start_time: "2024-01-30T17:05:30.790000",
      runtime: 0.134,
    },
    29: {
      start_time: "2024-02-05T09:46:31.991000",
      runtime: 0.104,
    },
    30: {
      start_time: "2024-01-30T17:02:07.882000",
      runtime: 0.214,
    },
    31: {
      start_time: "2024-01-30T18:20:36.347000",
      runtime: 0.204,
    },
    32: {
      start_time: "2024-02-08T09:15:34.637000",
      runtime: 0.775,
    },
    33: {
      start_time: "2024-01-30T18:09:49.100000",
      runtime: 0.205,
    },
    34: {
      start_time: "2024-02-08T09:15:34.637000",
      runtime: 0.785,
    },
    35: {
      start_time: "2024-01-30T17:11:18.583000",
      runtime: 0.143,
    },
    36: {
      start_time: "2024-01-30T16:51:44.674000",
      runtime: 0.165,
    },
    37: {
      start_time: "2024-01-30T16:51:44.674000",
      runtime: 0.157,
    },
    38: {
      start_time: "2024-01-30T17:10:29.153000",
      runtime: 0.055,
    },
    39: {
      start_time: "2024-02-08T09:37:26.451000",
      runtime: 0.261,
    },
    40: {
      start_time: "2024-01-30T18:20:14.062000",
      runtime: 0.214,
    },
    41: {
      start_time: "2024-01-30T16:50:04.738000",
      runtime: 0.182,
    },
    42: {
      start_time: "2024-01-30T17:55:32.541000",
      runtime: 0.205,
    },
    43: {
      start_time: "2024-02-01T07:23:10.895000",
      runtime: 0.144,
    },
    44: {
      start_time: "2024-01-30T17:09:26.700000",
      runtime: 0.164,
    },
    45: {
      start_time: "2024-01-30T16:50:04.738000",
      runtime: 0.175,
    },
    46: {
      start_time: "2024-01-30T17:34:07.308000",
      runtime: 0.187,
    },
    47: {
      start_time: "2024-01-30T17:55:32.541000",
      runtime: 0.212,
    },
    48: {
      start_time: "2024-02-01T07:21:20.424000",
      runtime: 0.118,
    },
    49: {
      start_time: "2024-02-08T09:36:15.848000",
      runtime: 1.194,
    },
    50: {
      start_time: "2024-02-08T09:15:34.637000",
      runtime: 0.793,
    },
  };

  useEffect(() => {
    const parsedData = Object.values(data22);

    // Calculate mean, minimum, and maximum values per day
    const dailyData = parsedData.reduce((acc, item) => {
      const date = new Date(item.start_time).toISOString().slice(0, 10);
      if (!acc[date]) {
        acc[date] = { count: 0, total: 0, min: Infinity, max: -Infinity };
      }
      const runtime = parseFloat(item.runtime.toFixed(3)); // Convert runtime to have 3 digits after the decimal point
      acc[date].count++;
      acc[date].total += runtime;
      acc[date].min = Math.min(acc[date].min, runtime);
      acc[date].max = Math.max(acc[date].max, runtime);
      return acc;
    }, {});

    // Format data for traceSeries
    const traceData = Object.entries(dailyData).map(([date, values]) => ({
      x: date,
      y: [values.min, values.max],
    }));

    const traceSeries = [
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

    // Set the traceSeries state
    setTraceSeries(traceSeries);
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
              <div className="grid lg:grid-cols-2 mt-[40px] xl:gap-[80px] gap-[40px]">
                <div>
                  <h1 className="text-[20px] font-Archivo font-thin">
                    Evaluation Runs in Project over Time
                  </h1>
                  <h2 className="text-[18px] font-Archivo font-thin mt-[16px]">
                    Sum 1 Evaluation
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
                    <div id="html-dist"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-[20px] font-Archivo font-thin mb-[43px]">
                    Latency of the Traces in Project over Time
                  </h1>
                  <div className="chart-monitoring">
                    <div id="chart">
                      <ReactApexChart
                        options={traceOptions}
                        series={traceSeries}
                        type="rangeArea"
                        height={350}
                      />
                    </div>
                    <div id="html-dist"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-[20px] font-Archivo font-thin">
                    Total Evaluation Simulation2
                  </h1>
                  <div className="chart-monitoring">
                    <div id="chart">
                      <ReactApexChart
                        options={options}
                        series={series}
                        type="rangeArea"
                        height={350}
                      />
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
  );
};

export default Monitoring;
