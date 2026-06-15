import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Breadcrumb as BC } from "antd";
function Breadcrumb() {
    return (_jsx("div", { children: _jsx(BC, { className: " text-sm! md:text-base!", separator: ">", items: [
                {
                    title: "Dashboard",
                },
                {
                    title: "Tickets",
                },
            ] }) }));
}
export default Breadcrumb;
