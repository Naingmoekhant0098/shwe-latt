import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import Detail from "../pages/detail";
const UserPage = React.lazy(() => import("../pages/user"));
export const userRoutes = [
    {
        path: "users",
        element: _jsx(UserPage, {}),
    },
    {
        path: "/doctors/:id",
        element: _jsx(Detail, {}),
    },
];
