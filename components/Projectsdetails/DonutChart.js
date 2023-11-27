import React, { useState } from "react";
import dynamic from "next/dynamic";

const DonutChart = () => {
  const [chartState] = useState({
    series: [40, 20, 40],
    options: {
      chart: {
        type: "donut",
        width: 1000,
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
          breakpoint: 1024,
          options: {
            chart: {
              width: 150,
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
      <div id="chart">
        {typeof window !== "undefined" && ReactApexChart ? (
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="donut"
          />
        ) : null}
      </div>
    </>
  );
};

export default DonutChart;
