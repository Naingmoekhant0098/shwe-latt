import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CardList from "../components/card_list";
import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Segmented, Space } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useUserController } from "../hooks/useUserController";
import CreateEditModel from "../components/model/create-edit";
function Users() {
    const { doctors, isLoading, totalItems, currentPage, perPage, viewMode, setViewMode, handlePageChange, } = useUserController();
    const options = [
        { value: "list", icon: _jsx(BarsOutlined, { className: "text-lg" }) },
        { value: "grid", icon: _jsx(AppstoreOutlined, { className: "text-lg" }) },
    ];
    return (_jsxs(Space, { direction: "vertical", size: 16, style: { display: "flex" }, children: [_jsx(Breadcrumb, {}), _jsx(Header, {}), _jsx(CardList, {}), _jsxs("div", { className: " flex justify-end items-center gap-4", children: [_jsx(Segmented, { className: "p-1  bg-gray-200 ", size: "large", onChange: (value) => setViewMode(value.toString()), options: options }), _jsx(CreateEditModel, { type: "create" })] }), _jsx(DataTable, { data: doctors?.data || [], isLoading: isLoading, viewMode: viewMode, pagination: {
                    current: currentPage,
                    pageSize: perPage,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                } })] }));
}
export default Users;
