import { useEffect, useState } from "react";
import {
  EyeOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import { useSearchParams } from "react-router-dom";

import { useResultController } from "../hooks/useTicketController";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import TicketCard from "../components/card";

function SeeWinner() {
  const { drawCategories: draws } = useDrawCategoryController();

  const {
    checkResults,
    checkLoading,
    setSelectedWinnerCategory,
    checkingError,
  } = useResultController();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cate, setCate] = useState<string | undefined>();
  useEffect(() => {
    const urlCate = searchParams.get("cate") || undefined;
    setCate(urlCate);
  }, [searchParams]);


  console.log(checkResults)

  const handleCheck = () => {
    if (!cate) return;
    setSearchParams({ cate });
    setSelectedWinnerCategory(cate);
  };

  const hasChecked = !!checkResults || !!checkingError;

  return (
    <div className="max-w-4xl mx-auto px-0 py-6 pt-0 space-y-6">
      <div className="bg-white rounded-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Winner Check</h2>
          <p className="text-sm text-slate-500">Select draw and check result</p>
        </div>

        {/* SELECT */}
        <div className="mb-5">
          <label className="text-xs text-slate-500">Draw Category</label>

          <Select
            className="w-full mt-1"
            size="large"
            placeholder="Select draw"
            value={cate}
            onChange={(val) => setCate(val)}
            options={(draws?.drawCategories || []).map((cat: any) => ({
              value: String(cat.id ?? cat._id),
              label: cat.date
                ? new Date(cat.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unknown date",
            }))}
          />
        </div>

        {/* BUTTON */}
        <Button
          type="primary"
          icon={<EyeOutlined />}
          className="w-full h-11 rounded-xl"
          disabled={!cate || checkLoading}
          onClick={handleCheck}
        >
          Check Winner
        </Button>

        {/* STATUS AREA */}
        <div className="mt-8 flex flex-col items-center justify-center">
          {/* LOADING */}
          {checkLoading && (
            <div className="text-center py-6">
              <LoadingOutlined style={{ fontSize: 40 }} spin />
              <p className="mt-3 text-slate-500">Checking results...</p>
            </div>
          )}

          {/* SUCCESS */}
          {!checkLoading && checkResults?.status === 200 && (
            <div className="w-full text-center bg-blue-50 border border-blue-200 rounded-xl p-5">
              <CheckCircleFilled style={{ fontSize: 48, color: "#3b82f6" }} />

              <h3 className="mt-2 text-blue-700 font-semibold">
                Check Completed
              </h3>

              <p className="text-sm text-blue-600">
                Results loaded successfully
              </p>
            </div>
          )}

          
          {!checkLoading && hasChecked && checkResults?.status !== 200 && (
            <div className="w-full text-center bg-red-50 border border-red-200 rounded-xl p-5">
              <CloseCircleFilled style={{ fontSize: 48, color: "#ef4444" }} />

              <h3 className="mt-2 text-red-600 font-semibold">
                No Results Found
              </h3>

              <p className="text-sm text-red-500">
                {checkingError?.response?.data?.message ||
                  checkingError?.message ||
                  "Something went wrong"}
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!checkLoading && !hasChecked && (
            <div className="text-center text-slate-400 py-6">
              Select a draw and check to see winners
            </div>
          )}
        </div>
      </div>

      {/* WINNER LIST */}
      {checkResults?.data?.winnerTickets?.length > 0 && (
        <div className="px-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Winner Tickets
            </h3>

            <span className="text-sm text-slate-500">
              {checkResults.data.winnerTickets.length} winners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {checkResults.data.winnerTickets.map((item, index) => (
              <div
                key={index}
                className="hover:scale-[1.02] transition-transform"
              >
                <TicketCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeeWinner;
