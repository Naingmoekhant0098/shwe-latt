import { Table, Button, Dropdown, List } from "antd";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import type { UserResponse, UserTableDataType } from "../../type";
import type { ColumnsType } from "antd/es/table";
import { renderOrDash } from "../../../../shared/helpers/checkTableValue";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import GridView from "../grid";
import { useUserController } from "../../hooks/useUserController";
import CreateEditModel from "../model/create-edit";

interface DataTableProps {
  data: UserResponse[];
  isLoading: boolean;
  pagination: any;
  viewMode: "list" | "grid";
}
function DataTable({ data, isLoading, pagination, }: DataTableProps) {
  const tableData: UserTableDataType[] = data.map((user) => ({
    key: user.id,
    id: user.id,
    name: user.name || "N/A",
    email: user.email || "N/A",
    role: user.roles[0] || "User",
    phone: user.phone || "-",
    is_active: user.isVerify,
  }));

  const { handleDelete, handleDetail, handleEdit } = useUserController();

  const columns: ColumnsType<UserTableDataType> = [
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
      render: (val) => (
        <span className="font-medium text-gray-900">{renderOrDash(val)}</span>
      ),
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
      render: (role) => (
        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs border">
          {role?.name || "User"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: 120,
      align: "center",
      render: (isActive) => (
        <div className="flex items-center justify-center">
          {isActive ? (
            <div className="text-green-600 flex items-center gap-1 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ACTIVE</span>
            </div>
          ) : (
            <div className="text-red-400 flex items-center gap-1 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>INACTIVE</span>
            </div>
          )}
        </div>
      ),
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
            label: <CreateEditModel record={record} type="edit" />,
            icon: <EditOutlined />,
            // onClick: () => handleEdit(record?.id),
          },
          {
            key: "settings",
            label: <span className=" text-sm">Permissions</span>,
            icon: <SettingOutlined />,
            onClick: () => console.log("Settings", record.id),
          },
          { type: "divider" as const },
          {
            key: "delete",
            label: <span className=" text-sm">Delete User</span>,
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => handleDelete(record),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="shadow-sm">
        <List
          loading={isLoading}
          dataSource={tableData}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          pagination={{
            ...pagination,
            align: "center",
          }}
          renderItem={(item) => (
            <List.Item>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {item.title || "Bet Item"}
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                    {item.status}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="text-sm text-gray-500 space-y-1">
                  <div>
                    Odds: <b>{item.odds}</b>
                  </div>
                  <div>Match: {item.matchName}</div>
                  <div>Time: {item.startTime}</div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex justify-between mt-3">
                  <button className="text-blue-600 text-xs">View</button>
                  <button className="text-red-500 text-xs">Delete</button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default DataTable;
