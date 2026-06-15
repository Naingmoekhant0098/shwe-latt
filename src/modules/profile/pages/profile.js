import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Avatar, Modal } from "antd";
import { UserOutlined, LogoutOutlined, ExclamationCircleOutlined, } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { removeCookie } from "typescript-cookie";
function Profile() {
    const { loading } = useAuth();
    const profileData = {
        username: "Mg Mg",
        role: "Super Admin",
        email: "mgmg@dashboard.com",
        joinedDate: "Jan 2026",
    };
    const handleLogout = () => {
        Modal.confirm({
            title: "အကောင့်ထွက်မည်",
            icon: _jsx(ExclamationCircleOutlined, {}),
            content: "သင်အကောင့်ထွက်လိုပါသလား?",
            centered: true,
            okText: "ထွက်မည်",
            cancelText: "မလုပ်တော့ပါ",
            okType: "danger",
            onOk: () => {
                removeCookie("token");
                window.location.replace("/");
            },
        });
    };
    return (_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex flex-col items-center pt-12! pb-8!", children: [_jsx(Avatar, { size: 84, icon: _jsx(UserOutlined, {}), className: "bg-gray-200! text-gray-600! shadow-none!" }), _jsx("h1", { className: "mt-4! text-lg! font-semibold! text-gray-900!", children: profileData.username }), _jsx("p", { className: "text-sm! text-gray-500!", children: profileData.role })] }), _jsxs("div", { className: "px-5! space-y-5!", children: [_jsxs("div", { className: "flex justify-between border-b! border-gray-100! pb-3!", children: [_jsx("span", { className: "text-gray-400! text-sm!", children: "\u1021\u102E\u1038\u1019\u1031\u1038\u101C\u103A" }), _jsx("span", { className: "text-gray-800! text-sm! font-medium!", children: profileData.email })] }), _jsxs("div", { className: "flex justify-between border-b! border-gray-100! pb-3!", children: [_jsx("span", { className: "text-gray-400! text-sm!", children: "\u101D\u1004\u103A\u1001\u1032\u1037\u101E\u100A\u1037\u103A\u1014\u1031\u1037" }), _jsx("span", { className: "text-gray-800! text-sm! font-medium!", children: profileData.joinedDate })] }), _jsxs("div", { className: "flex justify-between border-b! border-gray-100! pb-3!", children: [_jsx("span", { className: "text-gray-400! text-sm!", children: "\u101B\u102C\u1011\u1030\u1038" }), _jsx("span", { className: "text-gray-800! text-sm! font-medium!", children: profileData.role })] })] }), _jsx("div", { className: "mt-auto px-5! pb-6! pt-10!", children: _jsx(Button, { danger: true, icon: _jsx(LogoutOutlined, {}), loading: loading, onClick: handleLogout, className: "!w-full !h-11 !rounded-xl !border-gray-200! !shadow-none!", children: "\u1011\u103D\u1000\u103A\u1019\u100A\u103A" }) })] }));
}
export default Profile;
