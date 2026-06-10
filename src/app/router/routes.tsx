import { AuthLayout } from "../../layout";
import DashboardLayout from "../../layout/dashboard_layout";
import { authRoutes } from "../../modules/auth";
import { dashboardRoutes } from "../../modules/dashboard";
import { userRoutes } from "../../modules/user";
import { agentRoutes } from "../../modules/agent";

import { ticketRoutes } from "../../modules/tickets";
import { categoryRoutes } from "../../modules/category";
import ProtectedRoute from "../../shared/components/prevent_route";
import { profileRoutes } from "../../modules/profile/routes/routes";
export const routes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          ...dashboardRoutes,
          ...categoryRoutes,
          ...userRoutes,
          ...agentRoutes,
          ...ticketRoutes,
          ...profileRoutes
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [...authRoutes],
  },
];
