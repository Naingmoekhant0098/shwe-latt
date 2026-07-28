import { useSearchParams } from "react-router-dom";
import { Empty, Select, Spin } from "antd";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import TicketCard from "../components/card";
import { useGetCheckWinner } from "../hooks/useQuaries";
import { useEffect, useState } from "react";
import { useGetUsers } from "../../agent/hooks/useQuaries";

function SeeWinner() {
  const { drawCategories: draws } = useDrawCategoryController();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: agentResponse } = useGetUsers();
  
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const cate = searchParams.get("drawId") || "";

  const activeAgentId = selectedAgentId && selectedAgentId.trim() !== "" ? selectedAgentId : undefined;

  const {
    data: showWinnerResults,
    isLoading: showWinnerLoading,
    error,
  } = useGetCheckWinner(cate, activeAgentId);

  const winnerTickets =
    showWinnerResults?.data?.winnerTickets ||
    showWinnerResults?.winnerTickets ||
    [];

  const setCate = (value: string) => {
    setSearchParams({ drawId: value });
  };

  const isEmpty = winnerTickets.length === 0;
  const emptyMessage = showWinnerResults?.message || "အနိုင်ရရှိသူမရှိပါ";

  useEffect(() => {
    if (!cate && draws?.drawCategories?.length > 0) {
      const latestDrawId = String(
        draws.drawCategories[0].id || draws.drawCategories[0]._id
      );
      setSearchParams({ drawId: latestDrawId });
    }
  }, [draws, cate, setSearchParams]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            အနိုင်ရသူ ကြည့်ရန်
          </h2>
          <div className="text-sm text-slate-500">
            ရက်စွဲရွေးချယ်ပြီး အနိုင်ရရှိသူများကို ကြည့်ရှုနိုင်ပါသည်
          </div>
        </div>

        <div>
          <div className="w-full sm:w-56 flex items-center gap-2">
            <Select
              showSearch
              className="w-full sm:w-56"
              size="large"
              placeholder="အေးဂျင့် ရွေးပါ"
              value={selectedAgentId || undefined}
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                setSelectedAgentId(value || "");
              }}
              options={agentResponse?.agents?.map((agent: any) => ({
                value: String(agent.id ?? agent._id),
                label: agent.name,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Draw Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6">
        {draws?.drawCategories?.map((cat: any) => {
          const value = String(cat.id || cat._id);
          const active = cate === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setCate(value)}
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

      {/* Results */}
      {showWinnerLoading ? (
        <div className="flex justify-center items-center py-24">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          {(error as any)?.response?.data?.message ||
            (error as any)?.message ||
            "တစ်ခုခုမှားယွင်းနေပါသည်"}
        </div>
      ) : isEmpty ? (
        <div className="py-20 text-center">
          <Empty description={false} />
          <div className="mt-3 text-gray-500">{emptyMessage}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {winnerTickets.map((item: any, index: number) => (
            <TicketCard key={item.id || item._id || index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SeeWinner;