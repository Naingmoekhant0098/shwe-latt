import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Breadcrumb as BC } from "antd";
function Breadcrumb() {
    return (_jsx("div", { children: _jsx(BC, { separator: ">", items: [
                {
                    title: "Home",
                },
                {
                    title: "Application Center",
                    href: "",
                },
                {
                    title: "Application List",
                    href: "",
                },
                {
                    title: "An Application",
                },
            ] }) }));
}
export default Breadcrumb;
