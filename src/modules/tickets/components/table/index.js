import { jsx as _jsx } from "react/jsx-runtime";
import { List } from "antd";
import TicketCard from "../card/card";
function DataGrid({ data, isLoading, agents, categories }) {
    // const { handleDelete } = useTicketController();
    // const { doctors: draws } = useDrawController();
    const gridData = data.map((ticket) => ({
        key: ticket.id,
        ...ticket,
        ticketNumber: ticket.ticketNumber || "N/A",
        drawCategoryName: typeof ticket.DrawCategory === "string" ? ticket.DrawCategory : ticket.DrawCategory?.name || "N/A",
        agentName: typeof ticket.Agent === "string" ? ticket.Agent : ticket.Agent?.name || "N/A",
        prizeCount: ticket.prizes?.length || 0,
    }));
    return (_jsx("div", { className: "w-full p-0 md:p-4 bg-gray-50/30", children: _jsx(List, { loading: isLoading, grid: { gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }, 
            // pagination={{
            //   ...pagination,
            //   align: "center",
            // }}
            dataSource: gridData, renderItem: (item) => (_jsx(List.Item, { children: _jsx(TicketCard, { item: item, draws: categories, agents: agents }) })) }) }));
}
export default DataGrid;
