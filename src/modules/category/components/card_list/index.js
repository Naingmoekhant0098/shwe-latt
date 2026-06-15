import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Row, Col, Card, Statistic, Space } from "antd";
import { UserOutlined, TeamOutlined, CalendarOutlined, WalletOutlined, } from "@ant-design/icons";
const dashboardStats = [
    {
        title: "Active Doctors",
        value: 120,
        icon: _jsx(TeamOutlined, { style: { color: "#1890ff" } }),
        color: "#e6f7ff",
    },
    {
        title: "Total Patients",
        value: 1450,
        icon: _jsx(UserOutlined, { style: { color: "#52c41a" } }),
        color: "#f6ffed",
    },
    {
        title: "Total Revenue (MMK)",
        value: "2.4M",
        icon: _jsx(WalletOutlined, { style: { color: "#f5222d" } }),
        color: "#fff1f0",
    },
    {
        title: "Total Revenue (MMK)",
        value: "2.4M",
        icon: _jsx(WalletOutlined, { style: { color: "#f5222d" } }),
        color: "#fff1f0",
    },
];
const CardList = () => {
    return (_jsx(Row, { gutter: [16, 16], className: " pt-0 mt-0 ", children: dashboardStats.map((item, index) => (_jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsx(Card, { bordered: false, className: " rounded-xl", children: _jsx(Space, { size: 16, align: "start", children: _jsx(Statistic, { title: _jsx("span", { style: { fontWeight: 400, color: "#8c8c8c" }, children: item.title }), value: item.value, valueStyle: { fontWeight: 700 } }) }) }) }, index))) }));
};
export default CardList;
