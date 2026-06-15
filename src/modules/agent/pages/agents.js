import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Space } from "antd";
import { useCustomerController } from "../hooks/useCustomerController";
import CreateEditModel from "../components/model/create-edit";
function Customers() {
    const { doctors, isLoading, totalItems, currentPage, perPage, setSearch, setDate, handlePageChange, } = useCustomerController();
    const breadCrumbData = [
        {
            title: "Dashboard",
            link: "/",
        },
        {
            title: "Customers",
            link: "/customers",
        },
    ];
    return (_jsxs(Space, { direction: "vertical", size: 12, style: { display: "flex" }, children: [_jsx(Breadcrumb, { breadCrumbData: breadCrumbData }), _jsx(Header, {}), _jsx("div", { className: "flex justify-end items-center gap-4 ", children: _jsx("div", { className: " flex items-center gap-3", children: _jsx(CreateEditModel, { type: "create" }) }) }), _jsx(DataTable, { data: doctors?.agents || [], isLoading: isLoading, pagination: {
                    current: currentPage,
                    pageSize: perPage,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                } })] }));
}
export default Customers;
