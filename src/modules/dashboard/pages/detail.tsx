import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Tag, Divider } from "antd";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

  if (!ticket) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        ဒေတာမတွေ့ရှိပါ
      </div>
    );
  }

  const drawDate = new Date(ticket.DrawCategory?.date).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="min-h-screen space-y-4 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)}>နောက်သို့</Button>
        <h1 className="text-lg flex-1 font-bold text-center">
          လက်မှတ်အသေးစိတ်
        </h1>
      </div>

      {/* CARD 1 */}
      <Card className="rounded-2xl p-0!">
        <h2 className="font-semibold text-lg mb-3">
          လက်မှတ်အချက်အလက်
        </h2>

        <Divider className="my-2!" />

        <div className="space-y-4 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">လက်မှတ်နံပါတ်</span>
            <span className="font-semibold">{ticket.number}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">အခြေအနေ</span>
            <Tag color={ticket.status === "won" ? "green" : "red"}>
              {ticket.status}
            </Tag>
          </div>

          <Divider className="my-2!" />

          <div className="flex mt-3 justify-between">
            <span className="text-gray-500">ထွက်ဂဏန်း</span>
            <span>{ticket.DrawCategory?.drawNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ထွက်ရက်</span>
            <span>{drawDate}</span>
          </div>

          <Divider className="my-2!" />

          {/* AGENT */}
          <div className="flex mt-3 justify-between">
            <span className="text-gray-500">အေးဂျင့်</span>
            <span>{ticket.Agent?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ဖုန်းနံပါတ်</span>
            <span>{ticket.Agent?.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">လိပ်စာ</span>
            <span>{ticket.Agent?.address}</span>
          </div>

        </div>
      </Card>

      {/* CARD 2 */}
      <Card className="rounded-2xl shadow-sm mt-3! p-0!">

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg mb-1">
              ရလဒ်
            </h2>
            <p className="text-xs text-gray-400">
              အနိုင်ရရှိမှုအသေးစိတ်
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">စုစုပေါင်းဆုငွေ</p>
            <p className="text-xl font-bold text-green-600">
              {ticket.totalReward.toLocaleString()}
            </p>
          </div>
        </div>

        {!ticket.prizes?.length ? (
          <div className="text-center text-gray-400 py-6">
            အနိုင်ရရှိမှုမရှိပါ
          </div>
        ) : (
          <div className="space-y-2 pr-1">

            {ticket.prizes.map((p: any) => (
              <div
                key={p._id}
                className="
                  flex items-center justify-between
                  px-3 py-3 rounded-xl
                  bg-gradient-to-r from-gray-50 to-white
                  border border-gray-100
                  hover:shadow-sm transition
                "
              >

                {/* LEFT */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {p.prizeName}
                  </span>

                  <span className="text-xs text-gray-400">
                    ဆုအမျိုးအစား
                  </span>
                </div>

               
                <div className="text-right">
                  <span className="text-sm font-bold text-green-600">
                    +{p.rewardAmount.toLocaleString()}
                  </span>

                  <div className="text-[10px] text-green-500">
                    အနိုင်ရ
                  </div>
                </div>

              </div>
            ))}

          </div>
        )}

      </Card>
    </div>
  );
}

export default Detail;