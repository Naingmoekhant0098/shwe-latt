import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Button, Input, Select, Space } from "antd";
import { useTicketController } from "../hooks/useTicketController";
import CreateEditModel from "../components/model/create-edit";
import { Search } from "lucide-react";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import { useCustomerController } from "../../agent/hooks/useCustomerController";
import { useEffect } from "react";
function Tickets() {
    const { tickets, isLoading, totalItems, currentPage, perPage, setSearch, handlePageChange, selectedCategory, setSelectedCategory, } = useTicketController();
    const { drawCategories: draws } = useDrawCategoryController();
    const { doctors: customers } = useCustomerController();
    const latestDraw = draws?.drawCategories?.reduce((latest, current) => {
        if (!latest)
            return current;
        return new Date(current.date) > new Date(latest.date) ? current : latest;
    }, null);
    const latestDrawId = latestDraw ? latestDraw.id || latestDraw._id : undefined;
    useEffect(() => {
        if (latestDrawId && !selectedCategory) {
            setSelectedCategory(latestDrawId);
        }
    }, [latestDrawId, selectedCategory, setSelectedCategory]);
    return (_jsxs(Space, { direction: "vertical", size: 12, style: { display: "flex" }, children: [_jsx(Breadcrumb, {}), _jsx(Header, {}), _jsxs("div", { className: "flex flex-col gap-3  mb-4  w-full md:flex-row md:items-center md:justify-between", children: [_jsx("div", { className: "w-full md:w-72", children: _jsx(Input, { size: "large", className: "text-sm", placeholder: "\u101B\u103E\u102C\u1016\u103D\u1031\u101B\u1014\u103A...", onChange: (e) => setSearch(e.target.value), prefix: _jsx(Search, { className: "size-5 text-gray-400" }) }) }), _jsxs("div", { className: "flex  gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end md:flex-1 md:gap-4", children: [_jsx("div", { className: "w-full sm:w-auto", children: _jsx(Select, { className: "w-full sm:w-48", placeholder: "\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101B\u1014\u103A", showSearch: false, optionFilterProp: "children", value: selectedCategory || undefined, onChange: (value) => setSelectedCategory(value), children: draws?.drawCategories &&
                                        draws.drawCategories.map((cat) => (_jsx(Select.Option, { value: cat.id || cat._id, children: new Date(cat.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            }) }, cat.id || cat._id))) }) }), _jsx("div", { className: "flex items-center justify-end gap-2 w-full sm:w-auto", children: _jsx(CreateEditModel, { categories: draws?.drawCategories, agents: customers?.agents, type: "create" }) })] })] }), _jsx(DataTable, { data: Array.isArray(tickets) ? tickets : [], isLoading: isLoading, categories: draws?.drawCategories, agents: customers?.agents, pagination: {
                    current: currentPage,
                    pageSize: perPage,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                } })] }));
}
export default Tickets;
