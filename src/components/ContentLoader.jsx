import { Spin, Flex, Card, Skeleton } from "antd";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";

const { Meta } = Card;

export default function ContentLoader() {
  const { loading } = useContext(FirebaseContext);
  return (
    <Flex vertical="true" style={{ flex: "1 0 0", padding: "1rem 1rem 0" }}>
      <Flex align="center" justify="center" className="content__loader">
        <Spin size="large"></Spin>
      </Flex>
      <Card className="content__portfolio-chart__skeleton">
        <Skeleton loading={loading} active>
          <Meta title="Card title" description="This is the description" />
        </Skeleton>
      </Card>
    </Flex>
  );
}
