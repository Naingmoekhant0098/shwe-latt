import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import CheckWinner from "../pages/check_winner";
const DashboardPage = React.lazy(() => import("../pages/dashboard"));
const DetailPage = React.lazy(() => import("../pages/detail"));
export const dashboardRoutes = [
    {
        index: true,
        path: "",
        element: _jsx(DashboardPage, {}),
    },
    {
        path: "/detail",
        element: _jsx(DetailPage, {}),
    },
    {
        path: "/check_winner",
        element: _jsx(CheckWinner, {}),
    },
];
