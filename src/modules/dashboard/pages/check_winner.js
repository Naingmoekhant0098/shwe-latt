import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useResultController } from "../hooks/useTicketController";
import TicketCard from "../components/card";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
function CheckWinner() {
    const { drawCategories: draws } = useDrawCategoryController();
    const { checkResults, checkLoading, setSelectedWinnerCategory } = useResultController();
    const [searchParams, setSearchParams] = useSearchParams();
    const cate = searchParams.get("cate") || undefined;
    const setCate = (value) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("cate", value);
            return params;
        });
    };
    useEffect(() => {
        setSelectedWinnerCategory(cate);
    }, [cate]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "mb-3", children: [_jsx("h2", { className: "text-base sm:text-lg font-semibold text-slate-800", children: "\u1021\u1014\u102D\u102F\u1004\u103A\u101B\u101E\u1030 \u1005\u1005\u103A\u1006\u1031\u1038\u101B\u1014\u103A" }), _jsx("div", { className: "text-sm text-slate-500", children: checkResults?.tickets?.length > 0
                            ? `${new Date(checkResults.tickets[0].DrawCategory.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })} တွင်ထွက်ရှိသော ထီပေါက်သူစာရင်း`
                            : "ထီနံပါတ်ထည့်ပြီး အနိုင်ရရှိမှုကို စစ်ဆေးပါ" })] }), _jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6!", children: draws?.drawCategories?.map((cat) => {
                    const value = cat.id || cat._id;
                    const active = cate === value;
                    return (_jsx("div", { onClick: () => setCate(value), className: `
          shrink-0
          cursor-pointer
          rounded-xl
          border
          px-4
          py-3
          transition-all
          ${active
                            ? "border-primary bg-primary/15"
                            : "border-slate-300 bg-white"}
        `, children: _jsx("div", { className: `text-sm font-medium ${active ? "text-primary" : "text-slate-700"}`, children: new Date(cat.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }) }) }, value));
                }) }), checkLoading ? (_jsx("div", { className: "flex justify-center items-center py-30", children: _jsxs("div", { className: " text-center flex flex-col items-center gap-3", children: [_jsx(Spin, { size: "large" }), _jsx("div", { children: "\u101B\u103E\u102C\u1016\u103D\u1031\u1014\u1031\u1015\u102B\u101E\u100A\u103A" })] }) })) : checkResults?.tickets?.length ? (_jsx("div", { className: " grid grid-cols-1 md:grid-cols-3 gap-3", children: checkResults.tickets.map((item, index) => (_jsx(TicketCard, { item: item }, index))) })) : (_jsx("div", { className: "text-center text-gray-400 py-10", children: "\u1021\u1014\u102D\u102F\u1004\u103A\u101B\u101B\u103E\u102D\u101E\u1030\u1019\u101B\u103E\u102D\u1015\u102B" }))] }));
}
export default CheckWinner;
