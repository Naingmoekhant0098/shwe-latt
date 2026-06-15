import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const ProfilePage = React.lazy(() => import("../pages/profile"));
export const profileRoutes = [
    {
        path: "profile",
        element: _jsx(ProfilePage, {}),
    },
];
