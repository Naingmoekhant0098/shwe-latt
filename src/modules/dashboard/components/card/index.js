import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tag } from "antd";
import { CalendarOutlined, TrophyOutlined, UserOutlined, } from "@ant-design/icons";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
function TicketCard({ item }) {
    const navigate = useNavigate();
    const isWon = item?.status === "won";
    const isLost = item?.status === "lost";
    const isPending = item?.status === "pending";
    return (_jsx("div", { onClick: () => navigate("/detail", {
            state: { ticket: item },
        }), className: "group overflow-hidden rounded-2xl  border-slate-200 bg-white  hover:shadow-lg transition-all duration-300", children: _jsxs("div", { className: "flex min-h-[110px]", children: [_jsxs("div", { className: "flex-1 p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[10px] uppercase tracking-widest text-slate-400", children: "Lottery Number" }), _jsx("div", { className: `font-mono font-bold tracking-[4px] text-2xl md:text-3xl leading-none mt-1 ${isWon
                                                ? "text-amber-500"
                                                : isLost
                                                    ? "text-slate-500"
                                                    : "text-red-600"}`, children: item?.number })] }), _jsx(Tag, { color: isPending ? "processing" : isWon ? "gold" : "default", className: "rounded-full px-3", children: isPending ? "စောင့်ဆိုင်းဆဲ" : isWon ? "ဆုမဲပေါက်" : "မပေါက်" })] }), _jsxs("div", { className: "mt-3 grid grid-cols-2  gap-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-[10px] text-slate-400", children: [_jsx(UserOutlined, {}), " Agent"] }), _jsx("div", { className: "font-medium text-sm truncate", children: item?.Agent?.name || "-" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-[10px] text-slate-400", children: [_jsx(CalendarOutlined, {}), " Draw Date"] }), _jsx("div", { className: "font-medium text-sm", children: item?.DrawCategory?.date
                                                ? new Date(item.DrawCategory.date).toLocaleDateString("en-GB")
                                                : "-" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-[10px] text-slate-400", children: "Draw Round" }), _jsxs("div", { className: "font-semibold text-sm", children: ["#", item?.DrawCategory?.drawNumber] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-[10px] text-slate-400", children: "Serial" }), _jsxs("div", { className: "font-mono text-sm", children: ["TH-", item?._id.slice(0, 10), ".."] })] })] })] }), _jsxs("div", { className: "relative w-4 flex items-center justify-center", children: [_jsx("div", { className: "absolute -top-3 w-6 h-6 rounded-full bg-slate-50 border border-slate-200" }), _jsx("div", { className: "h-full border-l-2 border-dashed border-slate-200" }), _jsx("div", { className: "absolute -bottom-3 w-6 h-6 rounded-full bg-slate-50 border border-slate-200" })] }), _jsx("div", { className: `w-28 flex flex-col justify-center items-center text-center p-3 ${isWon
                        ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white"
                        : isLost
                            ? "bg-slate-100 text-slate-500"
                            : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"}`, children: isWon ? (_jsxs(_Fragment, { children: [_jsx(TrophyOutlined, { className: "text-2xl mb-1" }), _jsx("div", { className: "text-[10px] uppercase tracking-wider", children: "Winner" }), _jsx("div", { className: "font-bold text-sm mt-1", children: item?.totalReward?.toLocaleString() }), _jsx("div", { className: "text-[10px] opacity-90", children: "THB" })] })) : (_jsxs(_Fragment, { children: [_jsx(Ticket, { size: 20 }), _jsxs("div", { className: "text-lg font-bold mt-1", children: ["#", item?.DrawCategory?.drawNumber] }), _jsx("div", { className: "text-[10px] uppercase opacity-90", children: "Draw" }), isPending && (_jsx("div", { className: "mt-2 text-[10px] px-2 py-1 rounded-full bg-white/20", children: "Waiting" }))] })) })] }) }));
}
export default TicketCard;
