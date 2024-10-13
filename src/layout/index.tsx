import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const { Header, Content } = Layout;

  return (
    <Layout className="h-screen">
      <Header className="bg-black text-white flex items-center !min-h-[70px]">
        <div className="text-lg cursor-pointer" onClick={() => navigate("/")}>
          Coin App
        </div>
      </Header>
      <Layout className="h-full">
        <div className="bg-layout-primary h-1/3"></div>
        <div className="bg-layout-secondary h-2/3"></div>
        <Content className="absolute w-full top-[71px] md:top-[90px] md:w-[70%] h-fit  max-h-[80%] overflow-scroll left-[50%] -translate-x-[50%] bg-primary drop-shadow-lg rounded-none md:rounded-md">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
