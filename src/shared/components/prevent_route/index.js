import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "typescript-cookie";
const isAuthenticated = () => {
    return !!getCookie("token");
};
const ProtectedRoute = () => {
    return isAuthenticated() ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/auth/login", replace: true });
};
export default ProtectedRoute;
