import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Input, Space } from "antd";
import { useDrawCategoryController } from "../hooks/useCustomerController";
import CreateEditModel from "../components/model/create-edit";
import { Search } from "lucide-react";

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
      link: "/",
    },
    {
      title: "Category",
      link: "/categories",
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ display: "flex" }}>
      <Breadcrumb breadCrumbData={breadCrumbData} />
    
      <div className=" flex md:items-center justify-between">
        <div>
          <div className="font-semibold text-lg md:text-xl"> ထီထွက်ရက်များ</div>
          <p className="text-sm text-gray-400 mt-1!">
            နောက်လာမည့် ထီရက်စွဲများ
          </p>
        </div>
        <CreateEditModel type="create" />
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
