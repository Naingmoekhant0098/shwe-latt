import { Button, Select, Spin } from "antd";
import ResultCard from "../result_card";
import { EyeOutlined } from "@ant-design/icons";
import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
import { useResultController } from "../../hooks/useTicketController";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResultTab() {
 
  const { results, handleSearch, isLoading } = useResultController();
  const { drawCategories: draws } = useDrawCategoryController();

  const [searchParams, setSearchParams] = useSearchParams();

  const cate = searchParams.get("cate") || undefined;

  const setCate = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("cate", value);
      return params;
    });
  };

  // const latestDraw = draws?.drawCategories?.reduce((latest, current) => {
  //   if (!latest) return current;
  //   return new Date(current.date) > new Date(latest.date) ? current : latest;
  // }, null);

  // const latestDrawId = latestDraw ? latestDraw.id || latestDraw._id : undefined;

  // useEffect(() => {
  //   if (latestDrawId && !selectedCategory) {
  //     setSelectedCategory(latestDrawId);
  //   }
  // }, [latestDrawId]);

  return (
    <div className="space-y-4">
     
      <div className="mb-4">
        <h2 className="text-lg mb-1! font-semibold text-slate-800">
          ထီရလဒ်များ
        </h2>
        <p className="text-sm text-slate-400">
          ဆုအမျိုးအစားအလိုက် ခွဲခြားထားသော နောက်ဆုံးထီရလဒ်များ
        </p>
      </div>

      <div className=" flex justify-between gap-3 mb-3">
        <Select
          className="w-full"
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

        <Button
          onClick={() => handleSearch(cate)}
          type="primary"
          icon={<EyeOutlined />}
        >
          <span>ရလဒ်ကြည့်ရန်</span>
        </Button>
      </div>



      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : results?.results?.length ? (
        results.results.map((item, index) => (
          <ResultCard key={index} item={item} />
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">ရလဒ်မရှိပါ</div>
      )}
    </div>
  );
}

export default ResultTab;
