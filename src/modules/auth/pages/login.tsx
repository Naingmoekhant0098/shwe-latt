import { Card, Button, Form, Input } from "antd";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [form] = Form.useForm();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const data = await login(values);

    if (data) {
      if (data.success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
        
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="flex md:hidden justify-center mb-4">
            <img src={logo} className="w-20 h-20 object-contain" alt="logo" />
          </div>

          <div className="mb-2!">
            <h2 className="text-2xl sm:text-3xl text-center md:text-left font-bold tracking-tight text-slate-800">
              Welcome Back
            </h2>
            <p className="text-sm text-center md:text-left text-slate-400 mt-1">
              Please enter your details to sign in
            </p>
          </div>

            <Form
            form={form}
            layout="vertical"
            name="login-form"
            onFinish={onFinish}
            requiredMark={false}
            size="large"
            className="w-full"
            >
            <Form.Item
              label={<span className="text-xs font-semibold text-slate-600">Username</span>}
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
              className="mb-2!"
            >
              <Input
              placeholder="e.g. mg mg"
              disabled={loading}
              className="rounded-xl text-sm mt-0!"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-xs font-semibold text-slate-600">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
              className=""
            >
              <Input.Password
              placeholder="Enter Password"
              disabled={loading}
              className="rounded-xl text-sm"
              />
            </Form.Item>

            <Button
              block
              loading={loading}
              type="primary"
              htmlType="submit"
              className="h-12 rounded-xl text-sm! font-normal!"
            >
              Sign In
            </Button>
            </Form>

          <div className="mt-8 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Shwe Latt. All rights reserved.
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-between items-center p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />

          <div />

          <div className="flex flex-col items-center text-center z-10 space-y-4">
            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 shadow-lg">
              <img src={logo} className="w-28 h-28 object-contain" alt="Shwe Latt Logo" />
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold tracking-wide">
                Shwe Latt
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-xs leading-relaxed">
                Management & Lottery Tracking System
              </p>
            </div>
          </div>

          {/* Bottom Badge/Footer */}
          <div className="text-xs text-slate-400 font-medium z-10">
            Secure Admin Portal
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;