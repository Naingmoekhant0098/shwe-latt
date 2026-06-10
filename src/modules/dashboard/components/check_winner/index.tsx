import { Button, Select, Spin } from "antd";
import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useResultController } from "../../hooks/useTicketController";
import TicketCard from "../card";
import { useSearchParams } from "react-router-dom";
function CheckWinner() {
  const { drawCategories: draws } = useDrawCategoryController();
  const {
    checkResults,
    handleSelectedWinning,
    checkLoading,
    setSelectedWinnerCategory,
  } = useResultController();
  const [searchParams, setSearchParams] = useSearchParams();
  const cate = searchParams.get("cate") || undefined;
  const setCate = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("cate", value);
      return params;
    });
  };
  useEffect(() => {
    setSelectedWinnerCategory(cate);
  }, [cate]);
  return (
    <div className="space-y-4">
      
      <div className="mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          အနိုင်ရသူ စစ်ဆေးရန်
        </h2>

        <div className="text-sm text-slate-500">
          {checkResults?.tickets?.length > 0
            ? `${new Date(
                checkResults.tickets[0].DrawCategory.date
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })} တွင်ထွက်ရှိသော ထီပေါက်သူစာရင်း`
            : "ထီနံပါတ်ထည့်ပြီး အနိုင်ရရှိမှုကို စစ်ဆေးပါ"}
        </div>
      </div>

      <div className=" flex justify-end gap-3 mb-6">
        <Select
          className="w-58"
          placeholder="အမျိုးအစားရွေးချယ်ရန်"
          showSearch={false}
          optionFilterProp="children"
          value={cate}
          onChange={(value) => setCate(value)}
        >
          {draws?.drawCategories &&
            draws.drawCategories.map((cat) => (
              <Select.Option key={cat.id || cat._id} value={cat.id || cat._id}>
                {new Date(cat.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Select.Option>
            ))}
        </Select>
        {/* <Button
          onClick={() => handleSelectedWinning(cate)}
          type="primary"
          icon={<SearchOutlined size={30} />}
        >
          <span>စစ်ဆေးရန် </span>
        </Button> */}
      </div>


      {checkLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : checkResults?.tickets?.length ? (
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
          {checkResults.tickets.map((item, index) => (
            <TicketCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">
          အနိုင်ရရှိသူမရှိပါ
        </div>
      )}
    </div>
  );
}

export default CheckWinner;
