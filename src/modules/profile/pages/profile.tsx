import { Button, Avatar, Modal } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
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
      icon: <ExclamationCircleOutlined />,
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

  return (
    <div className="flex flex-col">

      {/* HEADER */}
      <div className="flex flex-col items-center pt-12! pb-8!">
        <Avatar
          size={84}
          icon={<UserOutlined />}
          className="bg-gray-200! text-gray-600! shadow-none!"
        />

        <h1 className="mt-4! text-lg! font-semibold! text-gray-900!">
          {profileData.username}
        </h1>

        <p className="text-sm! text-gray-500!">{profileData.role}</p>
      </div>

      {/* INFO */}
      <div className="px-5! space-y-5!">
        <div className="flex justify-between border-b! border-gray-100! pb-3!">
          <span className="text-gray-400! text-sm!">အီးမေးလ်</span>
          <span className="text-gray-800! text-sm! font-medium!">
            {profileData.email}
          </span>
        </div>

        <div className="flex justify-between border-b! border-gray-100! pb-3!">
          <span className="text-gray-400! text-sm!">ဝင်ခဲ့သည့်နေ့</span>
          <span className="text-gray-800! text-sm! font-medium!">
            {profileData.joinedDate}
          </span>
        </div>

        <div className="flex justify-between border-b! border-gray-100! pb-3!">
          <span className="text-gray-400! text-sm!">ရာထူး</span>
          <span className="text-gray-800! text-sm! font-medium!">
            {profileData.role}
          </span>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="mt-auto px-5! pb-6! pt-10!">
        <Button
          danger
          icon={<LogoutOutlined />}
          loading={loading}
          onClick={handleLogout}
          className="!w-full !h-11 !rounded-xl !border-gray-200! !shadow-none!"
        >
          ထွက်မည်
        </Button>
      </div>
    </div>
  );
}

export default Profile;