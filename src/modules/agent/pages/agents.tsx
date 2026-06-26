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
     

      <div className=" flex md:items-center justify-between">
        <div>
          <div className="font-semibold text-lg md:text-xl">အေးဂျင့်များ</div>
          <p className="text-sm text-gray-400 mt-1!">
          စနစ်အတွင်းရှိ အေးဂျင့်များစာရင်းကို ကြည့်ရှုနိုင်ပါသည်
          </p>
        </div>
        <CreateEditModel type="create" />
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
