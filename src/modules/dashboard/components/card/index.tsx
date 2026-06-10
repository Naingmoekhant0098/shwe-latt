import { Tag } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TicketCard({ item }) {
  const navigate = useNavigate();
  const isWon = item?.status === "won";
  const isLost = item?.status === "lost";
  const isPending = item?.status === "pending";

  return (
    <div
      onClick={() =>
        navigate("/detail", {
          state: { ticket: item },
        })
      }
      className="group overflow-hidden rounded-2xl  border-slate-200 bg-white  hover:shadow-lg transition-all duration-300"
    >
      <div className="flex min-h-[110px]">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400">
                Lottery Number
              </div>

              <div
                className={`font-mono font-bold tracking-[4px] text-2xl md:text-3xl leading-none mt-1 ${
                  isWon
                    ? "text-amber-500"
                    : isLost
                    ? "text-slate-500"
                    : "text-red-600"
                }`}
              >
                {item?.number}
              </div>
            </div>

            <Tag
              color={isPending ? "processing" : isWon ? "gold" : "default"}
              className="rounded-full px-3"
            >
              {isPending ? "စောင့်ဆိုင်းဆဲ" : isWon ? "ဆုမဲပေါက်" : "မပေါက်"}
            </Tag>
          </div>
          <div className="mt-3 grid grid-cols-2  gap-3">
            <div>
              <div className="text-[10px] text-slate-400">
                <UserOutlined /> Agent
              </div>

              <div className="font-medium text-sm truncate">
                {item?.Agent?.name || "-"}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400">
                <CalendarOutlined /> Draw Date
              </div>

              <div className="font-medium text-sm">
                {item?.DrawCategory?.date
                  ? new Date(item.DrawCategory.date).toLocaleDateString("en-GB")
                  : "-"}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400">Draw Round</div>

              <div className="font-semibold text-sm">
                #{item?.DrawCategory?.drawNumber}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400">Serial</div>

              <div className="font-mono text-sm">
                TH-{item?._id.slice(0, 10)}..
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-4 flex items-center justify-center">
          <div className="absolute -top-3 w-6 h-6 rounded-full bg-slate-50 border border-slate-200" />
          <div className="h-full border-l-2 border-dashed border-slate-200" />
          <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-slate-50 border border-slate-200" />
        </div>
        <div
          className={`w-28 flex flex-col justify-center items-center text-center p-3 ${
            isWon
              ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white"
              : isLost
              ? "bg-slate-100 text-slate-500"
              : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          }`}
        >
          {isWon ? (
            <>
              <TrophyOutlined className="text-2xl mb-1" />

              <div className="text-[10px] uppercase tracking-wider">Winner</div>

              <div className="font-bold text-sm mt-1">
                {item?.totalReward?.toLocaleString()}
              </div>

              <div className="text-[10px] opacity-90">THB</div>
            </>
          ) : (
            <>
              <Ticket size={20} />

              <div className="text-lg font-bold mt-1">
                #{item?.DrawCategory?.drawNumber}
              </div>

              <div className="text-[10px] uppercase opacity-90">Draw</div>

              {isPending && (
                <div className="mt-2 text-[10px] px-2 py-1 rounded-full bg-white/20">
                  Waiting
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
