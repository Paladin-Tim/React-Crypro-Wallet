import { Typography, Flex } from "antd";
import "../App.css";

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} className="modal__coin-info" />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span className="coin-info__symbol">{coin.symbol}</span>}{" "}
        {coin.name}
      </Typography.Title>
    </Flex>
  );
}
