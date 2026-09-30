// import { useSearchParams } from "react-router-dom";
// import { Empty, Select, Spin } from "antd";
// import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
// import TicketCard from "../components/card";
// import { useGetCheckWinner } from "../hooks/useQuaries";
// import { useEffect, useState } from "react";
// import { useGetUsers } from "../../agent/hooks/useQuaries";

// function SeeWinner() {
//   const { drawCategories: draws } = useDrawCategoryController();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { data: agentResponse } = useGetUsers();
  
//   const [selectedAgentId, setSelectedAgentId] = useState<string>("");
//   const cate = searchParams.get("drawId") || "";

//   const activeAgentId = selectedAgentId && selectedAgentId.trim() !== "" ? selectedAgentId : undefined;

//   const {
//     data: showWinnerResults,
//     isLoading: showWinnerLoading,
//     error,
//   } = useGetCheckWinner(cate, activeAgentId);

//   const winnerTickets =
//     showWinnerResults?.data?.winnerTickets ||
//     showWinnerResults?.winnerTickets ||
//     [];

//   const setCate = (value: string) => {
//     setSearchParams({ drawId: value });
//   };

//   const isEmpty = winnerTickets.length === 0;
//   const emptyMessage = showWinnerResults?.message || "အနိုင်ရရှိသူမရှိပါ";

//   useEffect(() => {
//     if (!cate && draws?.drawCategories?.length > 0) {
//       const latestDrawId = String(
//         draws.drawCategories[0].id || draws.drawCategories[0]._id
//       );
//       setSearchParams({ drawId: latestDrawId });
//     }
//   }, [draws, cate, setSearchParams]);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div className="mb-3">
//           <h2 className="text-lg font-semibold text-slate-800">
//             အနိုင်ရသူ ကြည့်ရန်
//           </h2>
//           <div className="text-sm text-slate-500">
//             ရက်စွဲရွေးချယ်ပြီး အနိုင်ရရှိသူများကို ကြည့်ရှုနိုင်ပါသည်
//           </div>
//         </div>

//         <div>
//           <div className="w-full sm:w-56 flex items-center gap-2">
//             <Select
//               showSearch
//               className="w-full sm:w-56"
//               size="large"
//               placeholder="အေးဂျင့် ရွေးပါ"
//               value={selectedAgentId || undefined}
//               allowClear
//               filterOption={(input, option) =>
//                 (option?.label ?? "")
//                   .toLowerCase()
//                   .includes(input.toLowerCase())
//               }
//               onChange={(value) => {
//                 setSelectedAgentId(value || "");
//               }}
//               options={agentResponse?.agents?.map((agent: any) => ({
//                 value: String(agent.id ?? agent._id),
//                 label: agent.name,
//               }))}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6">
//         {draws?.drawCategories?.map((cat: any) => {
//           const value = String(cat.id || cat._id);
//           const active = cate === value;

//           return (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setCate(value)}
//               className={`shrink-0 rounded-xl border px-4 py-3 transition-all ${
//                 active
//                   ? "border-primary bg-primary/10"
//                   : "border-slate-300 bg-white hover:border-primary/50"
//               }`}
//             >
//               <div
//                 className={`text-sm font-medium ${
//                   active ? "text-primary" : "text-slate-700"
//                 }`}
//               >
//                 {new Date(cat.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Results */}
//       {showWinnerLoading ? (
//         <div className="flex justify-center items-center py-24">
//           <Spin size="large" />
//         </div>
//       ) : error ? (
//         <div className="py-20 text-center text-red-500">
//           {(error as any)?.response?.data?.message ||
//             (error as any)?.message ||
//             "တစ်ခုခုမှားယွင်းနေပါသည်"}
//         </div>
//       ) : isEmpty ? (
//         <div className="py-20 text-center">
//           <Empty description={false} />
//           <div className="mt-3 text-gray-500">{emptyMessage}</div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           {winnerTickets.map((item: any, index: number) => (
//             <TicketCard key={item.id || item._id || index} item={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SeeWinner;



import { useSearchParams } from "react-router-dom";
import { Button, Empty, Input, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import TicketCard from "../components/card";
import { useGetCheckWinner } from "../hooks/useQuaries";
import { useEffect, useMemo, useState } from "react";
import { useGetUsers } from "../../agent/hooks/useQuaries";

/* ---------- Number search helpers (front-end only) ---------- */

// Ticket-number field names to look at, in order. Adjust if your API differs.
const NUMBER_KEYS = ["number", "ticketNumber", "ticket_number", "ticketNo", "no"];

// Let people type Myanmar digits (၀-၉) and still match Latin digits (0-9)
const toLatinDigits = (s: string) =>
  s.replace(/[၀-၉]/g, (d) => String("၀၁၂၃၄၅၆၇၈၉".indexOf(d)));

const normalize = (v: unknown) => toLatinDigits(String(v ?? "")).replace(/\s+/g, "");

/** Values of a ticket that should be searchable by number */
const numbersOf = (item: any): string[] => {
  const found = NUMBER_KEYS.map((k) => item?.[k] ?? item?.ticket?.[k])
    .filter((v) => v !== undefined && v !== null)
    .map(normalize);
  if (found.length) return found;

  // Fallback: no known number field, so search plain top-level values (skip ids)
  return Object.entries(item ?? {})
    .filter(([k, v]) => !/id$/i.test(k) && (typeof v === "string" || typeof v === "number"))
    .map(([, v]) => normalize(v));
};

function SeeWinner() {
  const { drawCategories: draws } = useDrawCategoryController();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: agentResponse } = useGetUsers();

  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [numberQuery, setNumberQuery] = useState("");
  const cate = searchParams.get("drawId") || "";

  const activeAgentId =
    selectedAgentId && selectedAgentId.trim() !== "" ? selectedAgentId : undefined;

  const {
    data: showWinnerResults,
    isLoading: showWinnerLoading,
    error,
  } = useGetCheckWinner(cate, activeAgentId);

  const winnerTickets: any[] =
    showWinnerResults?.data?.winnerTickets ||
    showWinnerResults?.winnerTickets ||
    [];

  // Filter in the browser only; nothing extra is sent to the backend
  const query = normalize(numberQuery);
  const visibleTickets = useMemo(
    () =>
      query
        ? winnerTickets.filter((t) => numbersOf(t).some((n) => n.includes(query)))
        : winnerTickets,
    [winnerTickets, query],
  );

  const setCate = (value: string) => {
    setSearchParams({ drawId: value });
  };

  const isEmpty = winnerTickets.length === 0;
  const noMatch = !isEmpty && visibleTickets.length === 0;
  const emptyMessage = showWinnerResults?.message || "အနိုင်ရရှိသူမရှိပါ";

  useEffect(() => {
    if (!cate && draws?.drawCategories?.length > 0) {
      const latestDrawId = String(
        draws.drawCategories[0].id || draws.drawCategories[0]._id,
      );
      setSearchParams({ drawId: latestDrawId });
    }
  }, [draws, cate, setSearchParams]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            အနိုင်ရသူ ကြည့်ရန်
          </h2>
          <div className="text-sm text-slate-500">
            ရက်စွဲရွေးချယ်ပြီး အနိုင်ရရှိသူများကို ကြည့်ရှုနိုင်ပါသည်
          </div>
        </div>

        {/* Number search (left) + agent picker (right) */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Input
            size="large"
            allowClear
            inputMode="numeric"
            className="sm:w-56"
            placeholder="ဂဏန်းဖြင့် ရှာရန်"
            aria-label="Search winners by number"
            prefix={<SearchOutlined className="text-slate-400" />}
            value={numberQuery}
            onChange={(e) => setNumberQuery(e.target.value)}
          />

          <Select
            showSearch
            className="w-full sm:w-56"
            size="large"
            placeholder="အေးဂျင့် ရွေးပါ"
            value={selectedAgentId || undefined}
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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

      <div className="scrollbar-hide mt-6 flex gap-2 overflow-x-auto pb-2">
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

      {/* Result count while searching */}
      {query && !showWinnerLoading && !error && !isEmpty && (
        <p className="m-0 text-sm text-slate-500 tabular-nums">
          {visibleTickets.length} / {winnerTickets.length}
        </p>
      )}

      {/* Results */}
      {showWinnerLoading ? (
        <div className="flex items-center justify-center py-24">
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
      ) : noMatch ? (
        <div className="py-20 text-center">
          <Empty description={false} />
          <div className="mt-3 text-gray-500">
            “{numberQuery.trim()}” နှင့်ကိုက်ညီသော ဂဏန်း မတွေ့ပါ
          </div>
          <Button className="mt-4" onClick={() => setNumberQuery("")}>
            ရှာဖွေမှု ဖျက်ရန်
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {visibleTickets.map((item: any, index: number) => (
            <TicketCard key={item.id || item._id || index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SeeWinner;
