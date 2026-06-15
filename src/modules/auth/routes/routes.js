import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const LoginPage = React.lazy(() => import("../pages/login"));
export const authRoutes = [
    {
        path: "login",
        element: _jsx(LoginPage, {}),
    },
];
