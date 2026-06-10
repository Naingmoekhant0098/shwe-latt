import React from "react";

const AgentPage = React.lazy(() => import("../pages/agents"));
export const agentRoutes = [
  {
    path: "agents",
    element: <AgentPage />,
  },
];
