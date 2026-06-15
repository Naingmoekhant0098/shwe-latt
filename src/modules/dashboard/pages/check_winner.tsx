import { useEffect, useState } from "react";

import { useResultController } from "../hooks/useTicketController";
import TicketCard from "../components/card";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
function CheckWinner() {
  const { drawCategories: draws } = useDrawCategoryController();
  const { checkResults, checkLoading, setSelectedWinnerCategory } =
    useResultController();
  const [searchParams, setSearchParams] = useSearchParams();
  const cate = searchParams.get("cate") || undefined;
  const setCate = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("cate", value);
      return params;
    });
  };
  useEffect(() => {
    setSelectedWinnerCategory(cate);
  }, [cate]);
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          အနိုင်ရသူ စစ်ဆေးရန်
        </h2>

        <div className="text-sm text-slate-500">
          {checkResults?.tickets?.length > 0
            ? `${new Date(
                checkResults.tickets[0].DrawCategory.date
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })} တွင်ထွက်ရှိသော ထီပေါက်သူစာရင်း`
            : "ထီနံပါတ်ထည့်ပြီး အနိုင်ရရှိမှုကို စစ်ဆေးပါ"}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6!">
        {draws?.drawCategories?.map((cat) => {
          const value = cat.id || cat._id;
          const active = cate === value;
          return (
            <div
              key={value}
              onClick={() => setCate(value)}
              className={`
          shrink-0
          cursor-pointer
          rounded-xl
          border
          px-4
          py-3
          transition-all
          ${
            active
              ? "border-primary bg-primary/15"
              : "border-slate-300 bg-white"
          }
        `}
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
            </div>
          );
        })}
      </div>

      {checkLoading ? (
        <div className="flex justify-center items-center py-30">
          <div className=" text-center flex flex-col items-center gap-3">
            <Spin size="large" />
            <div>ရှာဖွေနေပါသည်</div>
          </div>
        </div>
      ) : checkResults?.tickets?.length ? (
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
          {checkResults.tickets.map((item, index) => (
            <TicketCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">
          အနိုင်ရရှိသူမရှိပါ
        </div>
      )}
    </div>
  );
}

export default CheckWinner;
