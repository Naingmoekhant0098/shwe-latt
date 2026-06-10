import React from "react";
const DashboardPage = React.lazy(() => import("../pages/dashboard"));
const DetailPage = React.lazy(() => import("../pages/detail"));
export const dashboardRoutes = [
  {
    index : true,
    path: "",
    element: <DashboardPage />,
  },
  {
    index : true,
    path: "/detail",
    element: <DetailPage />,
  },
  
];
