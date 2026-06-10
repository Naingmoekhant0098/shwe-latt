import React from "react";

const CategoryPage = React.lazy(() => import("../pages/category"));
export const categoryRoutes = [
  {
    path: "category",
    element: <CategoryPage />,
  },
];
