import { useContext, useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import ContentLoader from "../ContentLoader";
import SiderLoader from "../SiderLoader";

export default function AppLayout() {
  const { loading, fetchAssets } = useContext(FirebaseContext);

  useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="layout__container">
      <AppHeader />
      <Layout
        className="layout__content-wrapper"
        style={
          loading && {
            backgroundColor: "transparent",
            flexDirection: "row",
          }
        }
      >
        {loading ? <SiderLoader /> : <AppSider />}
        {loading ? <ContentLoader /> : <AppContent />}
      </Layout>
    </Layout>
  );
}
