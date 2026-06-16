import { data, useSearchParams } from "react-router-dom";
import { Empty, Spin } from "antd";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";

import TicketCard from "../components/card";
import { useGetWinners } from "../hooks/useQuaries";

function CheckWinner() {
  const { drawCategories: draws } = useDrawCategoryController();

  const [searchParams, setSearchParams] = useSearchParams();

  const cate = searchParams.get("drawId") || "";

  const {
    data: showWinnerResults,
    isLoading: showWinnerLoading,
    error,
  } = useGetWinners(cate);

  const setCate = (value: string) => {
    setSearchParams({ drawId: value });
  };

  const isEmpty =
    !showWinnerResults?.tickets || showWinnerResults?.tickets.length === 0;

  const emptyMessage = showWinnerResults?.message || "အနိုင်ရရှိသူမရှိပါ";

  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          အနိုင်ရသူ ကြည့်ရန်
        </h2>

        <div className="text-sm text-slate-500">
          {showWinnerResults?.tickets?.length > 0
            ? `${new Date(
                showWinnerResults.tickets[0].DrawCategory.date
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })} တွင်ထွက်ရှိသော ထီပေါက်သူစာရင်း`
            : "ထီနံပါတ်ထည့်ပြီး အနိုင်ရရှိမှုကို စစ်ဆေးပါ"}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6">
        {draws?.drawCategories?.map((cat: any) => {
          const value = String(cat.id || cat._id);
          const active = cate === value;

          return (
            <div
              key={value}
              onClick={() => setCate(value)}
              className={`
                shrink-0 cursor-pointer rounded-xl border px-4 py-3 transition-all
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

      {showWinnerLoading ? (
        <div className="flex justify-center items-center py-30">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="mt-4 py-20 text-center text-red-500">
          {error?.response?.data?.message ||
            error?.message ||
            "တစ်ခုခုမှားယွင်းနေပါသည်"}
        </div>
      ) : isEmpty ? (
        <div className="mt-4 py-20 text-center">
          <Empty />

          <div className="text-gray-500 mt-2">{emptyMessage}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {showWinnerResults.tickets.map((item: any, index: number) => (
            <TicketCard key={item.id || index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CheckWinner;
