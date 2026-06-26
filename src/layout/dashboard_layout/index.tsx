import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Space,
  Typography,
  Drawer,
  Button,
} from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  MenuOutlined,
  FileSearchOutlined,
  TrophyOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import logo from "../../assets/logo/logo.png";
import { Ticket, Tickets } from "lucide-react";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    {
      label: "ပင်မ",
      key: "",
      icon: <DashboardOutlined />,
    },
    {
      label: "အနိုင်ရသူ စစ်ရန်",
      key: "check_winner",
      icon: <FileSearchOutlined />,
    },
    {
      label: "အနိုင်ရသူ ကြည့်ရန်",
      key: "see_winner",
      icon: <TrophyOutlined />,
    },
    {
      label: "ထီထွက်ရက်များ",
      key: "category",
      icon: <CalendarOutlined />,
    },
    {
      label: "ထီလက်မှတ်များ",
      key: "tickets",
      icon: <Ticket size={16} />,
    },
    {
      label: "အေးဂျင့်များ",
      key: "agents",
      icon: <TeamOutlined />,
    },
    {
      label: "ပရိုဖိုင်",
      key: "profile",
      icon: <UserOutlined />,
    },
  ];

  const currentPathKey = location.pathname.split("/")[1] || "";

  const sidebarContent = (
    <div>
     <div className=" hidden md:block"> 
     <div
        className="flex  md:h-[92] gap-3 items-center justify-center border-b border-slate-200"
        style={{
          padding: "16px 0",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 50,
            height: 50,
            objectFit: "contain",
          }}
        />

      </div>
     </div>

      <Menu
        mode="inline"
        selectedKeys={[currentPathKey]}
        items={menuItems}
        style={{
          borderRight: 0,
          background: "transparent",
          paddingTop: 12,
          paddingLeft : 12,
          paddingRight:12
        }}
        onClick={({ key }) => {
          navigate(`/${key}`);
          setDrawerOpen(false);
        }}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          width={240}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#f9fbfb",
            borderRight: "1px solid #f0f0f0",
            overflow: "auto",
          }}
        >
          {sidebarContent}
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={240}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : 240,
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            height: 64,
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <div className="flex items-center">
    {isMobile && (
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerOpen(true)}
        className="flex items-center justify-center mr-2"
      />
    )}
    <div className="font-medium uppercase text-xl text-slate-800">
      Shwe Latt
    </div>
  </div>

          <Space size={12}>
            {!isMobile && (
              <div
                style={{
                  textAlign: "right",
                  lineHeight: 1.2,
                }}
              >
               
              </div>
            )}

            <Avatar
              src="https://i.pravatar.cc/150?u=harper"
              style={{
                backgroundColor: "#1890ff",
              }}
            />
          </Space>
        </Header>

        <Content>
          <div
            style={{
              padding: isMobile ? 12 : 24,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
