import React from "react";
import { Row, Col, Card, Statistic, Space } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
const dashboardStats = [
  {
    title: "Active Doctors",
    value: 120,
    icon: <TeamOutlined style={{ color: "#1890ff" }} />,
    color: "#e6f7ff",
  },
  {
    title: "Total Patients",
    value: 1450,
    icon: <UserOutlined style={{ color: "#52c41a" }} />,
    color: "#f6ffed",
  },

  {
    title: "Total Revenue (MMK)",
    value: "2.4M",
    icon: <WalletOutlined style={{ color: "#f5222d" }} />,
    color: "#fff1f0",
  },

  {
    title: "Total Revenue (MMK)",
    value: "2.4M",
    icon: <WalletOutlined style={{ color: "#f5222d" }} />,
    color: "#fff1f0",
  },
];

const CardList = () => {
  return (
     
      <Row gutter={[16, 16]} className=" pt-0 mt-0 ">
        {dashboardStats.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bordered={false} className=" rounded-xl">
              <Space size={16} align="start">
                <Statistic
                  title={
                    <span style={{ fontWeight: 400, color: "#8c8c8c" }}>
                      {item.title}
                    </span>
                  }
                  value={item.value}
                  valueStyle={{ fontWeight: 700 }}
                />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
     
  );
};

export default CardList;
