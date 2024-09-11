import React from "react";
import dynamic from "next/dynamic";

const BarChart = ({ tracesNumber }) => {
  // Default categories for months
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: categories,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        dataLabels: {
          position: 'top', // Display labels on top of the bars
        },
      },
    },
    fill: {
      type: 'solid',
      colors: '#D4DB33',
    },
    dataLabels: {
      enabled: true,
      offsetY: -15, // Adjust the vertical position of the labels
      style: {
        colors: ['#a1a1a1'], // Set the color of the labels to black
        fontSize: '12px',
        fontFamily: 'Arial',
        fontWeight: 600,
      },
    },
  };

  // Ensure tracesNumber has 12 values (one for each month)
  const seriesData = tracesNumber && tracesNumber.length === 12 ? tracesNumber : Array(12).fill(0);

  const chartSeries = [
    {
      name: 'Sales',
      data: seriesData,
    },
  ];

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height="100"
      />
    </div>
  );
};

export default BarChart;
