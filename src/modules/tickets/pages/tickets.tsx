import DataTable from "../components/table";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import { Button, Input, Select, Space } from "antd";
import { useTicketController } from "../hooks/useTicketController";
import CreateEditModel from "../components/model/create-edit";
import { Search } from "lucide-react";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import { useCustomerController } from "../../agent/hooks/useCustomerController";
import { useEffect } from "react";


function Tickets() {
  const {
    tickets,
    isLoading,
    totalItems,
    currentPage,
    perPage,
    setSearch,
    handlePageChange,
    selectedCategory,
    setSelectedCategory,
  } = useTicketController();

  const { drawCategories: draws } = useDrawCategoryController();
  const { doctors: customers } = useCustomerController();

  const latestDraw = draws?.drawCategories?.reduce((latest, current) => {
    if (!latest) return current;
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, null);

  const latestDrawId = latestDraw ? latestDraw.id || latestDraw._id : undefined;

  useEffect(() => {
    if (latestDrawId && !selectedCategory) {
      setSelectedCategory(latestDrawId);
    }
  }, [latestDrawId, selectedCategory, setSelectedCategory]);

  return (
    <Space direction="vertical" size={12} style={{ display: "flex" }}>
      <Breadcrumb />
      <Header />

      <div className="flex flex-col gap-3  mb-4  w-full md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-72">
          <Input
            size="large"
            className="text-sm"
            placeholder="ရှာဖွေရန်..."
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Search className="size-5 text-gray-400" />}
          />
        </div>

        {/* 2. Controls Group - Uses flex-col-reverse on mobile */}
        <div className="flex  gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end md:flex-1 md:gap-4">
          <div className="w-full sm:w-auto">
            <Select
              className="w-full sm:w-48"
              placeholder="အမျိုးအစားရွေးချယ်ရန်"
              showSearch={false}
              optionFilterProp="children"
              value={selectedCategory || undefined}
              onChange={(value) => setSelectedCategory(value)}
            >
              {draws?.drawCategories &&
                draws.drawCategories.map((cat) => (
                  <Select.Option
                    key={cat.id || cat._id}
                    value={cat.id || cat._id}
                  >
                    {new Date(cat.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Select.Option>
                ))}
            </Select>
          </div>

          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            <CreateEditModel
              categories={draws?.drawCategories}
              agents={customers?.agents}
              type="create"
            />
          </div>
        </div>
      </div>

      <DataTable
        data={Array.isArray(tickets) ? tickets : []}
        isLoading={isLoading}
        categories={draws?.drawCategories}
        agents={customers?.agents}
        pagination={{
          current: currentPage,
          pageSize: perPage,
          total: totalItems,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
    </Space>
  );
}

export default Tickets;
