import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Space,
  Drawer,
  Button,
  Modal,
  Dropdown,
  message,
} from "antd";
import type { MenuProps } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  MenuOutlined,
  FileSearchOutlined,
  TrophyOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";

import logo from "../../assets/logo/logo.png";
import { Ticket } from "lucide-react";
import { removeCookie } from "typescript-cookie";

const { Header, Content, Sider } = Layout;

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

 
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "အကောင့်မှ ထွက်မည်မှာ သေချာပါသလား?",
      icon: <ExclamationCircleOutlined className="!text-rose-500" />,
      content: "ထွက်ရန် သေချာပါက 'ထွက်မည်' ကို နှိပ်ပါ။",
      okText: "ထွက်မည်",
      cancelText: "မထွက်ပါ",
      okButtonProps: { danger: true },
      centered: true, // Center the dialog box
      onOk() {
        removeCookie('token')
        window.location.replace('/')
        message.success("အကောင့်မှ အောင်မြင်စွာ ထွက်ပြီးပါပြီ။");
         
      },
    });
  };

  const avatarDropdownItems: MenuProps["items"] = [
     
    {
      key: "logout",
      label: "ထွက်မည် (Logout)",
      icon: <LogoutOutlined className="!text-rose-500" />,
      danger: true,
      onClick: showLogoutConfirm,
    },
  ];

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
      label: "အနိုင်ရသူ ကြည့်ရန်",
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
      label: "ထွက်မည်",
      key: "logout",
      icon: <LogoutOutlined className="!text-rose-500" />,
      danger: true,
    },
  ];

  const currentPathKey = location.pathname.split("/")[1] || "";

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="hidden md:block">
          <div
            className="flex md:h-[92] gap-3 items-center justify-center border-b border-slate-200"
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
            <div>
              <div className="font-medium uppercase text-lg text-slate-800">
                Shwe Latt
              </div>
              <div className="font-medium uppercase text-xs text-slate-400">
                ADMIN CONTROL
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .custom-sidebar-menu .ant-menu-item {
            border-left: 4px solid transparent;
            border-radius: 10px !important;
            margin-bottom: 6px !important;
            transition: all 0.2s ease;
          }
          .custom-sidebar-menu .ant-menu-item-selected {
            border-left: 4px solid #B88E3C !important;
            background-color: #e6f4ff !important;
            color: #B88E3C !important;
            border-radius: 10px !important;
            font-weight: 600 !important;
          }
        `}</style>

        <Menu
          mode="inline"
          selectedKeys={[currentPathKey]}
          items={menuItems}
          className="custom-sidebar-menu"
          style={{
            borderRight: 0,
            background: "transparent",
            paddingTop: 12,
            paddingLeft: 12,
            paddingRight: 12,
          }}
          onClick={({ key }) => {
            if (key === "logout") {
              setDrawerOpen(false);
              showLogoutConfirm();
            } else {
              navigate(`/${key}`);
              setDrawerOpen(false);
            }
          }}
        />
      </div>
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
            padding: "0 16px",
            height: 64,
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

          <Space size={16}>
            <Dropdown
              menu={{ items: avatarDropdownItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-all">
                <Avatar
                  src="https://i.pravatar.cc/150?u=harper"
                  style={{
                    backgroundColor: "#1890ff",
                  }}
                />
                <DownOutlined className="text-xs text-slate-400" />
              </div>
            </Dropdown>
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