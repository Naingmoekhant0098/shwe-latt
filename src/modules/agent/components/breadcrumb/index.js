import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Breadcrumb as BC } from "antd";
function Breadcrumb({ breadCrumbData }) {
    return (_jsx("div", { className: "", children: _jsx(BC, { separator: ">", className: " text-sm! md:text-base!", items: breadCrumbData.map((item) => ({
                title: (_jsx("a", { href: item.link, className: "text-blue-500 hover:underline", children: item.title })),
            })) }) }));
}
export default Breadcrumb;
