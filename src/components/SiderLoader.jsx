import { Flex, Card, Skeleton, Avatar } from "antd";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";

const { Meta } = Card;

export default function SiderLoader() {
  const { loading } = useContext(FirebaseContext);

  return (
    <Flex
      className="sider__asset-card__skeleton-wrapper"
      vertical="true"
      gap={15}
    >
      <Card className="sider__asset-card__skeleton">
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
      <Card className="sider__asset-card__skeleton">
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
      <Card className="sider__asset-card__skeleton">
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </Flex>
  );
}
