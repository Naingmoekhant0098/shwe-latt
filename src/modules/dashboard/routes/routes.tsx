import React from "react";
import CheckWinner from "../pages/check_winner";
const DashboardPage = React.lazy(() => import("../pages/dashboard"));
const DetailPage = React.lazy(() => import("../pages/detail"));
export const dashboardRoutes = [
  {
    index : true,
    path: "",
    element: <DashboardPage />,
  },
  {
    
    path: "/detail",
    element: <DetailPage />,
  },
  {
   
    path: "/check_winner",
    element: <CheckWinner />,
  },
  
];
