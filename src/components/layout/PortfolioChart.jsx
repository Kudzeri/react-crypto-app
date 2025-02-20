import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useCrypto } from "../../context/CryptoContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = () => {
    const {assets} = useCrypto()
  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: ["#8CF305", "#2178ED", "#87A2B7", "#1814C8", "#FF7759", "#CF0FBD", "#8DCE3C", "#E90522", "#5BA141"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'center', height:400}}><Pie data={data} /></div>;
};

export default PortfolioChart;
