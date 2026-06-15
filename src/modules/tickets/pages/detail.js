import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Tag, Descriptions, Avatar, Button, Divider, Space, Table, Spin, } from "antd";
import { UserOutlined, SolutionOutlined, HomeOutlined, CalendarOutlined, IdcardOutlined, CheckCircleFilled, EditOutlined, ArrowLeftOutlined, ShopOutlined, ClockCircleOutlined, } from "@ant-design/icons";
import reward from "../../../assets/icons/reward-points.png";
import ClincCover from "../../../assets/images/cover.jpg";
import { CalendarCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb";
import { useTicketDetailController } from "../hooks/useTicketDetailController";
const DoctorDetail = () => {
    const { id } = useParams();
    const { doctor, isLoading, renderValue, handleBack, serviceData } = useTicketDetailController(Number(id));
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
    const columns = [
        {
            title: "Clinic / Location",
            dataIndex: "clinicName",
            key: "clinicName",
            render: (text) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-blue-50 p-2 rounded-lg text-blue-600", children: _jsx(ShopOutlined, {}) }), _jsx("span", { className: "font-semibold text-slate-700", children: text })] })),
        },
        {
            title: "Visiting Days",
            dataIndex: "days",
            key: "days",
            render: (days) => (_jsx(Space, { size: [0, 4], wrap: true, children: days.map((day) => (_jsx(Tag, { className: "m-0 bg-slate-100 border-none rounded text-slate-600 font-medium", children: day }, day))) })),
        },
        {
            title: "Time Slot",
            dataIndex: "time",
            key: "time",
            render: (text) => (_jsxs("span", { className: "text-slate-600 flex items-center gap-2", children: [_jsx(ClockCircleOutlined, { className: "text-blue-400" }), " ", text] })),
        },
    ];
    const servicesColumns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => (_jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: "font-semibold text-slate-700", children: text }) })),
        },
        {
            title: "Service Name",
            dataIndex: "serviceName",
            key: "serviceName",
            render: (text) => (_jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: "font-mono text-sm text-slate-700", children: text }) })),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category) => (_jsx(Space, { size: [0, 4], wrap: true, children: _jsx(Tag, { className: "m-0 font-mono bg-slate-100 border-none rounded text-slate-600 text-sm", children: category }, category) })),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => (_jsx("span", { className: "text-slate-600 font-mono line-clamp-1 flex text-sm items-center gap-2", children: text })),
        },
        {
            title: "Share Type",
            dataIndex: "shareType",
            key: "shareType",
            render: (text) => (_jsxs("div", { className: " text-black font-mono text-sm", children: [" ", text] })),
        },
        {
            title: "Consultation Fee",
            dataIndex: "price",
            key: "price",
            render: (text) => (_jsx(Tag, { color: "green", className: "font-mono border-none px-3 py-1 rounded-lg text-sm", children: text })),
        },
    ];
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-screen", children: _jsx(Spin, { size: "large", tip: "Loading Doctor Details..." }) }));
    }
    return (_jsxs("div", { className: "min-h-screen ", children: [_jsx(Breadcrumb, {}), _jsxs("div", { className: "flex justify-between items-center mb-8 pt-4", children: [_jsx(Button, { icon: _jsx(ArrowLeftOutlined, {}), onClick: handleBack, type: "text", className: "hover:text-blue-600", children: "Back to Doctors" }), _jsxs(Space, { children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), children: "Edit Profile" }), _jsx(Button, { type: "primary", className: "bg-blue-600 border-none px-6", children: "Manage Schedule" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [_jsxs("div", { className: "lg:col-span-1 flex flex-col gap-4", children: [_jsxs(Card, { className: "shadow-sm border-none rounded-2xl overflow-hidden", cover: _jsx("img", { alt: "Clinic Cover", src: ClincCover, className: "h-32 w-full object-cover" }), children: [_jsxs("div", { className: "relative -mt-16 flex flex-col items-center", children: [_jsx(Avatar, { size: 110, src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", className: "border-4 border-white shadow-md bg-white" }), _jsx("div", { className: "mt-4 text-center", children: _jsxs("h1", { className: "text-xl font-semibold text-slate-800 mb-1", children: [renderValue(doctor?.profile?.name), " ", _jsx(CheckCircleFilled, { className: "text-blue-500 text-lg ml-1" })] }) })] }), _jsx(Divider, {}), _jsxs("div", { className: "space-y-4 px-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-500 ", children: "System Status" }), _jsx(Tag, { color: doctor?.is_active ? "success" : "error", children: _jsx("div", { className: " text-[12px] font-mono", children: doctor?.is_active ? "Active" : "Inactive" }) })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-500 ", children: "Experience" }), _jsxs("span", { className: "text-slate-800  font-mono", children: [renderValue(doctor?.experience), " Years"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-500 ", children: "Specialization" }), _jsx(Tag, { color: "blue", className: "rounded-full px-4 border-none text-sm font-mono ", children: renderValue(doctor?.specialization?.name) || "General" })] })] })] }), _jsx(Card, { title: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserOutlined, { className: "text-blue-500" }), _jsx("span", { children: "Credentials & Personal Info" })] }), className: "shadow-sm border-none rounded-2xl p-0! ", children: _jsxs(Descriptions, { column: { xxl: 2, xl: 2, lg: 1 }, layout: "vertical", bordered: true, className: "rounded-lg overflow-hidden text-xs", children: [_jsx(Descriptions.Item, { label: _jsxs("span", { className: "flex items-center gap-2 text-sm", children: [_jsx(IdcardOutlined, {}), " NRC Number"] }), children: _jsx("span", { className: "font-mono font-medium text-slate-700 text-xs", children: renderValue(doctor.nrc_number) }) }), _jsx(Descriptions.Item, { label: _jsxs("span", { className: "flex items-center gap-2 text-sm", children: [_jsx(SolutionOutlined, {}), " Medical License"] }), children: _jsx("span", { className: "font-mono font-medium text-slate-700 text-xs", children: renderValue(doctor.license_number) }) }), _jsx(Descriptions.Item, { label: _jsxs("span", { className: "flex items-center gap-2 text-sm", children: [_jsx(CalendarCheck, { className: " size-4" }), " Register Date"] }), children: _jsxs("span", { className: "font-mono font-medium text-slate-700 text-xs", children: [" ", renderValue(doctor.created_at)] }) }), _jsx(Descriptions.Item, { label: _jsxs("span", { className: "flex items-center gap-2 text-sm", children: [_jsx("img", { src: reward, className: " w-4 h-4", alt: "" }), " Points"] }), children: _jsx(Tag, { children: doctor.points || 0 }) }), _jsx(Descriptions.Item, { label: _jsxs("span", { className: "flex items-center gap-2 text-sm", children: [_jsx(HomeOutlined, {}), " Address"] }), span: 2, children: _jsx("span", { className: "font-mono font-medium text-slate-700 text-xs", children: renderValue(doctor.address) }) })] }) })] }), _jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsx(Card, { title: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserOutlined, { className: "text-blue-500" }), _jsx("span", { children: "About Doctor" })] }), className: "shadow-sm border-none rounded-2xl p-0", headStyle: { borderBottom: "1px solid #f1f5f9" }, styles: { body: { padding: "12px 16px" } }, children: _jsx("p", { className: "text-slate-600 text-sm leading-relaxed", children: doctor.bio || "No biography available." }) }), _jsx(Card, { title: _jsxs("div", { className: "flex items-center gap-2 ", children: [_jsx(CalendarOutlined, { className: "text-blue-500" }), _jsx("span", { children: "Clinic Schedules & Pricing" })] }), className: "shadow-sm border-none rounded-2xl overflow-hidden", children: _jsx(Table, { dataSource: clinicSchedule, columns: columns, pagination: false, className: "ant-table-custom", size: "middle" }) }), _jsx(Card, { title: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarOutlined, { className: "text-blue-500" }), _jsx("span", { children: "Clinical Services" })] }), className: "shadow-sm border-none rounded-2xl overflow-hidden", children: _jsx(Table, { dataSource: serviceData, columns: servicesColumns, pagination: false, className: "ant-table-custom ", size: "middle" }) })] })] })] }));
};
export default DoctorDetail;
