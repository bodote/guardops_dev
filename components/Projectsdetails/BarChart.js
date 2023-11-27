import React, { useState } from "react";
import dynamic from "next/dynamic";

const BarChart = () => {
  const [chartState] = useState({
    options: {
      chart: {
        width: 10,
        id: "basic-bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
          dataLabels: {
            enabled: false, // Set to false to hide the data labels on top of the bars
          },
        },
      },
      xaxis: {
        categories: [
          "jan",
          "Feb",
          "Mar",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      fill: {
        type: "solid",
        colors: "#D4DB33",
      },
      responsive: [
        {
          breakpoint: 1280,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "30%",
                dataLabels: {
                  enabled: false, // Set to false to hide the data labels on top of the bars
                },
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: "series-1",
        data: [
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "11",
          "12",
          "13",
        ],
      },
    ],
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
            type="bar"
            width="100%"
            height="100"
          />
        ) : null}
      </div>
    </>
  );
};

export default BarChart;
