import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const { Header, Content } = Layout;

  return (
    <Layout className="h-screen">
      <Header className="bg-black text-white flex items-center">
        <div className="text-lg">Coin App</div>
      </Header>
      <Layout className="h-full">
        <div className="bg-layout-primary h-1/3"></div>
        <div className="bg-layout-secondary h-2/3"></div>
        <Content className="absolute w-[70%] h-[80vh] top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] bg-primary drop-shadow-lg rounded-md">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
