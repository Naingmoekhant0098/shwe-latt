import React from "react";
import CheckWinner from "../pages/check_winner";
import SeeWinner from "../pages/see_winner";
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
    path: "/see_winner",
    element: <CheckWinner />,
  },
  {
    path: "/check_winner",
    element: <SeeWinner />,
  },
  
];
