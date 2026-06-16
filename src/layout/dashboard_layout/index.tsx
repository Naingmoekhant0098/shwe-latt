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
} from "@ant-design/icons";

import logo from "../../assets/logo/logo.png";

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
      icon: <FileSearchOutlined />,
    },
    {
      label: "ထီထွက်ရက်များ",
      key: "category",
      icon: <CalendarOutlined />,
    },
    {
      label: "ထီလက်မှတ်များ",
      key: "tickets",
      icon: <FileTextOutlined />,
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
    <>
      <div
        className="flex flex-col items-center justify-center border-b border-slate-200"
        style={{
          height: 92,
          padding: "16px 0",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
          }}
        />

        <span
          style={{
            fontWeight: 600,
            fontSize: 18,
            marginTop: 4,
          }}
        >
          Shwe Latt
        </span>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[currentPathKey]}
        items={menuItems}
        style={{
          borderRight: 0,
          background: "transparent",
          paddingTop: 12,
        }}
        onClick={({ key }) => {
          navigate(`/${key}`);
          setDrawerOpen(false);
        }}
      />
    </>
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
          <Space size={12}>
            {isMobile && (
              <Button
                variant="outlined"
                // type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
              />
            )}
          </Space>

          <Space size={12}>
            {!isMobile && (
              <div
                style={{
                  textAlign: "right",
                  lineHeight: 1.2,
                }}
              >
                <Text
                  strong
                  style={{
                    display: "block",
                    fontSize: 14,
                  }}
                >
                  Harper Nelson
                </Text>

                <Text
                  type="secondary"
                  style={{
                    fontSize: 11,
                  }}
                >
                  Admin Manager
                </Text>
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
