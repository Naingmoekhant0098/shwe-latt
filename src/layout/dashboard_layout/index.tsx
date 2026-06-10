import { useState } from "react";
import { Layout, Menu, theme, Avatar, Space, Typography } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  ProfileOutlined,
  
} from "@ant-design/icons";
import { Users } from "lucide-react";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems: any = [
    {
      label: "Dashboard",
      key: "",
      icon: <DashboardOutlined />,
    },
    {
      label: "LOTTERY MANAGEMENT",
      type: "group",
      children: [
        {
          label: "Draw Categories",
          key: "category",
          icon: <CalendarOutlined />,
        },
        { label: "Tickets", key: "tickets", icon: <FileTextOutlined /> },

        { label: "Agents", key: "agents", icon: <TeamOutlined /> },
      ],
    },
  ];
  const currentPathKey = location.pathname.split("/")[1] || "";
  const mobileTabs = [
    { label: "ပင်မ", key: "", icon: <DashboardOutlined /> },
    { label: "အမျိုးအစား", key: "category", icon: <CalendarOutlined /> },
    { label: "ထီလက်မှတ်များ", key: "tickets", icon: <FileTextOutlined /> },
    { label: "အေးဂျင့်များ", key: "agents", icon: <TeamOutlined /> },
    { label: "ပရိုဖိုင်", key: "profile", icon: <UserOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          breakpoint="lg"
          onBreakpoint={(broken) => {
            setIsMobile(broken);
          }}
          width={240}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#f9fbfb",
            borderRight: "1px solid #f0f0f0",
            zIndex: 101,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            className="flex flex-col items-center border-b border-slate-200 justify-center"
            style={{ height: "92px", padding: "16px 0" }}
          >
            <img src={logo} className="w-10 mx-auto" alt="Logo" />
            <span
              style={{ fontWeight: "600", fontSize: "18px", marginTop: "4px" }}
            >
              Shwe Latt
            </span>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[currentPathKey]}
            items={menuItems}
            style={{
              background: "transparent",
              borderRight: 0,
              fontSize: 14,
              height: "calc(100vh - 92px)",
              overflowY: "auto",
              paddingBottom: "24px",
            }}
            onClick={({ key }) => navigate(`/${key}`)}
          />
        </Sider>
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : 240,
          background: "#f5f5f5",
          minHeight: "100vh",
          paddingBottom: isMobile ? "64px" : 0,
          transition: "margin-left 0.2s",
        }}
      >
        {!isMobile && (
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              width: "100%",
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              padding: isMobile ? "0 16px" : "0 24px",
              height: "64px",
              justifyContent: "space-between",
              boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            }}
          >
            <Space size={10}>
              <img src={logo} style={{ width: "32px" }} alt="Logo" />
              <Text strong style={{ fontSize: "16px" }}>
                Clinizo
              </Text>
            </Space>

            <Space size={12}>
              {!isMobile && (
                <div style={{ textAlign: "right", lineHeight: "1.2" }}>
                  <Text strong style={{ fontSize: "14px", display: "block" }}>
                    Harper Nelson
                  </Text>
                  <Text type="secondary" style={{ fontSize: "11px" }}>
                    Admin Manager
                  </Text>
                </div>
              )}
              <Avatar
                shape="circle"
                src="https://i.pravatar.cc/150?u=harper"
                style={{ backgroundColor: "#1890ff" }}
              />
            </Space>
          </Header>
        )}

        <Content>
          <div style={{ padding: isMobile ? 12 : 24, minHeight: "100%" }}>
            <div
              style={{ display: "none" }}
              ref={() => {
                if (
                  typeof window !== "undefined" &&
                  !isMobile &&
                  window.innerWidth < 992
                ) {
                  setIsMobile(true);
                }
              }}
            />
            <Outlet />
          </div>
        </Content>
      </Layout>

      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "64px",
            background: colorBgContainer,
            borderTop: "1px solid #e8e8e8",
            boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 1000,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {mobileTabs.map((tab) => {
            const isActive = currentPathKey === tab.key;

            return (
              <div
                key={tab.key}
                onClick={() => navigate(`/${tab.key}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: "100%",
                  cursor: "pointer",
                  color: isActive ? "#1890ff" : "#8c8c8c",
                  transition: "color 0.2s ease",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "2px" }}>
                  {tab.icon}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: isActive ? "600" : "400",
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default DashboardLayout;
