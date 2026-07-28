import {
    Button,
    Card,
    Checkbox,
    Empty,
    Input,
    Select,
    Spin,
    Tag,
    message,
  } from "antd";
  import { ArrowLeft, ArrowRightLeft, Search } from "lucide-react";
  import { useState } from "react";
  import { useGetTicketByAgentId, useTransferTickets } from "../hooks/useQuaries";
  import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
  import { useGetUsers } from "../../agent/hooks/useQuaries";
  import { useNavigate } from "react-router-dom";
  
  function MoveTickets() {
    const { data: agentResponse } = useGetUsers();
    const { drawCategories: draws } = useDrawCategoryController();
    const { mutate: transferTickets, isPending: isTransferring } =
      useTransferTickets();
    const [fromAgentId, setFromAgentId] = useState<string>("");
    const [toAgentId, setToAgentId] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
  
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  
    const { data: ticketResponse, isLoading } = useGetTicketByAgentId(
      fromAgentId,
      selectedCategory
    );
    const tickets = ticketResponse?.tickets || [];
  
    const filteredTickets = tickets.filter((ticket: any) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
  
      const ticketNoMatches = String(ticket.ticketNo || "")
        .toLowerCase()
        .includes(query);
      const numberMatches = String(ticket.number || "")
        .toLowerCase()
        .includes(query);
  
      return ticketNoMatches || numberMatches;
    });
  
    const handleToggleSelect = (ticketId: string) => {
      setSelectedTicketIds((prev) =>
        prev.includes(ticketId)
          ? prev.filter((id) => id !== ticketId)
          : [...prev, ticketId]
      );
    };
  
    const handleMoveTickets = () => {
      if (!toAgentId) {
        message.warning("ကျေးဇူးပြု၍ လက်ခံမည့် အေးဂျင့်ကို ရွေးချယ်ပါ (To Agent)");
        return;
      }
  
      if (fromAgentId === toAgentId) {
        message.error("ပေးပို့မည့် အေးဂျင့်နှင့် လက်ခံမည့် အေးဂျင့် တူညီ၍ မရပါ");
        return;
      }
  
      if (selectedTicketIds.length === 0) {
        message.warning("ကျေးဇူးပြု၍ ပြောင်းရွှေ့ရန် ထီလက်မှတ် အနည်းဆုံး တစ်ခု ရွေးပါ");
        return;
      }
  
      const payload = {
        fromAgentId,
        toAgentId,
        ticketIds: selectedTicketIds,
      };
  
      transferTickets(payload, {
        onSuccess: () => {
          message.success("ထီလက်မှတ်များ အောင်မြင်စွာ ပြောင်းရွှေ့ပြီးပါပြီ!");
          setSelectedTicketIds([]); // Clear selection after successful transfer
        },
        onError: (error: any) => {
          message.error(
            error?.response?.data?.message || "ထီလက်မှတ်များ ပြောင်းရွှေ့ခြင်း မအောင်မြင်ပါ"
          );
        },
      });
    };
    const navigate = useNavigate();
  
    return (
      <div className="space-y-5!">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft size={17} />
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">ထီလက်မှတ်များ ပြောင်းရွှေ့ရန်</h2>
            <p className="text-gray-500 text-sm">
              အေးဂျင့် တစ်ဦးထံမှ အခြား အေးဂျင့်တစ်ဦးထံ ထီလက်မှတ်များ လွှဲပြောင်းပါ
            </p>
          </div>
  
          <Button
            type="primary"
            icon={<ArrowRightLeft size={16} />}
            loading={isTransferring}
            disabled={selectedTicketIds.length === 0 || !toAgentId || isTransferring}
            onClick={handleMoveTickets}
          >
            ထီလက်မှတ်{" "}
            {selectedTicketIds.length > 0 ? `(${selectedTicketIds.length}) စောင်` : ""}{" "}
            ရွှေ့မည်
          </Button>
        </div>
  
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium">ထီဖွင့်ရက် ရွေးပါ</label>
              <Select
                className="w-full"
                size="large"
                placeholder="ထီဖွင့်ရက် ရွေးပါ"
                value={selectedCategory || undefined}
                allowClear
                onChange={(value) => {
                  setSelectedCategory(value);
                  setSelectedTicketIds([]); // Reset selection on category change
                }}
                options={(
                  (draws?.drawCategories && draws?.drawCategories) ||
                  []
                ).map((cat: any) => ({
                  value: String(cat.id ?? cat._id),
                  label: cat.date
                    ? new Date(cat.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "မသိရသေးသော ရက်စွဲ",
                }))}
              />
            </div>
  
            <div>
              <label className="block mb-2 font-medium">ပေးပို့မည့် အေးဂျင့် ရွေးပါ</label>
              <Select
                className="w-full"
                size="large"
                placeholder="အေးဂျင့် ရွေးပါ"
                value={fromAgentId || undefined}
                allowClear
                onChange={(value) => {
                  setFromAgentId(value);
                  setSelectedTicketIds([]); // Reset selection on agent change
                }}
                options={
                  agentResponse?.agents &&
                  agentResponse.agents.map((agent: any) => ({
                    value: String(agent.id ?? agent._id),
                    label: agent.name,
                  }))
                }
              />
            </div>
  
            <div>
              <label className="block mb-2 font-medium">လက်ခံမည့် အေးဂျင့် ရွေးပါ</label>
              <Select
                className="w-full"
                size="large"
                placeholder="အေးဂျင့် ရွေးပါ"
                value={toAgentId || undefined}
                allowClear
                onChange={(value) => {
                  setToAgentId(value);
                }}
                options={
                  agentResponse?.agents &&
                  agentResponse.agents
                    .filter(
                      (agent: any) =>
                        String(agent.id ?? agent._id) !== fromAgentId
                    )
                    .map((agent: any) => ({
                      value: String(agent.id ?? agent._id),
                      label: agent.name,
                    }))
                }
              />
            </div>
          </div>
        </Card>
  
        <Card
          title={
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  ထီလက်မှတ်များ ({filteredTickets.length})
                </span>
                {selectedTicketIds.length > 0 && (
                  <Tag color="blue" className="rounded-full text-xs! px-2.5">
                    {selectedTicketIds.length} စောင် ရွေးချယ်ထားသည်
                  </Tag>
                )}
              </div>
              <div>
                <Input
                  placeholder="ထီနံပါတ် ရှာဖွေရန်..."
                  prefix={<Search size={14} className="text-gray-400 mr-1" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  className="w-full sm:w-64 text-xs! font-medium"
                />
              </div>
            </div>
          }
        >
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spin />
            </div>
          ) : filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTickets.map((ticket: any) => {
                const ticketId = String(ticket.id ?? ticket._id);
                const isSelected = selectedTicketIds.includes(ticketId);
  
                return (
                  <div
                    key={ticketId}
                    onClick={() => handleToggleSelect(ticketId)}
                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "border-primary bg-blue-50/50 shadow-sm"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-yellow-700 uppercase tracking-wider">
                        {ticket.number || "N/A"}
                      </span>
                      <Checkbox
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleToggleSelect(ticketId)}
                      />
                    </div>
  
                    <div className="flex items-center justify-between pt-1">
                      <div className="text-start">
                        <p className="text-xs text-gray-400">အေးဂျင့်</p>
                        <div color="gold" className="text-xs! font-medium">
                          {ticket.Agent?.name || "—"}
                        </div>
                      </div>
  
                      <div className="text-center">
                        <p className="text-xs text-gray-400">ထီဖွင့်ရက်</p>
                        <div color="gold" className="text-xs! font-medium">
                          {ticket.DrawCategory?.date || "—"}
                        </div>
                      </div>
  
                      <div className="text-center">
                        <p className="text-xs text-gray-400">အခြေအနေ</p>
                        <div
                          className={`text-xs font-medium mt-0! px-2 rounded-full ${
                            ticket.status === "lost"
                              ? "bg-red-100 text-red-600"
                              : ticket.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {ticket.status}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty
              description={
                searchQuery
                  ? `"${searchQuery}" နှင့် ကိုက်ညီသော ထီလက်မှတ် မရှိပါ`
                  : fromAgentId && selectedCategory
                  ? "ထီလက်မှတ်များ မရှိပါ"
                  : "ကျေးဇူးပြု၍ အေးဂျင့် နှင့် ထီဖွင့်ရက် ရွေးချယ်ပါ"
              }
            />
          )}
        </Card>
      </div>
    );
  }
  
  export default MoveTickets;