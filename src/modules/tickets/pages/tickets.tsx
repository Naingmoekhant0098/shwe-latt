import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../components/table";
import Breadcrumb from "../components/breadcrumb";
import CreateEditModel from "../components/model/create-edit";
import { useTicketController } from "../hooks/useTicketController";
import { useBarcodeScanner } from "../../../hooks/useBarcodeScanner";

import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import { useGetUsers } from "../../agent/hooks/useQuaries";

function Tickets() {
  const {
    tickets,
    isLoading,
    totalItems,
    currentPage,
    perPage,
    setCurrentPage,
    handlePageChange,
    selectedCategory,
    setSelectedCategory,
  } = useTicketController();

  const { drawCategories: draws } = useDrawCategoryController();
  const { data: agents } = useGetUsers({});
  const navigate = useNavigate();

  // ---- Barcode scanner -> open modal + fill number ----
  const [modalOpen, setModalOpen] = useState(false);
  const [scan, setScan] = useState({ code: "", id: 0 });

  useBarcodeScanner(
    (code) => {
      setScan({ code, id: Date.now() }); // new id every scan, even the same number
      setModalOpen(true);
    },
    {
      minLength: 3, // set to your real barcode length
      ignoreInputs: !modalOpen, // allow scans while the modal's inputs are focused
    }
  );

  // ---- Select latest draw by default ----
  const latestDraw = draws?.drawCategories?.reduce(
    (latest: any, current: any) => {
      if (!latest) return current;
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    },
    null
  );

  const latestDrawId = latestDraw ? latestDraw.id || latestDraw._id : undefined;

  useEffect(() => {
    if (latestDrawId && !selectedCategory) {
      setSelectedCategory(latestDrawId);
    }
  }, [latestDrawId, selectedCategory, setSelectedCategory]);

  return (
    <Space direction="vertical" size={12} style={{ display: "flex" }}>
      <Breadcrumb />
      <div className="flex md:items-center justify-between">
        <div>
          <div className="font-semibold text-lg md:text-xl">ထီမဲနံပါတ်များ</div>
          <p className="text-sm text-gray-400 mt-1!">
            ရက်စွဲအလိုက် ထီမဲရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            color="gold"
            variant="outlined"
            onClick={() => navigate("/move-tickets")}
            icon={<Ticket size={14} />}
          >
            <span>ထီရွှေ့ရန်</span>
          </Button>

          <CreateEditModel
            categories={draws?.drawCategories}
            agents={agents?.agents}
            type="create"
            open={modalOpen}
            onOpenChange={(v: boolean) => {
              setModalOpen(v);
              if (!v) setScan({ code: "", id: 0 });
            }}
            initialNumber={scan.code}
            scanId={scan.id}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-0 md:mt-4">
        {draws?.drawCategories?.map((cat: any) => {
          const value = String(cat.id || cat._id);
          const active = selectedCategory === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setCurrentPage(1);
                setSelectedCategory(value);
              }}
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
        agents={agents?.agents}
        pagination={{
          current: currentPage,
          pageSize: perPage,
          total: totalItems,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
      />
    </Space>
  );
}

export default Tickets;