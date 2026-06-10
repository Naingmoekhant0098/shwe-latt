import React from "react";
const ProfilePage = React.lazy(() => import("../pages/profile"));
export const profileRoutes = [
  {
    path: "profile",
    element: <ProfilePage />,
  },
];
