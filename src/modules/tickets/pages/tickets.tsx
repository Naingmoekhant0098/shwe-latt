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
       <div className=" flex md:items-center justify-between">
       <div >
        <div className="font-semibold text-lg md:text-xl">ထီမဲနံပါတ်များ</div>
        <p className="text-sm text-gray-400 mt-1!">
          ရက်စွဲအလိုက် ထီမဲရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်
        </p>
      </div>
        <CreateEditModel
          categories={draws?.drawCategories}
          agents={customers?.agents}
          type="create"
        />
       </div>
      <div className="flex gap-2 overflow-x-auto  scrollbar-hide mt-0 md:mt-4">
        {draws?.drawCategories?.map((cat: any) => {
          const value = String(cat.id || cat._id);
          const active = selectedCategory === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedCategory(value)}
              className={`shrink-0 rounded-xl border px-4 py-3 transition-all ${
                active
                  ? "border-primary bg-primary/10"
                  : "border-slate-300 bg-white hover:border-primary/50"
              }`}
            >
              <div
                className={`text-sm font-medium ${
                  active ? "text-primary" : "text-slate-700"
                }`}
              >
                {new Date(cat.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </button>
          );
        })}
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
