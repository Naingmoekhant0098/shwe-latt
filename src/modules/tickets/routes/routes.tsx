import React from "react";
 
const CustomerPage = React.lazy(() => import("../pages/tickets"));
export const ticketRoutes = [
  {
    path: "tickets",
    element: <CustomerPage />,
  },
  
];
