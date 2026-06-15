import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const CategoryPage = React.lazy(() => import("../pages/category"));
export const categoryRoutes = [
    {
        path: "category",
        element: _jsx(CategoryPage, {}),
    },
];
