import { Button, List, Avatar } from "antd";
import {
  GiftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
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
    if (!dateString) return "မရှိပါ";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString("en-GB");
  };

  return (
    <div className="w-full md:px-2 sm:px-0">
      <List
        loading={isLoading}
        dataSource={gridData}
        grid={{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
        }}
        pagination={{
          ...pagination,
          align: "center",
          size: "small",
        }}
        renderItem={(item) => (
          <List.Item className="p-0 mb-3">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <Avatar
                  size={52}
                  icon={<GiftOutlined />}
                  className="bg-red-50 border border-red-100 text-red-500 flex-shrink-0"
                />

                <div className="  flex flex-row md:flex-col justify-between items-start gap-4 w-full">
                  {" "}
                  <div className="flex-1  min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                      မဲအကြိမ်ရေ - {item.drawNumber || "မရှိပါ"}
                    </h3>

                    <div className="mt-1 space-y-1 text-xs sm:text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-slate-400" />
                        <span className="truncate">
                          ထီထွက်မည့်ရက် - {item.date || "မရှိပါ"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-slate-400" />
                        <span className="truncate">
                          ဖန်တီးချိန် - {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <CreateEditModel record={item} type="edit" />

                    <Button
                      danger
                      onClick={() => handleDelete?.(item)}
                      className="flex items-center justify-center rounded-lg"
                      icon={<TrashIcon size={14} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default DataGrid;
