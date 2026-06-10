import CardList from "../components/card_list";
import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Segmented, Space } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useUserController } from "../hooks/useUserController";
import CreateEditModel from "../components/model/create-edit";
function Users() {
  const {
    doctors,
    isLoading,
    totalItems,
    currentPage,
    perPage,
    viewMode,
    setViewMode,
    handlePageChange,
  } = useUserController();
  const options = [
    { value: "list", icon: <BarsOutlined className="text-lg" /> },
    { value: "grid", icon: <AppstoreOutlined className="text-lg" /> },
  ];

  return (
    <Space direction="vertical" size={16} style={{ display: "flex" }}>
      <Breadcrumb />
      <Header />
      <CardList />
      <div className=" flex justify-end items-center gap-4">
        <Segmented
          className="p-1  bg-gray-200 "
          size="large"
          onChange={(value) => setViewMode(value.toString() as "list" | "grid")}
          options={options}
        />
        <CreateEditModel type="create" />
      </div>
      {
        <DataTable
          data={doctors?.data || []}
          isLoading={isLoading}
          viewMode={viewMode}
          pagination={{
            current: currentPage,
            pageSize: perPage,
            total: totalItems,
            onChange: handlePageChange,
            showSizeChanger: true,
          }}
        />
      }
    </Space>
  );
}

export default Users;
