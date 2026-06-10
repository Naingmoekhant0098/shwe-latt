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
    <Card className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-4">
        <img src={logo} className="w-16 h-16 sm:w-20 sm:h-20 mb-3" alt="logo" />

        <div className="text-lg sm:text-xl font-semibold tracking-wide text-slate-800">
          Admin Dashboard
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Sign in to continue
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        name="login-form"
        onFinish={onFinish}
        style={{ minWidth: 300 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Eg . mg mg" disabled={loading} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter Password" disabled={loading} />
        </Form.Item>

        <Button
          block
          loading={loading}
          type="primary"
          htmlType="submit"
          className=" mt-2"
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
