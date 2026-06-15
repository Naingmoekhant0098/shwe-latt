import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, Avatar } from "antd";
import { UserOutlined, CheckCircleFilled, PhoneOutlined, EnvironmentFilled, EnvironmentOutlined } from "@ant-design/icons";
import { useCustomerController } from "../../hooks/useCustomerController";
import CreateEditModel from "../model/create-edit";
import { Phone, TrashIcon } from "lucide-react";
function DataGrid({ data = [], isLoading, pagination }) {
    const { handleDelete } = useCustomerController();
    const gridData = data.map((user) => ({
        key: user.id,
        ...user,
    }));
    return (_jsx("div", { className: "w-full md:px-2 sm:px-0", children: _jsx(List, { loading: isLoading, dataSource: gridData, grid: {
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 4,
            }, pagination: {
                ...pagination,
                align: "center",
            }, renderItem: (item) => (_jsx(List.Item, { className: "p-0 mb-3", children: _jsx("div", { className: "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Avatar, { size: 52, icon: _jsx(UserOutlined, {}), className: "bg-red-50 border border-red-100 text-red-500 flex-shrink-0" }), _jsxs("div", { className: "  flex flex-row md:flex-col justify-between items-start gap-4 w-full", children: [" ", _jsxs("div", { className: "flex-1  min-w-0", children: [_jsx("h3", { className: "text-base sm:text-lg font-semibold! text-slate-800 truncate", children: item.name || "မရှိပါ" }), _jsxs("div", { className: "mt-1 space-y-1 text-sm sm:text-sm text-slate-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(PhoneOutlined, { className: "text-slate-400" }), _jsx("span", { className: "truncate", children: item.phone || "မရှိပါ" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(EnvironmentOutlined, { className: "text-slate-400" }), _jsx("span", { className: "truncate", children: item.address || "မရှိပါ" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [_jsx(CreateEditModel, { record: item, type: "edit" }), _jsx(Button, { danger: true, onClick: () => handleDelete?.(item), className: "flex items-center justify-center rounded-lg", icon: _jsx(TrashIcon, { size: 14 }) })] })] })] }) }) })) }) }));
}
export default DataGrid;
