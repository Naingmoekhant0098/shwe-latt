import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const AgentPage = React.lazy(() => import("../pages/agents"));
export const agentRoutes = [
    {
        path: "agents",
        element: _jsx(AgentPage, {}),
    },
];
