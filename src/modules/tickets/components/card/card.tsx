import { Button, Tag, Typography } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Trash } from "lucide-react";
import CreateEditModel from "../model/create-edit";
import { useTicketController } from "../../hooks/useTicketController";

const { Text } = Typography;

function TicketCard({ item, draws, agents }) {
  const { handleDelete } = useTicketController();

  const isWon = item?.status === "won";
  const isLost = item?.status === "lost";
  const isPending = item?.status === "pending";

  const borderColor = isWon
    ? "border-l-4 border-amber-500"
    : isPending
    ? "border-l-4 border-blue-500"
    : "border-l-4 border-slate-300";

  return (
    <div
      className={`
        ${borderColor}
        bg-white rounded-2xl border border-0  
      `}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Text className="text-[10px]! uppercase tracking-widest text-slate-400">
              Lottery Number
            </Text>

            <div
              className={`
                font-mono font-bold
                text-2xl md:text-3xl
                tracking-[4px]
                leading-none mt-1
                ${
                  isWon
                    ? "text-amber-500"
                    : isLost
                    ? "text-slate-500"
                    : "text-blue-600"
                }
              `}
            >
              {item?.number}
            </div>
          </div>

          <Tag
            color={isPending ? "processing" : isWon ? "gold" : "default"}
            className="rounded-full px-3 py-0.5 m-0 font-medium"
          >
            {isPending
              ? "စောင့်ဆိုင်း"
              : isWon
              ? "ပေါက်"
              : "မပေါက်"}
          </Tag>
        </div>

        {/* Info */}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <UserOutlined />
            <span>{item?.Agent?.name || "-"}</span>
          </div>

          <div className="flex items-center gap-1">
            <CalendarOutlined />
            <span>
              {item?.DrawCategory?.date
                ? new Date(item.DrawCategory.date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "-"}
            </span>
          </div>

          <div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium">
              #{item?.DrawCategory?.drawNumber}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-slate-100" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          {/* Reward Section */}
          <div>
            {isWon ? (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <TrophyOutlined className="text-amber-500" />
                </div>

                <div>
                  <div className="text-[10px] uppercase text-slate-400">
                    Reward
                  </div>

                  <div className="font-bold text-amber-600">
                    {item?.totalReward?.toLocaleString()} THB
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] uppercase text-slate-400">
                  Draw Round
                </div>

                <div className="font-semibold text-slate-700">
                  #{item?.DrawCategory?.drawNumber}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <CreateEditModel
              categories={draws}
              agents={agents}
              record={item}
              type="edit"
            />

            <Button
              danger
              size="small"
              type="text"
              onClick={() => handleDelete(item)}
              className="flex items-center justify-center"
              icon={<Trash size={14} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;