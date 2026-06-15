import { jsx as _jsx } from "react/jsx-runtime";
export const renderOrDash = (value, renderElement) => {
    if (value === null || value === undefined || value === "") {
        return _jsx("div", { className: "text-center text-gray-400", children: "-" });
    }
    return renderElement ? renderElement(value) : value;
};
