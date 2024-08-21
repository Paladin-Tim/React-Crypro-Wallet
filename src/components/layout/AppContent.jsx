import { useContext } from "react";
import { Layout, Typography } from "antd";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import "../../App.css";

export default function AppContent() {
  const firebase = useContext(FirebaseContext);

  const cryptoPriceMap = firebase.wallet.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Layout.Content className="layout__content">
      <Typography.Title level={3} className="content__title">
        Portfolio:{" "}
        {firebase.wallet
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(3)}
        $
      </Typography.Title>
      <PortfolioChart className="content__portfolio-chart" />
      <AssetsTable />
    </Layout.Content>
  );
}
