import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button, Form, Input } from "antd";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
function Login() {
    const [form] = Form.useForm();
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const data = await login(values);
        if (data) {
            if (data.success) {
                navigate("/");
            }
        }
    };
    return (_jsxs(Card, { className: "flex flex-col items-center justify-center", children: [_jsxs("div", { className: "flex flex-col items-center text-center mb-6 sm:mb-4", children: [_jsx("img", { src: logo, className: "w-16 h-16 sm:w-20 sm:h-20 mb-3", alt: "logo" }), _jsx("div", { className: "text-lg sm:text-xl font-semibold tracking-wide text-slate-800", children: "Admin Dashboard" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-400 mt-1", children: "Sign in to continue" })] }), _jsxs(Form, { form: form, layout: "vertical", name: "login-form", onFinish: onFinish, style: { minWidth: 300 }, children: [_jsx(Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: "Please enter username" }], children: _jsx(Input, { placeholder: "Eg . mg mg", disabled: loading }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: "Please enter password" }], children: _jsx(Input.Password, { placeholder: "Enter Password", disabled: loading }) }), _jsx(Button, { block: true, loading: loading, type: "primary", htmlType: "submit", className: " mt-2", children: "Submit" })] })] }));
}
export default Login;
