import { List } from "antd";
import TicketCard from "../card/card";

interface DataTableProps {
  data: any[];
  isLoading: boolean;
  pagination: any;
  agents : any;
  categories : any;
}

function DataGrid({ data, isLoading,agents,categories }: DataTableProps) {
   
  const gridData: any[] = data.map((ticket) => ({
    key: ticket.id,
    ...ticket,
    ticketNumber: ticket.ticketNumber || "N/A",
    drawCategoryName: typeof ticket.DrawCategory === "string" ? ticket.DrawCategory : ticket.DrawCategory?.name || "N/A",
    agentName: typeof ticket.Agent === "string" ? ticket.Agent : ticket.Agent?.name || "N/A",
    prizeCount: ticket.prizes?.length || 0,
  }));

  return (
    <div className="w-full p-0 md:p-4   bg-gray-50/30">
      <List
        loading={isLoading}
        grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        
        dataSource={gridData}
        renderItem={(item) => (
          <List.Item>
            <TicketCard
              item={item}
              draws={categories}
              agents={agents}
             
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default DataGrid;
