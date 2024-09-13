import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Reports() {
  const [senseData, setSenseData] = useState([]);
  const [profanityData, setProfanityData] = useState([]);
  const [subData, setSubData] = useState([]);

  const fetchData = async () => {
    setSenseData([20, 15, 3]);
    setProfanityData([10, 2]);
    setSubData([
      { title: "یک ماهه", data: [2, 10, 14] },
      { title: "سه ماهه", data: [6, 12, 24] },
      { title: "شش ماهه", data: [3, 6, 6] },
      { title: "یک ساله", data: [0, 1, 3] },
      { title: "کل", data: [11, 29, 47] },
    ]);
    // try {
    //   const response = await GetAllProfanityComments();
    //   setCommentList(response.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const Refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const senseChartData = {
    labels: ["منفی", "خنثی", "مثبت"],
    datasets: [
      {
        label: "تعداد",
        data: senseData,
        hoverOffset: 4,
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(7 ,255 ,0, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(7 ,255 ,0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const senseChartOption = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "تعداد کامنت‌ها براساس حس",
        color: "#333",
        font: {
          size: 21,
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "rgba(0, 0, 0, 0.8)",
          font: {
            size: 17,
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: "white",
      },
    },
  };

  const profanityChartData = {
    labels: ["درست", "غلط"],
    datasets: [
      {
        label: "تعداد",
        data: profanityData,
        hoverOffset: 4,
        backgroundColor: ["rgba(7 ,255 ,0, 0.3)", "rgba(255, 99, 132, 0.3)"],
        borderColor: ["rgba(7 ,255 ,0, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const ProfanityChartOption = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "کامنت‌های مشکوک تشخیص داده شده",
        color: "#333",
        font: {
          size: 21,
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "rgba(0, 0, 0, 0.8)",
          font: {
            size: 17,
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: "white",
      },
    },
  };

  const subChartData = {
    labels: ["امروز", "ماه", "امسال"],
    datasets: [
      {
        label: subData[0] ? subData[0].title : "", // Check if subData[0] exists
        data: subData[0] ? subData[0].data : [], // Provide an empty array if subData[0] doesn't exist
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: subData[1] ? subData[1].title : "", // Check if subData[1] exists
        data: subData[1] ? subData[1].data : [],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: subData[2] ? subData[2].title : "", // Check if subData[2] exists
        data: subData[2] ? subData[2].data : [],
        backgroundColor: "rgba(255, 53, 53, 0.2)",
        borderColor: "rgba(255, 53, 53, 1)",
        borderWidth: 1,
      },
      {
        label: subData[3] ? subData[3].title : "", // Check if subData[3] exists
        data: subData[3] ? subData[3].data : [],
        backgroundColor: "rgba(42, 159, 78, 0.2)",
        borderColor: "rgba(42, 159, 78, 1)",
        borderWidth: 1,
      },
      {
        label: subData[4] ? subData[4].title : "", // Check if subData[3] exists
        data: subData[4] ? subData[4].data : [],
        backgroundColor: "rgba(159, 159, 78, 0.2)",
        borderColor: "rgba(159, 159, 78, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  const subChartOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
        labels: {
          color: "rgba(0, 0, 0, 0.7)", // Legend label color
        },
      },
      title: {
        display: true,
        text: "تعداد فروش هر اشتراک در زمان‌های مختلف",
        color: "#333",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(0, 0, 0, 0.7)", // X-axis tick label color
        },
      },
      y: {
        beginAtZero: true, // Start the y-axis at zero
        ticks: {
          color: "rgba(0, 0, 0, 0.7)", // Y-axis tick label color
        },
      },
    },
  };

  return (
    <div>
      <p className="fs-2">گزارشات</p>
      <div
        className="my-5 flex  flex-col relative overflow-x-auto overflow-y-auto shadow rounded"
        // style={{ maxHeight: "60vh" }}
      >
        <div className="flex flex-row justify-around">
          <div className="col-4 flex flex-col text-center p-2">
            <Doughnut
              className=""
              title="کامنت‌ها براساس حس"
              data={senseChartData}
              options={senseChartOption}
            />
          </div>
          <div className="col-4 flex flex-col text-center p-2">
            <Doughnut
              className=""
              data={profanityChartData}
              options={ProfanityChartOption}
            />
          </div>
        </div>

        <div className="col-6  flex flex-col text-center p-2">
          <Bar
            className=""
            
            data={subChartData}
            options={subChartOption}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
