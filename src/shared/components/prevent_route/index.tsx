import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "typescript-cookie";
const isAuthenticated = () => {
  return !!getCookie("token");
};
const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
