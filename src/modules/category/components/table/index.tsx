import { Button, List, Avatar, Popconfirm, Typography, Tag } from "antd";
import {
  GiftOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateEditModel from "../model/create-edit";
import { useDrawCategoryController } from "../../hooks/useCustomerController";

const { Text } = Typography;

function DataGrid({ data = [], isLoading, pagination }) {
  const { handleDelete } = useDrawCategoryController();

  const gridData = data.map((category) => ({
    key: category.id || category._id,
    ...category,
  }));

  return (
    <div className="w-full">
      <List
        loading={isLoading}
        dataSource={gridData}
        grid={{ gutter: 12, xs: 2, sm: 2, md: 2, lg: 5, xl: 5 }}
        pagination={{ ...pagination, align: "center", showSizeChanger: false }}
        renderItem={(item) => (
          <List.Item>
           <div className="bg-white rounded-3xl border border-slate-200  transition-all duration-300 p-5 flex flex-col items-center text-center">
  
 
  <div className="flex flex-col items-center gap-3 w-full">
    <Avatar
      size={52}
      icon={<GiftOutlined className="text-xl" />}
      className="bg-red-50 text-red-500 border border-red-100 mb-1"
    />
    <div className="space-y-0.5">
      <h3 className="font-bold text-slate-800 text-lg m-0 leading-tight">
        { "ထီထွက်ရက်"}
      </h3>
      <div className="flex items-center justify-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
        <CalendarOutlined className="text-red-400 text-xs" />
        <span className="text-sm font-medium">
          {item.date ? item.date : "ရက်စွဲမရှိပါ"}
        </span>
      </div>
    </div>
  </div>

  <div className="w-full   pt-4 flex justify-center gap-2">
    <CreateEditModel record={item} type="edit" />
    
      <Button 
       onClick={() => handleDelete?.(item)}
        danger 
        type="text" 
        className="hover:bg-red-50" 
        icon={<DeleteOutlined />} 
      />
    
  </div>
</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default DataGrid;