import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const CustomerPage = React.lazy(() => import("../pages/tickets"));
export const ticketRoutes = [
    {
        path: "tickets",
        element: _jsx(CustomerPage, {}),
    },
];
