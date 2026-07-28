import { useState } from "react";
import { Button, Tag, Typography, Modal } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Trash, Gift } from "lucide-react";
import CreateEditModel from "../model/create-edit";
import { useTicketController } from "../../hooks/useTicketController";

const { Text } = Typography;

function TicketCard({ item, draws, agents }) {
  const { handleDelete } = useTicketController();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWon = item?.status === "won";
  const isLost = item?.status === "lost";
  const isPending = item?.status === "pending";

  const borderColor = isWon
    ? "border-l-4 border-amber-500"
    : isPending
    ? "border-l-4 border-blue-500"
    : "border-l-4 border-slate-300";

  return (
    <>
      <div
        className={`
          ${borderColor}
          bg-white rounded-2xl border border-0 shadow-xs
        `}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Text className="text-[10px]! uppercase tracking-widest text-slate-400">
                ထီနံပါတ်
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
              {isPending ? "စောင့်ဆိုင်း" : isWon ? "ပေါက်" : "မပေါက်"}
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
          </div>

          <div className="my-3 border-t border-slate-100" />

          {/* Footer */}
          <div className="flex items-center justify-between gap-3">
            <div>
              {isWon ? (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <TrophyOutlined className="text-amber-500" />
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-slate-400">
                      ရရှိမည့်ဆု
                    </div>

                    <div className="font-bold text-[13px]! text-amber-600">
                      {(item?.totalReward || 0).toLocaleString()} THB
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[10px] uppercase text-slate-400">
                    အကြိမ်ရေ
                  </div>

                  <div className="font-semibold text-slate-700">
                    #{item?.DrawCategory?.drawNumber}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {isWon && (
                <Button
                  size="small"
                  type="text"
                  ghost
                  onClick={() => setIsModalOpen(true)}
                 
                  className="text-xs rounded-lg flex items-center"
                >
                 <div className=" flex items-center gap-2">
                 <EyeOutlined   className="text-blue-600!"/>
                 <span className=" text-xs text-blue-600"> ဆုများ ကြည့်ရန်</span>
                 </div>
                </Button>
              )}

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

      {/* Prize Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
            <Gift className="text-amber-500" size={20} />
            <span>ပေါက်မဲ ဆုအသေးစိတ်</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg"
          >
            ပိတ်မည်
          </Button>,
        ]}
        centered
        width={420}
      >
        <div className="py-3 space-y-4">
          {/* Summary Info */}
          <div className="bg-amber-50/60 p-3 rounded-xl flex justify-between items-center border border-amber-100">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                ထီနံပါတ်
              </span>
              <span className="text-lg font-bold text-amber-600 font-mono tracking-wider">
                {item?.number}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">
                စုစုပေါင်း ရရှိငွေ
              </span>
              <span className="text-base font-bold text-emerald-600">
                {(item?.totalReward || 0).toLocaleString()} THB
              </span>
            </div>
          </div>

          {/* Prize List Breakdown */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              ရရှိထားသော ဆုများ စာရင်း:
            </p>
            {item?.prizes && item.prizes.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {item.prizes.map((prize, idx) => (
                  <div
                    key={prize._id || idx}
                    className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                  >
                    <span className="text-xs font-medium text-slate-700">
                      {prize.prizeName}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      +{Number(prize.rewardAmount || 0).toLocaleString()} THB
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-xl">
                ဆုအသေးစိတ် စာရင်း မရှိပါ
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TicketCard;
