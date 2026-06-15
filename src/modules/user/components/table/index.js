import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button, Dropdown, List } from "antd";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { renderOrDash } from "../../../../shared/helpers/checkTableValue";
import { EllipsisOutlined, EditOutlined, DeleteOutlined, SettingOutlined, } from "@ant-design/icons";
import GridView from "../grid";
import { useUserController } from "../../hooks/useUserController";
import CreateEditModel from "../model/create-edit";
function DataTable({ data, isLoading, pagination, }) {
    const tableData = data.map((user) => ({
        key: user.id,
        id: user.id,
        name: user.name || "N/A",
        email: user.email || "N/A",
        role: user.roles[0] || "User",
        phone: user.phone || "-",
        is_active: user.isVerify,
    }));
    const { handleDelete, handleDetail, handleEdit } = useUserController();
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "Username",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (val) => (_jsx("span", { className: "font-medium text-gray-900", children: renderOrDash(val) })),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (val) => renderOrDash(val),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (val) => renderOrDash(val),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: 150,
            filters: [
                { text: "Admin", value: "Admin" },
                { text: "User", value: "User" },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) => (_jsx("span", { className: "px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs border", children: role?.name || "User" })),
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            width: 120,
            align: "center",
            render: (isActive) => (_jsx("div", { className: "flex items-center justify-center", children: isActive ? (_jsxs("div", { className: "text-green-600 flex items-center gap-1 text-xs font-semibold", children: [_jsx(ShieldCheck, { className: "w-4 h-4" }), _jsx("span", { children: "ACTIVE" })] })) : (_jsxs("div", { className: "text-red-400 flex items-center gap-1 text-xs font-semibold", children: [_jsx(ShieldAlert, { className: "w-4 h-4" }), _jsx("span", { children: "INACTIVE" })] })) })),
        },
        {
            title: "Actions",
            key: "actions",
            width: 80,
            align: "center",
            render: (_, record) => {
                const menuItems = [
                    {
                        key: "edit",
                        label: _jsx(CreateEditModel, { record: record, type: "edit" }),
                        icon: _jsx(EditOutlined, {}),
                        // onClick: () => handleEdit(record?.id),
                    },
                    {
                        key: "settings",
                        label: _jsx("span", { className: " text-sm", children: "Permissions" }),
                        icon: _jsx(SettingOutlined, {}),
                        onClick: () => console.log("Settings", record.id),
                    },
                    { type: "divider" },
                    {
                        key: "delete",
                        label: _jsx("span", { className: " text-sm", children: "Delete User" }),
                        danger: true,
                        icon: _jsx(DeleteOutlined, {}),
                        onClick: () => handleDelete(record),
                    },
                ];
                return (_jsx(Dropdown, { menu: { items: menuItems }, trigger: ["click"], placement: "bottomRight", children: _jsx(Button, { type: "text", icon: _jsx(EllipsisOutlined, {}) }) }));
            },
        },
    ];
    return (_jsx("div", { className: "w-full", children: _jsx("div", { className: "shadow-sm", children: _jsx(List, { loading: isLoading, dataSource: tableData, grid: {
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }, pagination: {
                    ...pagination,
                    align: "center",
                }, renderItem: (item) => (_jsx(List.Item, { children: _jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm font-semibold text-gray-700", children: item.title || "Bet Item" }), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600", children: item.status })] }), _jsxs("div", { className: "text-sm text-gray-500 space-y-1", children: [_jsxs("div", { children: ["Odds: ", _jsx("b", { children: item.odds })] }), _jsxs("div", { children: ["Match: ", item.matchName] }), _jsxs("div", { children: ["Time: ", item.startTime] })] }), _jsxs("div", { className: "flex justify-between mt-3", children: [_jsx("button", { className: "text-blue-600 text-xs", children: "View" }), _jsx("button", { className: "text-red-500 text-xs", children: "Delete" })] })] }) })) }) }) }));
}
export default DataTable;
