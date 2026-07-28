import React from "react";

const TicketPage = React.lazy(() => import("../pages/tickets"));
const MoveTicketPage = React.lazy(() => import("../pages/move_tickets"));
export const ticketRoutes = [
  {
    path: "tickets",
    element: <TicketPage />,
  },
  {
    path: "move-tickets",
    element: <MoveTicketPage />,
  },
];
