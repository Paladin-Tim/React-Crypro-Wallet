import { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useCrypto } from "../context/cryptoContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();
  const firebase = useContext(FirebaseContext);

  const data = {
    labels: firebase.wallet.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: firebase.wallet.map((asset) => asset.amount * asset.price),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
        height: "400px",
      }}
      className="content__doughnut-wrapper"
    >
      <Doughnut data={data} />
    </div>
  );
}
