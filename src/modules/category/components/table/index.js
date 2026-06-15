import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, Avatar } from "antd";
import { GiftOutlined, CalendarOutlined, ClockCircleOutlined, } from "@ant-design/icons";
import CreateEditModel from "../model/create-edit";
import { TrashIcon } from "lucide-react";
import { useDrawCategoryController } from "../../hooks/useCustomerController";
function DataGrid({ data = [], isLoading, pagination }) {
    const { handleDelete } = useDrawCategoryController();
    const gridData = data.map((category) => ({
        key: category.id || category._id,
        ...category,
    }));
    const formatDate = (dateString) => {
        if (!dateString)
            return "မရှိပါ";
        const d = new Date(dateString);
        return isNaN(d.getTime()) ? dateString : d.toLocaleDateString("en-GB");
    };
    return (_jsx("div", { className: "w-full md:px-2 sm:px-0", children: _jsx(List, { loading: isLoading, dataSource: gridData, grid: {
                gutter: 10,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
            }, pagination: {
                ...pagination,
                align: "center",
                size: "small",
            }, renderItem: (item) => (_jsx(List.Item, { className: "p-0 mb-3", children: _jsx("div", { className: "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Avatar, { size: 52, icon: _jsx(GiftOutlined, {}), className: "bg-red-50 border border-red-100 text-red-500 flex-shrink-0" }), _jsxs("div", { className: "  flex flex-row md:flex-col justify-between items-start gap-4 w-full", children: [" ", _jsxs("div", { className: "flex-1  min-w-0", children: [_jsxs("h3", { className: "text-base sm:text-lg font-semibold text-slate-800 truncate", children: ["\u1019\u1032\u1021\u1000\u103C\u102D\u1019\u103A\u101B\u1031 - ", item.drawNumber || "မရှိပါ"] }), _jsxs("div", { className: "mt-1 space-y-1 text-xs sm:text-sm text-slate-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarOutlined, { className: "text-slate-400" }), _jsxs("span", { className: "truncate", children: ["\u1011\u102E\u1011\u103D\u1000\u103A\u1019\u100A\u103A\u1037\u101B\u1000\u103A - ", item.date || "မရှိပါ"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ClockCircleOutlined, { className: "text-slate-400" }), _jsxs("span", { className: "truncate", children: ["\u1016\u1014\u103A\u1010\u102E\u1038\u1001\u103B\u102D\u1014\u103A - ", formatDate(item.createdAt)] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [_jsx(CreateEditModel, { record: item, type: "edit" }), _jsx(Button, { danger: true, onClick: () => handleDelete?.(item), className: "flex items-center justify-center rounded-lg", icon: _jsx(TrashIcon, { size: 14 }) })] })] })] }) }) })) }) }));
}
export default DataGrid;
