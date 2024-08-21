import {
  Layout,
  Card,
  Statistic,
  List,
  Typography,
  Tag,
  Button,
  Carousel,
  Flex,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import "../../App.css";

export default function AppSider() {
  const firebase = useContext(FirebaseContext);

  const group = (items, n) =>
    items.reduce((acc, x, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), x];
      return acc;
    }, []);

  return (
    <Layout.Sider width="30%" className="layout__sider">
      <Carousel dotPosition="top" easing="ease-in" infinite={false}>
        {group(firebase.wallet, 3).map((assetGroup) => (
          <Flex>
            {assetGroup.map((asset, i) => (
              <Card
                key={i}
                className="sider__asset-card"
                styles={{
                  body: { padding: "1rem 1.5rem 0" },
                  header: { minHeight: "3rem" },
                }}
                title={asset.name}
              >
                <Statistic
                  value={asset.amount * asset.price}
                  precision={2}
                  valueStyle={{
                    color: asset.grow ? "#3f8600" : "#cf1322",
                  }}
                  prefix={
                    asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="$"
                />
                <List
                  size="small"
                  dataSource={[
                    {
                      title: "Total profit: ",
                      value: asset.totalProfit,
                      withTag: true,
                    },
                    {
                      title: "Asset amount: ",
                      value: asset.amount,
                      isPlain: true,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.title}</span>
                      <span>
                        {item.withTag && (
                          <Tag color={asset.grow ? "green" : "red"}>
                            {asset.growPercent}%
                          </Tag>
                        )}
                        {item.isPlain && item.value}
                        {!item.isPlain && (
                          <Typography.Text
                            type={asset.grow ? "success" : "danger"}
                          >
                            {item.value.toFixed(3)}$
                          </Typography.Text>
                        )}
                      </span>
                    </List.Item>
                  )}
                  footer={
                    <Button
                      type="primary"
                      className="asset-card__button-remove"
                      onClick={() => firebase.removeAsset(asset)}
                    >
                      Remove Asset
                    </Button>
                  }
                />
              </Card>
            ))}
          </Flex>
        ))}
      </Carousel>
    </Layout.Sider>
  );
}
