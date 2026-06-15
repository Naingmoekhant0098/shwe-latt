import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Empty, Select, Spin } from "antd";
import ResultCard from "../result_card";
import { EyeOutlined } from "@ant-design/icons";
import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
import { useResultController } from "../../hooks/useTicketController";
import { useState } from "react";
function ResultTab() {
    const [cate, setCate] = useState();
    const { results, handleSearch, isLoading, error } = useResultController();
    const { drawCategories: draws } = useDrawCategoryController();
    
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h2", { className: "text-lg mb-1! font-semibold text-slate-800", children: "\u1011\u102E\u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038" }), _jsx("p", { className: "text-sm text-slate-400", children: "\u1006\u102F\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u1021\u101C\u102D\u102F\u1000\u103A \u1001\u103D\u1032\u1001\u103C\u102C\u1038\u1011\u102C\u1038\u101E\u1031\u102C \u1014\u1031\u102C\u1000\u103A\u1006\u102F\u1036\u1038\u1011\u102E\u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038" })] }), _jsxs("div", { className: " flex justify-between gap-3 mb-3", children: [_jsx(Select, { className: "w-full", placeholder: "\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101B\u1014\u103A", showSearch: false, optionFilterProp: "children", value: cate, onChange: (value) => setCate(value), children: draws?.drawCategories &&
                            draws.drawCategories.map((cat) => (_jsx(Select.Option, { value: cat.id || cat._id, children: new Date(cat.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }) }, cat.id || cat._id))) }), _jsx(Button, { disabled: !cate, onClick: () => handleSearch(cate), type: "primary", icon: _jsx(EyeOutlined, {}), children: _jsx("span", { children: "\u101B\u101C\u1012\u103A\u1000\u103C\u100A\u1037\u103A\u101B\u1014\u103A" }) })] }), isLoading ? (_jsxs("div", { className: "text-center flex flex-col items-center gap-3 py-20", children: [_jsx(Spin, { size: "large" }), _jsx("div", { children: "\u101B\u103E\u102C\u1016\u103D\u1031\u1014\u1031\u1015\u102B\u101E\u100A\u103A" })] })) : error ? (_jsxs("div", { className: " mt-4 py-20", children: [_jsx(Empty, {}), _jsx("div", { className: "text-center text-red-500 ", children: error?.response?.data?.message ||
                            error?.message ||
                            "တစ်ခုခုမှားယွင်းနေပါသည်" })] })) : results?.results?.length ? (_jsx("div", { className: "space-y-3", children: results.results.map((item) => (_jsx(ResultCard, { item: item }, item.id || item._id))) })) : (_jsx("div", { className: "text-center text-gray-400 py-20", children: "\u101B\u101C\u1012\u103A\u1019\u101B\u103E\u102D\u1015\u102B" }))] }));
}
export default ResultTab;
