import {
  Card,
  Tag,
  Descriptions,
  Avatar,
  Button,
  Divider,
  Space,
  Table,
  Spin,
} from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
  CheckCircleFilled,
  EditOutlined,
  ArrowLeftOutlined,
  ShopOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import reward from "../../../assets/icons/reward-points.png";
import ClincCover from "../../../assets/images/cover.jpg";
import { CalendarCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb";
import { useUserDetailController } from "../hooks/useUserDetailController";

const DoctorDetail = () => {
  const { id } = useParams();
  const { doctor, isLoading, renderValue, handleBack, serviceData } =
  useUserDetailController(Number(id));
  const clinicSchedule = [
    {
      key: "1",
      clinicName: "Grand Hantha International Hospital",
      days: ["Mon", "Wed", "Fri"],
      time: "09:00 AM - 12:00 PM",
      price: "25,000 MMK",
    },
    {
      key: "2",
      clinicName: "Pun Hlaing Clinic (Downtown)",
      days: ["Tue", "Thu"],
      time: "02:00 PM - 05:00 PM",
      price: "20,000 MMK",
    },
    {
      key: "3",
      clinicName: "Clinizo Specialist Center",
      days: ["Sat"],
      time: "10:00 AM - 04:00 PM",
      price: "15,000 MMK",
    },
  ];
  const columns: any = [
    {
      title: "Clinic / Location",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <ShopOutlined />
          </div>
          <span className="font-semibold text-slate-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Visiting Days",
      dataIndex: "days",
      key: "days",
      render: (days: any) => (
        <Space size={[0, 4]} wrap>
          {days.map((day: any) => (
            <Tag
              key={day}
              className="m-0 bg-slate-100 border-none rounded text-slate-600 font-medium"
            >
              {day}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Time Slot",
      dataIndex: "time",
      key: "time",
      render: (text: string) => (
        <span className="text-slate-600 flex items-center gap-2">
          <ClockCircleOutlined className="text-blue-400" /> {text}
        </span>
      ),
    },
  ];

  const servicesColumns: any = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",

      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-slate-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => (
        <Space size={[0, 4]} wrap>
          <Tag
            key={category}
            className="m-0 font-mono bg-slate-100 border-none rounded text-slate-600 text-sm"
          >
            {category}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-slate-600 font-mono line-clamp-1 flex text-sm items-center gap-2">
          {text}
        </span>
      ),
    },
    {
      title: "Share Type",
      dataIndex: "shareType",
      key: "shareType",

      render: (text: string) => (
        <div className=" text-black font-mono text-sm"> {text}</div>
      ),
    },

    {
      title: "Consultation Fee",
      dataIndex: "price",
      key: "price",

      render: (text: string) => (
        <Tag
          color="green"
          className="font-mono border-none px-3 py-1 rounded-lg text-sm"
        >
          {text}
        </Tag>
      ),
    },
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading Doctor Details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-8 pt-4">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          type="text"
          className="hover:text-blue-600"
        >
          Back to Doctors
        </Button>
        <Space>
          <Button icon={<EditOutlined />}>Edit Profile</Button>
          <Button type="primary" className="bg-blue-600 border-none px-6">
            Manage Schedule
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card
            className="shadow-sm border-none rounded-2xl overflow-hidden"
            cover={
              <img
                alt="Clinic Cover"
                src={ClincCover}
                className="h-32 w-full object-cover"
              />
            }
          >
            <div className="relative -mt-16 flex flex-col items-center">
              <Avatar
                size={110}
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                className="border-4 border-white shadow-md bg-white"
              />
              <div className="mt-4 text-center">
                <h1 className="text-xl font-semibold text-slate-800 mb-1">
                  {renderValue(doctor?.profile?.name)}{" "}
                  <CheckCircleFilled className="text-blue-500 text-lg ml-1" />
                </h1>
              </div>
            </div>
            <Divider />
            <div className="space-y-4 px-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 ">System Status</span>
                <Tag color={doctor?.is_active ? "success" : "error"}>
                  <div className=" text-[12px] font-mono">
                    {doctor?.is_active ? "Active" : "Inactive"}
                  </div>
                </Tag>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 ">Experience</span>
                <span className="text-slate-800  font-mono">
                  {renderValue(doctor?.experience)} Years
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 ">Specialization</span>
                <Tag
                  color="blue"
                  className="rounded-full px-4 border-none text-sm font-mono "
                >
                  {renderValue(doctor?.specialization?.name) || "General"}
                </Tag>
              </div>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-500" />
                <span>Credentials & Personal Info</span>
              </div>
            }
            className="shadow-sm border-none rounded-2xl p-0! "
          >
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 1 }}
              layout="vertical"
              bordered
              className="rounded-lg overflow-hidden text-xs"
            >
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2 text-sm">
                    <IdcardOutlined /> NRC Number
                  </span>
                }
              >
                <span className="font-mono font-medium text-slate-700 text-xs">
                  {renderValue(doctor.nrc_number)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2 text-sm">
                    <SolutionOutlined /> Medical License
                  </span>
                }
              >
                <span className="font-mono font-medium text-slate-700 text-xs">
                  {renderValue(doctor.license_number)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2 text-sm">
                    <CalendarCheck className=" size-4" /> Register Date
                  </span>
                }
              >
                <span className="font-mono font-medium text-slate-700 text-xs">
                  {" "}
                  {renderValue(doctor.created_at)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2 text-sm">
                    <img src={reward} className=" w-4 h-4" alt="" /> Points
                  </span>
                }
              >
                <Tag>{doctor.points || 0}</Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2 text-sm">
                    <HomeOutlined /> Address
                  </span>
                }
                span={2}
              >
                <span className="font-mono font-medium text-slate-700 text-xs">
                  {renderValue(doctor.address)}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-500" />
                <span>About Doctor</span>
              </div>
            }
            className="shadow-sm border-none rounded-2xl p-0"
            headStyle={{ borderBottom: "1px solid #f1f5f9" }}
            styles={{ body: { padding: "12px 16px" } }}
          >
            <p className="text-slate-600 text-sm leading-relaxed">
              {doctor.bio || "No biography available."}
            </p>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2 ">
                <CalendarOutlined className="text-blue-500" />
                <span>Clinic Schedules & Pricing</span>
              </div>
            }
            className="shadow-sm border-none rounded-2xl overflow-hidden"
          >
            <Table
              dataSource={clinicSchedule}
              columns={columns}
              pagination={false}
              className="ant-table-custom"
              size="middle"
            />
          </Card>
          <Card
            title={
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-blue-500" />
                <span>Clinical Services</span>
              </div>
            }
            className="shadow-sm border-none rounded-2xl overflow-hidden"
          >
            <Table
              dataSource={serviceData}
              columns={servicesColumns}
              pagination={false}
              className="ant-table-custom "
              size="middle"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
