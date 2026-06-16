import { Button, Empty, Select, Spin } from "antd";
import ResultCard from "../result_card";
import { EyeOutlined } from "@ant-design/icons";
import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
import { useResultController } from "../../hooks/useTicketController";
import { useState } from "react";

function ResultTab() {
  const [cate, setCate] = useState();
  const { results, handleSearch, isLoading, error } = useResultController();
  const { drawCategories: draws } = useDrawCategoryController();

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
      <div className="">
        <div className="flex justify-end gap-3 mb-3 items-center">
        <Select
      className="w-full md:w-52 "

          placeholder="ထီထွက်ရက်ရွေးချယ်ရန်"
          showSearch={false}
          optionFilterProp="children"
          value={cate}
          onChange={(value) => setCate(value)}
        >
          {draws?.drawCategories?.map((cat) => (
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
          disabled={!cate}
          onClick={() => handleSearch(cate)}
          type="primary"
          icon={<EyeOutlined />}
        >
          ရလဒ်ကြည့်ရန်
        </Button>
      </div>
      </div>

      {isLoading ? (
        <div className="text-center flex flex-col items-center gap-3 py-20">
          <Spin size="large" />
          <div>ရှာဖွေနေပါသည်</div>
        </div>
      ) : error ? (
        <div className=" mt-4 py-20">
          <Empty></Empty>
          <div className="text-center text-red-500 ">
            {error?.response?.data?.message ||
              error?.message ||
              "တစ်ခုခုမှားယွင်းနေပါသည်"}
          </div>
        </div>
      ) : results?.results?.length ? (
        <div className="space-y-3">
          {results.results.map((item: any) => (
            <ResultCard key={item.id || item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-20">ရလဒ်မရှိပါ</div>
      )}
    </div>
  );
}

export default ResultTab;
