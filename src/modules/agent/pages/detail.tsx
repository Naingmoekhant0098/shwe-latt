import { Button, Tag, Spin, Empty, Modal } from "antd";
import {
  ArrowLeft,
  Ticket,
  Clock,
  Trophy,
  XCircle,
  Coins,
  Calendar,
  Gift,
  Eye,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAgentDetail } from "../hooks/useQuaries";
import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import { useEffect, useState, useMemo } from "react";
import { useGetTicketByAgentId } from "../../tickets/hooks/useQuaries";

function AgentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cate, setCate] = useState(null);

  // Modal State for showing winning prizes
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { drawCategories: draws } = useDrawCategoryController();
  const { data: agent } = useGetAgentDetail(id);

  useEffect(() => {
    if (!cate && draws?.drawCategories?.length > 0) {
      const latestDrawId = String(
        draws.drawCategories[0].id || draws.drawCategories[0]._id
      );
      setCate(latestDrawId);
    }
  }, [draws]);

  const { data: ticketResponse, isLoading: ticketsLoading } =
    useGetTicketByAgentId(id, cate);
  const tickets = ticketResponse?.tickets || [];

  // Open modal for prize details
  const handleOpenPrizeModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Dynamic Statistics
  const stats = useMemo(() => {
    let pendingCount = 0;
    let winCount = 0;
    let loseCount = 0;
    let totalWinAmount = 0;

    tickets.forEach((t) => {
      const status = (t.status || "").toLowerCase();

      if (status === "won" || status === "win" || status === "winning") {
        winCount += 1;
        totalWinAmount += Number(t.totalReward || 0);
      } else if (status === "lost" || status === "lose") {
        loseCount += 1;
      } else {
        pendingCount += 1;
      }
    });

    return {
      total: tickets.length,
      pending: pendingCount,
      winning: winCount,
      losing: loseCount,
      totalWinAmount,
    };
  }, [tickets]);

  // Status Tag Helper
  const renderStatusTag = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "won" || s === "win" || s === "winning") {
      return <Tag color="success">ပေါက်သည် (Won)</Tag>;
    }
    if (s === "lost" || s === "lose") {
      return <Tag color="error">မပေါက်ပါ (Lost)</Tag>;
    }
    return <Tag color="warning">စောင့်ဆိုင်းဆဲ (Pending)</Tag>;
  };

  const sortedTickets = useMemo(() => {
    const rawTickets = ticketResponse?.tickets || [];
    return [...rawTickets].sort((a, b) => {
      const isWonA = ["won", "win", "winning"].includes(
        (a.status || "").toLowerCase()
      );
      const isWonB = ["won", "win", "winning"].includes(
        (b.status || "").toLowerCase()
      );

      if (isWonA && !isWonB) return -1; // Move winning ticket up
      if (!isWonA && isWonB) return 1; // Move winning ticket up
      return 0;
    });
  }, [ticketResponse]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center border-slate-200"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {agent?.name
              ? `${agent.name} အသေးစိတ် အချက်အလက်`
              : "အေးဂျင့် အသေးစိတ်"}
          </h2>
          {agent?.phone && (
            <p className="text-xs text-slate-500">{agent.phone}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {draws?.drawCategories?.map((cat) => {
          const value = String(cat.id || cat._id);
          const active = cate === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setCate(value)}
              className={`shrink-0 rounded-xl border px-4 py-2.5 transition-all ${
                active
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <div className="text-sm">
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Ticket size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">
              စုစုပေါင်း ထီလက်မှတ်
            </p>
            <p className="text-lg font-bold text-slate-800">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">စောင့်ဆိုင်းဆဲ</p>
            <p className="text-lg font-bold text-amber-600">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ပေါက်မဲ</p>
            <p className="text-lg font-bold text-emerald-600">
              {stats.winning}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">မပေါက်မဲ</p>
            <p className="text-lg font-bold text-rose-600">{stats.losing}</p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Coins size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">
              စုစုပေါင်း အနိုင်ရငွေ
            </p>
            <p className="text-lg font-bold text-purple-600">
              {stats.totalWinAmount.toLocaleString()} TBH
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-slate-800">
          ထီလက်မှတ်များ စာရင်း
        </h3>

        {ticketsLoading ? (
          <div className="flex justify-center py-12 bg-white rounded-2xl border border-slate-100">
            <Spin size="large" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-12">
            <Empty description="ထီလက်မှတ် မရှိပါ" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedTickets.map((ticket) => {
              const isWon = ["won", "win", "winning"].includes(
                (ticket.status || "").toLowerCase()
              );

              return (
                <div
                  key={ticket._id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">
                        ထီနံပါတ်
                      </span>
                      <span className="text-lg font-bold text-slate-800 tracking-wider">
                        {ticket.number || "---"}
                      </span>
                    </div>
                    {renderStatusTag(ticket.status)}
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    {ticket.createdAt && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={13} className="flex-shrink-0" />
                        <span>
                          {new Date(ticket.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-1 pt-2.5 border-t border-slate-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">
                        ရရှိငွေ ပမာဏ
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          ticket.totalReward > 0
                            ? "text-emerald-600"
                            : "text-slate-700"
                        }`}
                      >
                        {(ticket.totalReward || 0).toLocaleString()} TBH
                      </span>
                    </div>

                    {isWon && (
                      <Button
                        type="text"
                        ghost
                        size="small"
                        onClick={() => handleOpenPrizeModal(ticket)}
                        icon={<Eye className=" text-primary!" size={13} />}
                        className="flex items-center gap-1 text-xs rounded-lg"
                      >
                        <span className=" text-xs text-primary">
                          {" "}
                          ဆုများ ကြည့်ရန်
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
            <Gift className="text-purple-600" size={20} />
            <span>ပေါက်မဲ ဆုအသေးစိတ်</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={handleCloseModal}
            className="rounded-lg"
          >
            ပိတ်မည်
          </Button>,
        ]}
        centered
        width={450}
      >
        {selectedTicket && (
          <div className="py-3 space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  ထီနံပါတ်
                </span>
                <span className="text-base font-bold text-slate-800 tracking-wider">
                  {selectedTicket.number}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">
                  စုစုပေါင်း ရရှိငွေ
                </span>
                <span className="text-base font-bold text-emerald-600">
                  {(selectedTicket.totalReward || 0).toLocaleString()} TBH
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">
                ရရှိထားသော ဆုများ စာရင်း:
              </p>
              {selectedTicket.prizes && selectedTicket.prizes.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedTicket.prizes.map((prize, idx) => (
                    <div
                      key={prize._id || idx}
                      className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-white shadow-2xs"
                    >
                      <div className=" flex flex-col">
                        <span className="text-xs font-medium text-slate-700">
                          {prize.prizeNameMM}
                        </span>
                        <span className=" text-xs mt-1 text-slate-400">
                          {" "}
                          {prize.prizeName}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">
                        +{Number(prize.rewardAmount || 0).toLocaleString()} TBH
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                  ဆုအသေးစိတ် မရှိပါ
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AgentDetail;
