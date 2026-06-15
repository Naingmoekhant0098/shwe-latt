import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "antd";
import { Search } from "lucide-react";
function Header() {
    return (_jsxs("div", { className: "flex justify-between items-center  ", children: [_jsx("div", { className: " font-semibold text-xl", children: "Users" }), _jsx("div", { children: _jsx(Input, { size: "large", className: " text-sm", placeholder: "Search.....", prefix: _jsx(Search, { className: " size-5" }) }) })] }));
}
export default Header;
