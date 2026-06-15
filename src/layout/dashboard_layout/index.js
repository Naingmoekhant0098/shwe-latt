import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Layout, Menu, theme, Avatar, Space, Typography, Drawer, Button, } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { DashboardOutlined, UserOutlined, FileTextOutlined, TeamOutlined, CalendarOutlined, MenuOutlined, FileSearchOutlined, } from "@ant-design/icons";
import logo from "../../assets/logo/logo.png";
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
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
            icon: _jsx(DashboardOutlined, {}),
        },
        {
            label: "အနိုင်ရသူ စစ်ဆေးရန် ",
            key: "check_winner",
            icon: _jsx(FileSearchOutlined, {}),
        },
        {
            label: "အနိုင်ရသူ ကြည့်ရန် ",
            key: "see_winner",
            icon: _jsx(FileSearchOutlined, {}),
        },
        {
            label: "အမျိုးအစား",
            key: "category",
            icon: _jsx(CalendarOutlined, {}),
        },
        {
            label: "ထီလက်မှတ်များ",
            key: "tickets",
            icon: _jsx(FileTextOutlined, {}),
        },
        {
            label: "အေးဂျင့်များ",
            key: "agents",
            icon: _jsx(TeamOutlined, {}),
        },
        {
            label: "ပရိုဖိုင်",
            key: "profile",
            icon: _jsx(UserOutlined, {}),
        },
    ];
    const currentPathKey = location.pathname.split("/")[1] || "";
    const sidebarContent = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center justify-center border-b border-slate-200", style: {
                    height: 92,
                    padding: "16px 0",
                }, children: [_jsx("img", { src: logo, alt: "Logo", style: {
                            width: 40,
                            height: 40,
                            objectFit: "contain",
                        } }), _jsx("span", { style: {
                            fontWeight: 600,
                            fontSize: 18,
                            marginTop: 4,
                        }, children: "Shwe Latt" })] }), _jsx(Menu, { mode: "inline", selectedKeys: [currentPathKey], items: menuItems, style: {
                    borderRight: 0,
                    background: "transparent",
                    paddingTop: 12,
                }, onClick: ({ key }) => {
                    navigate(`/${key}`);
                    setDrawerOpen(false);
                } })] }));
    return (_jsxs(Layout, { style: { minHeight: "100vh" }, children: [!isMobile && (_jsx(Sider, { width: 240, style: {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "#f9fbfb",
                    borderRight: "1px solid #f0f0f0",
                    overflow: "auto",
                }, children: sidebarContent })), isMobile && (_jsx(Drawer, { placement: "left", open: drawerOpen, onClose: () => setDrawerOpen(false), width: 240, styles: {
                    body: {
                        padding: 0,
                    },
                }, children: sidebarContent })), _jsxs(Layout, { style: {
                    marginLeft: isMobile ? 0 : 240,
                    background: "#f5f5f5",
                    minHeight: "100vh",
                }, children: [_jsxs(Header, { style: {
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
                        }, children: [_jsx(Space, { size: 12, children: isMobile && (_jsx(Button, { variant: "outlined", 
                                    // type="text"
                                    icon: _jsx(MenuOutlined, {}), onClick: () => setDrawerOpen(true) })) }), _jsxs(Space, { size: 12, children: [!isMobile && (_jsxs("div", { style: {
                                            textAlign: "right",
                                            lineHeight: 1.2,
                                        }, children: [_jsx(Text, { strong: true, style: {
                                                    display: "block",
                                                    fontSize: 14,
                                                }, children: "Harper Nelson" }), _jsx(Text, { type: "secondary", style: {
                                                    fontSize: 11,
                                                }, children: "Admin Manager" })] })), _jsx(Avatar, { src: "https://i.pravatar.cc/150?u=harper", style: {
                                            backgroundColor: "#1890ff",
                                        } })] })] }), _jsx(Content, { children: _jsx("div", { style: {
                                padding: isMobile ? 12 : 24,
                                minHeight: "100%",
                            }, children: _jsx(Outlet, {}) }) })] })] }));
};
export default DashboardLayout;
