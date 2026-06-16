import { useState } from "react";
import {
  EyeOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button, Select } from "antd";

import { useDrawCategoryController } from "../../category/hooks/useCustomerController";
import { useCheckWinners } from "../hooks/useQuaries";

function CheckWinner() {
  const { drawCategories: draws } = useDrawCategoryController();

  const [cate, setCate] = useState<string>();
  const [tempCate, setTempCate] = useState<string>();

  const {
    data: showWinnerResults,
    isLoading: showWinnerLoading,
    error,
  } = useCheckWinners(cate);

  const winnerTickets =
    showWinnerResults?.data?.tickets || showWinnerResults?.tickets || [];

  const hasChecked = !!cate;

  const handleCheck = () => {
    if (tempCate) {
      setCate(tempCate);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-0 py-6 pt-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            အနိုင်ရသူ စစ်ဆေးရန်
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            ထီဖွင့်ရက်ရွေးချယ်ပြီး အနိုင်ရ/မရ စစ်ဆေးပါ
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-xs text-slate-500 mb-2">
            ထီဖွင့်ရက်
          </label>

          <Select
            className="w-full"
            size="large"
            placeholder="ထီဖွင့်ရက် ရွေးချယ်ပါ"
            value={tempCate}
            onChange={(value) => setTempCate(value)}
            options={(draws?.drawCategories || []).map((cat: any) => ({
              value: String(cat.id ?? cat._id),
              label: cat.date
                ? new Date(cat.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unknown Date",
            }))}
          />
        </div>

        <Button
          type="primary"
          icon={<EyeOutlined />}
          className="w-full h-11 rounded-xl"
          disabled={!tempCate || showWinnerLoading}
          onClick={handleCheck}
        >
          စစ်ဆေးရန်
        </Button>

        <div className="mt-8">
          {showWinnerLoading && (
            <div className="text-center py-8">
              <LoadingOutlined style={{ fontSize: 40 }} spin />
              <p className="mt-3 text-slate-500">စစ်ဆေးနေပါသည်...</p>
            </div>
          )}

          {!showWinnerLoading && hasChecked && !error && (
            <>
              {winnerTickets.length > 0 ? (
                <div className="text-center bg-green-50 border border-green-200 rounded-xl p-6">
                  <CheckCircleFilled
                    style={{
                      fontSize: 56,
                      color: "#22c55e",
                    }}
                  />

                  <h3 className="mt-4! text-lg font-semibold text-green-700">
                    {showWinnerResults?.message}
                  </h3>
                </div>
              ) : (
                <div className="text-center bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <InfoCircleFilled
                    className=" text-yellow-600!"
                    style={{
                      fontSize: 36,
                    }}
                  />

                  <h3 className="mt-4! text-lg font-semibold text-yellow-600">
                    {showWinnerResults?.message}
                  </h3>
                </div>
              )}
            </>
          )}

          {!showWinnerLoading && error && (
            <div className="text-center bg-red-50 border border-red-200 rounded-xl p-6">
              <CloseCircleFilled
                style={{
                  fontSize: 56,
                  color: "#ef4444",
                }}
              />

              <h3 className="mt-4 text-xl font-semibold text-red-600">
                အနိုင်မရရှိပါ
              </h3>
            </div>
          )}

          {!showWinnerLoading && !hasChecked && (
            <div className="text-center text-slate-400 py-8">
              ထီဖွင့်ရက်ရွေးချယ်ပြီး စစ်ဆေးပါ
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckWinner;
