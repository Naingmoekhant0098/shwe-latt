import React from "react";
import AgentDetail from "../pages/detail";

const AgentPage = React.lazy(() => import("../pages/agents"));
export const agentRoutes = [
  {
    path: "agents",
    element: <AgentPage />,
  },
  {
    path: "agents/:id",
    element: <AgentDetail />,
  },
];
