import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
function AuthLayout() {
    return (_jsx("div", { className: "  min-h-screen flex items-center justify-center bg-gray-200", children: _jsx(Outlet, {}) }));
}
export default AuthLayout;
