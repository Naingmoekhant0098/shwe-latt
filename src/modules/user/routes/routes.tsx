import React from "react";
import Detail from "../pages/detail";
const UserPage = React.lazy(() => import("../pages/user"));
export const userRoutes = [
  {
    path: "users",
    element: <UserPage />,
  },
  {
    path: "/doctors/:id",
    element: <Detail />,
  },
];
