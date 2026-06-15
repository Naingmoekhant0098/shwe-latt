import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Tag, Typography } from "antd";
import { CalendarOutlined, TrophyOutlined, UserOutlined, } from "@ant-design/icons";
import { Trash } from "lucide-react";
import CreateEditModel from "../model/create-edit";
import { useTicketController } from "../../hooks/useTicketController";
const { Text } = Typography;
function TicketCard({ item, draws, agents }) {
    const { handleDelete } = useTicketController();
    const isWon = item?.status === "won";
    const isLost = item?.status === "lost";
    const isPending = item?.status === "pending";
    const borderColor = isWon
        ? "border-l-4 border-amber-500"
        : isPending
            ? "border-l-4 border-blue-500"
            : "border-l-4 border-slate-300";
    return (_jsx("div", { className: `
        ${borderColor}
        bg-white rounded-2xl border border-0  
      `, children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx(Text, { className: "text-[10px]! uppercase tracking-widest text-slate-400", children: "Lottery Number" }), _jsx("div", { className: `
                font-mono font-bold
                text-2xl md:text-3xl
                tracking-[4px]
                leading-none mt-1
                ${isWon
                                        ? "text-amber-500"
                                        : isLost
                                            ? "text-slate-500"
                                            : "text-blue-600"}
              `, children: item?.number })] }), _jsx(Tag, { color: isPending ? "processing" : isWon ? "gold" : "default", className: "rounded-full px-3 py-0.5 m-0 font-medium", children: isPending
                                ? "စောင့်ဆိုင်း"
                                : isWon
                                    ? "ပေါက်"
                                    : "မပေါက်" })] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(UserOutlined, {}), _jsx("span", { children: item?.Agent?.name || "-" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(CalendarOutlined, {}), _jsx("span", { children: item?.DrawCategory?.date
                                        ? new Date(item.DrawCategory.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "-" })] }), _jsx("div", { children: _jsxs("span", { className: "rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium", children: ["#", item?.DrawCategory?.drawNumber] }) })] }), _jsx("div", { className: "my-3 border-t border-slate-100" }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("div", { children: isWon ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-amber-100", children: _jsx(TrophyOutlined, { className: "text-amber-500" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[10px] uppercase text-slate-400", children: "Reward" }), _jsxs("div", { className: "font-bold text-amber-600", children: [item?.totalReward?.toLocaleString(), " THB"] })] })] })) : (_jsxs("div", { children: [_jsx("div", { className: "text-[10px] uppercase text-slate-400", children: "Draw Round" }), _jsxs("div", { className: "font-semibold text-slate-700", children: ["#", item?.DrawCategory?.drawNumber] })] })) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CreateEditModel, { categories: draws, agents: agents, record: item, type: "edit" }), _jsx(Button, { danger: true, size: "small", type: "text", onClick: () => handleDelete(item), className: "flex items-center justify-center", icon: _jsx(Trash, { size: 14 }) })] })] })] }) }));
}
export default TicketCard;
