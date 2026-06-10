import { Card, Segmented } from "antd";
import { useSearchParams } from "react-router-dom";
import ResultTab from "../components/result_tab";
import CheckWinner from "../components/check_winner";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "result";

  const setTab = (value) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-screen">
      <div className="mb-4! sm:mb-6!">
        <div className="font-semibold text-lg md:text-xl">ဒက်ရှ်ဘုတ်</div>

        <p className="text-xs sm:text-sm mt-1! text-slate-400">
          ရလဒ်များကို စီမံခန့်ခွဲပြီး အနိုင်ရသူများကို စစ်ဆေးပါ
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <Segmented
          block
          size="large"
          value={tab}
          className="segmented-small"
          onChange={(value) => setTab(value)}
          options={[
            { label: "ရလဒ်", value: "result" },
            { label: "အနိုင်ရသူ စစ်ဆေးရန်", value: "winner" },
          ]}
        />
      </div>

      <div className="rounded-2xl border border-slate-100">
        {tab === "result" && <ResultTab />}
        {tab === "winner" && <CheckWinner />}
      </div>
    </div>
  );
}

export default Dashboard;
