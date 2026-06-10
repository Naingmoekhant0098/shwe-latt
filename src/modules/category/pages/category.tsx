import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Space } from "antd";
import { useDrawCategoryController } from "../hooks/useCustomerController";
import CreateEditModel from "../components/model/create-edit";
 
function Category() {
  const {
    drawCategories,
    isLoading,
    totalItems,
    currentPage,
    perPage,
    
    handlePageChange,
  } = useDrawCategoryController();
  const breadCrumbData = [
    {
      title: "Dashboard",
      link : '/'
    },
    {
      title: "Category",
      link:'/categories'
    },
  ]
 

  return (
    <Space direction="vertical" size={16} style={{ display: "flex" }}>
      <Breadcrumb  breadCrumbData={breadCrumbData}/>
      <Header />

      <div className="flex justify-end items-center gap-4">
        {/* <div>
          <Input
            size="large"
            className=" text-xs"
            placeholder="Search....."
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Search className=" size-5" />}
          />
        </div> */}
        <div className=" flex items-center gap-3">
          {/* <DatePicker
            size="large"
            className="w-40"
            onChange={(date) =>
              setDate(date ? date.format("YYYY-MM-DD") : null)
            }
            placeholder="Select Date"
          />
          <Select
            size="large"
            className="w-40"
            placeholder="Select Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          /> */}
          <CreateEditModel type="create" />
        </div>
      </div>
      {
        <DataTable
          data={drawCategories?.drawCategories || []}
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

export default Category;
