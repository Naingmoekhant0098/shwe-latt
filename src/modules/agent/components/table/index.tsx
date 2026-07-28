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

  return (
    <div className="w-full md:px-2 sm:px-0">
      <List
        loading={isLoading}
        dataSource={gridData}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 4,
        }}
        pagination={{
          ...pagination,
          align: "center",
        }}
        renderItem={(item) => (
          <List.Item className="p-0 mb-3">
             

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <Avatar
                  size={52}
                  icon={<UserOutlined />}
                  className="bg-red-50 border border-red-100 text-red-500 flex-shrink-0"
                />

                <div className="  flex flex-row md:flex-col justify-between items-start gap-4 w-full">
                  {" "}
                  <div className="flex-1  min-w-0">
                    <h3 className="text-md sm:text-lg  text-slate-800 truncate">
                    {item.name || "မရှိပါ"}
                    </h3>

                    <div className="mt-1 space-y-1 text-sm sm:text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <PhoneOutlined className="text-slate-400" />
                        <span className="truncate">
                           {item.phone || "မရှိပါ"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                      <EnvironmentOutlined className="text-slate-400" />
                        <span className="truncate">
                           {item.address || "မရှိပါ"}
                        </span>
                      </div>



                      {/* <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-slate-400" />
                        <span className="truncate">
                          ဖန်တီးချိန် - {formatDate(item.createdAt)}
                        </span>
                      </div> */}
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
