import React from "react";
import SeeWinner from "../pages/check_winner";
import CheckWinner from "../pages/see_winner";
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
    element: <SeeWinner />,
  },
  {
    path: "/check_winner",
    element: <CheckWinner />,
  },
  
];
