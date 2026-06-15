import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Input, Space } from "antd";
import { useDrawCategoryController } from "../hooks/useCustomerController";
import CreateEditModel from "../components/model/create-edit";
import { Search } from "lucide-react";
function Category() {
    const { drawCategories, isLoading, totalItems, currentPage, perPage, handlePageChange, } = useDrawCategoryController();
    const breadCrumbData = [
        {
            title: "Dashboard",
            link: '/'
        },
        {
            title: "Category",
            link: '/categories'
        },
    ];
    return (_jsxs(Space, { direction: "vertical", size: 16, style: { display: "flex" }, children: [_jsx(Breadcrumb, { breadCrumbData: breadCrumbData }), _jsx(Header, {}), _jsxs("div", { className: "flex justify-end items-center gap-4", children: [_jsx("div", { children: _jsx(Input, { size: "large", className: " text-xs", placeholder: "Search.....", 
                            // onChange={(e) => setSearch(e.target.value)}
                            prefix: _jsx(Search, { className: " size-5" }) }) }), _jsx("div", { className: " flex items-center gap-3", children: _jsx(CreateEditModel, { type: "create" }) })] }), _jsx(DataTable, { data: drawCategories?.drawCategories || [], isLoading: isLoading, pagination: {
                    current: currentPage,
                    pageSize: perPage,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                } })] }));
}
export default Category;
