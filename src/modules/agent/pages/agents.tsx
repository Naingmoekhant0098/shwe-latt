import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Space } from "antd";
import { useCustomerController } from "../hooks/useCustomerController";
import CreateEditModel from "../components/model/create-edit";

function Customers() {
  const {
    doctors,
    isLoading,
    totalItems,
    currentPage,
    perPage,
    setSearch,
    setDate,
    handlePageChange,
  } = useCustomerController();
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
  return (
    <Space direction="vertical" size={12} style={{ display: "flex" }}>
      <Breadcrumb breadCrumbData={breadCrumbData} />
      <Header />
      <div className="flex justify-end items-center gap-4 ">
        <div className=" flex items-center gap-3">
          <CreateEditModel type="create" />
        </div>
      </div>
      {
        <DataTable
          data={doctors?.agents || []}
          isLoading={isLoading}
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
export default Customers;
