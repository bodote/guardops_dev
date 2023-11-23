import React, { useState } from "react";
import dynamic from "next/dynamic";

const ProjectsChart = () => {
  const [chartState] = useState({
    series: [40, 20, 40],
    options: {
      chart: {
        type: "donut",
        width: 130,
      },

      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#D4DB33", "#E84722", "#0D859A"],

      responsive: [
        {
          breakpoint: 5000,
          options: {
            chart: {
              width: 130,
            },
          },
        },

        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 100,
            },
          },
        },
      ],
    },
  });

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <>
      <div className="flex ">
        <div className="bg-[#f5f5f5]  pr-[15px] py-[6px] rounded-xl m-[14px]">
          <div className="flex gap-[10px] justify-center">
            <div>
              <h1 className="font-Inter text-[14px] text-center font-normal text-[#000000] mt-[5px]">
                Critical Traces
              </h1>
              <div id="chart">
                {typeof window !== "undefined" && ReactApexChart ? (
                  <ReactApexChart
                    options={chartState.options}
                    series={chartState.series}
                    type="donut"
                  />
                ) : null}
              </div>
            </div>
            <div>
              <div className="flex gap-[8px] items-center">
                <h1 className="w-[73px] font-Rubik text-[12px] font-normal text-[#000000] mt-[5px]">
                  Pass Trough
                </h1>
                <button className="w-[52px] py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#D4DB33] mt-[5px]">
                  23.456
                </button>
              </div>
              <div className="flex gap-[8px] items-center">
                <h1 className="w-[73px] font-Rubik text-[12px] font-normal text-[#000000] mt-[5px]">
                  Filtered
                </h1>
                <button className="w-[52px] py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#0D859A] mt-[5px]">
                  2
                </button>
              </div>
              <div className="flex gap-[8px] items-center">
                <h1 className="w-[73px] font-Rubik text-[12px] font-normal text-[#000000] mt-[5px]">
                  Blocked
                </h1>
                <button className="w-[52px] py-[3px] px-[10px] rounded-xl font-Inter text-[10px] font-bold text-[#2F2C53] bg-[#E84722] mt-[5px]">
                  1
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>1</div>
      </div>
    </>
  );
};

export default ProjectsChart;




