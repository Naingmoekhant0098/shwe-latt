// import { Button, Empty, Select, Spin } from "antd";
// import ResultCard from "../result_card";
// import { EyeOutlined } from "@ant-design/icons";
// import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
// import { useResultController } from "../../hooks/useTicketController";
// import { useState } from "react";

// function ResultTab() {
//   const [cate, setCate] = useState<string | undefined>();

//   const [hasSearched, setHasSearched] = useState(false);

//   const { results, handleSearch, isLoading, checkingError } = useResultController();
//   const { drawCategories: draws } = useDrawCategoryController();

//   const onSearchClick = () => {
//     if (cate) {
//       handleSearch(cate);
//       setHasSearched(true);
//     }
//   };

//   const onClearOrChange = (value: string | undefined) => {
//     setCate(value);
//     if (!value) {
//       setHasSearched(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="mb-4">
//         <h2 className="text-lg mb-1! font-semibold text-slate-800">
//           ထီရလဒ်များ
//         </h2>
//         <p className="text-sm text-slate-400">
//           ဆုအမျိုးအစားအလိုက် ခွဲခြားထားသော နောက်ဆုံးထီရလဒ်များ
//         </p>
//       </div>

//       <div>
//         <div className="flex justify-end gap-3 mb-3 items-center">
//           <Select
//             className="w-full md:w-52"
//             allowClear
//             placeholder="ထီထွက်ရက်ရွေးချယ်ရန်"
//             showSearch={false}
//             optionFilterProp="children"
//             value={cate}
//             onChange={onClearOrChange}
//           >
//             {draws?.drawCategories?.map((cat: any) => (
//               <Select.Option key={cat.id || cat._id} value={cat.id || cat._id}>
//                 {new Date(cat.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </Select.Option>
//             ))}
//           </Select>

//           <Button
//             disabled={!cate}
//             onClick={onSearchClick}
//             type="primary"
//             icon={<EyeOutlined />}
//           >
//             ရလဒ်ကြည့်ရန်
//           </Button>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="text-center flex flex-col items-center gap-3 py-20">
//           <Spin size="large" />
//           <div>ရှာဖွေနေပါသည်</div>
//         </div>
//       ) : checkingError ? (
//         <div className="mt-4 py-20">
//           <Empty description={false} />
//           <div className="text-center text-red-500 mt-2">
//             {checkingError && (checkingError as any)?.response?.data?.message === "No results found for this draw category. Cannot check tickets."
//               ? "ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။ လက်မှတ်များကို စစ်ဆေး၍မရပါ။"
//               : (checkingError as any)?.response?.data?.message || checkingError?.message || "တစ်ခုခုမှားယွင်းနေပါသည်"}
//           </div>
//         </div>
//       ) : !hasSearched ? (
//         <div className="text-center text-gray-400 py-20">
//          <Empty
//   description="ထီထွက်ရက်ကို ဦးစွာရွေးချယ်ပါ။ ရွေးချယ်ထားသောနေ့ ညနေ ၄:၀၀ နာရီတွင် ထီရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်။"
// />
//         </div>
//       ) : results?.results?.length ? (
//         <div className="space-y-3">
//           {results.results.map((item: any) => (
//             <ResultCard key={item.id || item._id} item={item} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-400 py-20">
//           <Empty description="ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultTab;

// import { Button, Empty, Select, Spin } from "antd";
// import ResultCard from "../result_card";
// import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
// import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
// import { useResultController } from "../../hooks/useTicketController";
// import { useState, useMemo } from "react";

// function ResultTab() {
//   const [cate, setCate] = useState<string | undefined>();
//   const [hasSearched, setHasSearched] = useState(false);

//   const { results, handleSearch, isLoading, checkingError } = useResultController();
//   const { drawCategories: draws } = useDrawCategoryController();

//   const onSearchClick = () => {
//     if (cate) {
//       handleSearch(cate);
//       setHasSearched(true);
//     }
//   };

//   const onClearOrChange = (value: string | undefined) => {
//     setCate(value);
//     if (!value) {
//       setHasSearched(false);
//     }
//   };

//   // Helper function: Get last 3 digits as integer for sorting
//   const getLast3Digits = (val: any): number => {
//     const str = String(typeof val === "object" ? val.number || val.ticketNumber || "" : val).trim();
//     if (!str) return 0;
//     const last3Str = str.slice(-3);
//     return parseInt(last3Str, 10) || 0;
//   };

//   // 1. Sort winning numbers inside EACH prize group by their LAST 3 DIGITS (Smallest to Largest)
//   const sortedResults = useMemo(() => {
//     if (!results?.results) return [];

//     return results.results.map((prizeItem: any) => {
//       // Find array key containing winning numbers
//       const numKey = Object.keys(prizeItem).find(
//         (key) => Array.isArray(prizeItem[key]) && prizeItem[key].length > 0
//       );

//       if (!numKey) return prizeItem;

//       // Sort array elements based on last 3 digits ascending
//       const sortedNumbers = [...prizeItem[numKey]].sort((a: any, b: any) => {
//         const last3A = getLast3Digits(a);
//         const last3B = getLast3Digits(b);
//         return last3A - last3B;
//       });

//       return {
//         ...prizeItem,
//         [numKey]: sortedNumbers,
//       };
//     });
//   }, [results]);

//   const renderHighlightedNumber = (numValue: string | number) => {
//     const str = String(numValue).trim();
//     if (str.length <= 3) {
//       return <span className="font-bold text-amber-600  ">{str}</span>;
//     }
//     const mainPart = str.slice(0, -3);
//     const last3Part = str.slice(-3);

//     return (
//       <span className="inline-flex items-center tracking-wider">
//         <span>{mainPart}</span>
//         <span className="font-bold text-amber-600  px-1   rounded   ">
//           {last3Part}
//         </span>
//       </span>
//     );
//   };

//   const handleDownloadPDF = () => {
//     if (!sortedResults.length) return;

//     const selectedDraw = draws?.drawCategories?.find(
//       (cat: any) => (cat.id || cat._id) === cate
//     );

//     const drawDateStr = selectedDraw
//       ? new Date(selectedDraw.date).toLocaleDateString("en-US", {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         })
//       : "ထီရလဒ်များ";

//     const printWindow = window.open("", "_blank");
//     if (!printWindow) return;

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>ထီရလဒ်များ - ${drawDateStr}</title>
//           <style>
//             body { font-family: 'Pyidaungsu', Arial, sans-serif; padding: 24px; color: #1e293b; background: #ffffff; }
//             h1 { font-size: 22px; text-align: center; margin-bottom: 4px; color: #0f172a; }
//             p.sub { text-align: center; color: #64748b; font-size: 14px; margin-bottom: 24px; }
//             .prize-section { margin-bottom: 20px; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; page-break-inside: avoid; }
//             .prize-title { font-size: 16px; font-weight: bold; color: #1e3a8a; margin-bottom: 12px; border-bottom: 2px solid #3b82f6; padding-bottom: 6px; }
//             .number-grid { display: flex; flex-wrap: wrap; gap: 10px; }
//             .number-badge { background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 12px; font-weight: 600; font-size: 15px; border-radius: 6px; font-family: monospace; }
//             .last-three { color: #d97706; background-color: #fef3c7; padding: 2px 4px; border-radius: 4px; font-weight: bold; border: 1px solid #fde68a; }
//             @media print {
//               body { padding: 0; }
//               .prize-section { border: 1px solid #cbd5e1; }
//             }
//           </style>
//         </head>
//         <body>
//           <h1>အောင်ဘာလေ ထီရလဒ်များ</h1>
//           <p class="sub">ထွက်ရက် - ${drawDateStr}</p>
//           ${sortedResults
//             .map((item: any) => {
//               const title = item.title || item.name || item.prizeName || "ဆုအမျိုးအစား";
//               const numKey = Object.keys(item).find(
//                 (key) => Array.isArray(item[key]) && item[key].length > 0
//               );
//               const numbersList = numKey ? item[numKey] : [];

//               return `
//                 <div class="prize-section">
//                   <div class="prize-title">${title}</div>
//                   <div class="number-grid">
//                     ${numbersList
//                       .map((num: any) => {
//                         const rawVal = String(typeof num === "object" ? num.number || num.ticketNumber : num).trim();
//                         let formattedNum = rawVal;
//                         if (rawVal.length > 3) {
//                           const prefix = rawVal.slice(0, -3);
//                           const last3 = rawVal.slice(-3);
//                           formattedNum = `${prefix}<span class="last-three">${last3}</span>`;
//                         } else {
//                           formattedNum = `<span class="last-three">${rawVal}</span>`;
//                         }
//                         return `<div class="number-badge">${formattedNum}</div>`;
//                       })
//                       .join("")}
//                   </div>
//                 </div>
//               `;
//             })
//             .join("")}
//         </body>
//       </html>
//     `;

//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.focus();

//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 300);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="mb-4">
//         <h2 className="text-lg mb-1! font-semibold text-slate-800">
//           ထီရလဒ်များ
//         </h2>
//         <p className="text-sm text-slate-400">
//           ဆုအမျိုးအစားအလိုက် ခွဲခြားထားသော နောက်ဆုံးထီရလဒ်များ (နောက်ဆုံး ၃ လုံးအလိုက် စီထားပါသည်)
//         </p>
//       </div>

//       <div>
//         <div className="flex flex-wrap justify-end gap-3 mb-3 items-center">
//           <Select
//             className="w-full md:w-52"
//             allowClear
//             placeholder="ထီထွက်ရက်ရွေးချယ်ရန်"
//             showSearch={false}
//             optionFilterProp="children"
//             value={cate}
//             onChange={onClearOrChange}
//           >
//             {draws?.drawCategories?.map((cat: any) => (
//               <Select.Option key={cat.id || cat._id} value={cat.id || cat._id}>
//                 {new Date(cat.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </Select.Option>
//             ))}
//           </Select>

//           <Button
//             disabled={!cate}
//             onClick={onSearchClick}
//             type="primary"
//             icon={<EyeOutlined />}
//           >
//             ရလဒ်ကြည့်ရန်
//           </Button>

//           {sortedResults.length > 0 && (
//             <Button
//               onClick={handleDownloadPDF}
//               icon={<DownloadOutlined />}
//               className="bg-emerald-600 text-white hover:bg-emerald-500 border-none"
//             >
//               PDF ဒေါင်းလုဒ်လုပ်ရန်
//             </Button>
//           )}
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="text-center flex flex-col items-center gap-3 py-20">
//           <Spin size="large" />
//           <div>ရှာဖွေနေပါသည်</div>
//         </div>
//       ) : checkingError ? (
//         <div className="mt-4 py-20">
//           <Empty description={false} />
//           <div className="text-center text-red-500 mt-2">
//             {checkingError &&
//             (checkingError as any)?.response?.data?.message ===
//               "No results found for this draw category. Cannot check tickets."
//               ? "ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။ လက်မှတ်များကို စစ်ဆေး၍မရပါ။"
//               : (checkingError as any)?.response?.data?.message ||
//                 checkingError?.message ||
//                 "တစ်ခုခုမှားယွင်းနေပါသည်"}
//           </div>
//         </div>
//       ) : !hasSearched ? (
//         <div className="text-center text-gray-400 py-20">
//           <Empty description="ထီထွက်ရက်ကို ဦးစွာရွေးချယ်ပါ။ ရွေးချယ်ထားသောနေ့ ညနေ ၄:၀၀ နာရီတွင် ထီရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်။" />
//         </div>
//       ) : sortedResults.length > 0 ? (
//         <div className="space-y-3">
//           {sortedResults.map((item: any) => (
//             <ResultCard
//               key={item.id || item._id}
//               item={item}
//               renderHighlightedNumber={renderHighlightedNumber}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-400 py-20">
//           <Empty description="ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultTab;
import { Button, Empty, Select, Spin } from "antd";
import ResultCard from "../result_card";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { useDrawCategoryController } from "../../../category/hooks/useCustomerController";
import { useResultController } from "../../hooks/useTicketController";
import { useState, useMemo } from "react";

function ResultTab() {
  const [cate, setCate] = useState<string | undefined>();
  const [hasSearched, setHasSearched] = useState(false);

  const { results, handleSearch, isLoading, checkingError } =
    useResultController();
  const { drawCategories: draws } = useDrawCategoryController();

  const onSearchClick = () => {
    if (cate) {
      handleSearch(cate);
      setHasSearched(true);
    }
  };

  const onClearOrChange = (value: string | undefined) => {
    setCate(value);
    if (!value) {
      setHasSearched(false);
    }
  };

  // Helper function: Get last 3 digits as integer for sorting
  const getLast3Digits = (val: any): number => {
    const str = String(
      typeof val === "object" ? val.number || val.ticketNumber || "" : val
    ).trim();
    if (!str) return 0;
    const last3Str = str.slice(-3);
    return parseInt(last3Str, 10) || 0;
  };

  // 1. Sort winning numbers inside EACH prize group by their LAST 3 DIGITS (Smallest to Largest)
  const sortedResults = useMemo(() => {
    if (!results?.results) return [];

    return results.results.map((prizeItem: any) => {
      // Find array key containing winning numbers
      const numKey = Object.keys(prizeItem).find(
        (key) => Array.isArray(prizeItem[key]) && prizeItem[key].length > 0
      );

      if (!numKey) return prizeItem;

      // Sort array elements based on last 3 digits ascending
      const sortedNumbers = [...prizeItem[numKey]].sort((a: any, b: any) => {
        const last3A = getLast3Digits(a);
        const last3B = getLast3Digits(b);
        return last3A - last3B;
      });

      return {
        ...prizeItem,
        [numKey]: sortedNumbers,
      };
    });
  }, [results]);

  const renderHighlightedNumber = (numValue: string | number) => {
    const str = String(numValue).trim();
    if (str.length <= 3) {
      return <span className="font-bold text-amber-600">{str}</span>;
    }
    const mainPart = str.slice(0, -3);
    const last3Part = str.slice(-3);

    return (
      <span className="inline-flex text-black items-center tracking-wider">
        <span>{mainPart}</span>
        <span className="font-bold text-amber-600 px-1 rounded">
          {last3Part}
        </span>
      </span>
    );
  };

  // PDF Download Handler with Official Lottery Layout
  const handleDownloadPDF = () => {
    if (!sortedResults.length) return;

    const selectedDraw = draws?.drawCategories?.find(
      (cat: any) => (cat.id || cat._id) === cate
    );

    const drawDateStr =
      sortedResults[0]?.DrawCategory?.date ||
      (selectedDraw
        ? new Date(selectedDraw.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "ထီရလဒ်များ");

    // Helper to find prize group by multiple keywords
    const getPrizeGroup = (nameKeywords: string[]) => {
      return sortedResults.find((item: any) => {
        const nameEng = (item.name || "").toLowerCase();
        const nameMM = (item.nameMM || "").toLowerCase();

        return nameKeywords.some(
          (kw) =>
            nameEng.includes(kw.toLowerCase()) ||
            nameMM.includes(kw.toLowerCase())
        );
      });
    };

    // Extract categories strictly using exact Backend payload keys
    const firstPrize = getPrizeGroup(["prizefirst", "ပထမဆု"]);
    const nearFirstPrize = getPrizeGroup(["prizefirstnear", "အနီးကပ်"]);
    const secondPrize = getPrizeGroup(["prizesecond", "ဒုတိယဆု"]);
    const thirdPrize = getPrizeGroup(["prizethird", "တတိယဆု"]);
    const fourthPrize = getPrizeGroup(["prizeforth", "စတုတ္ထဆု"]);
    const fifthPrize = getPrizeGroup(["prizefifth", "ပဉ္စမဆု", "ပဥ္စမဆု"]);

    // Running numbers (Front 3, Back 3, Back 2)
    const frontThree = getPrizeGroup([
      "runningnumberfrontthree",
      "ရှေ့ ၃ လုံး",
      "ရှေ့သုံးလုံး",
      "ရှေ့ 3 လုံး",
    ]);
    const backThree = getPrizeGroup([
      "runningnumberbackthree",
      "နောက် ၃ လုံး",
      "နောက်သုံးလုံး",
      "နောက် 3 လုံး",
    ]);
    const backTwo = getPrizeGroup([
      "runningnumberbacktwo",
      "နောက် ၂ လုံး",
      "နောက်နှစ်လုံး",
      "နောက် 2 လုံး",
    ]);

    // Helper to render table grid for main prizes
    const renderTableGrid = (numbersList: any[] = [], columns = 5) => {
      if (!numbersList || !numbersList.length) {
        return `<div style="text-align: center; color: #888; padding: 10px;">မရှိပါ</div>`;
      }
      let rowsHtml = "";
      for (let i = 0; i < numbersList.length; i += columns) {
        const rowItems = numbersList.slice(i, i + columns);
        rowsHtml += "<tr>";
        for (let j = 0; j < columns; j++) {
          const num = rowItems[j];
          if (num !== undefined) {
            const rawVal = String(
              typeof num === "object" ? num.number || num.ticketNumber : num
            ).trim();
            let formatted = rawVal;
            if (rawVal.length > 3) {
              const main = rawVal.slice(0, -3);
              const last3 = rawVal.slice(-3);
              formatted = `${main}<span class="last-three">${last3}</span>`;
            } else {
              formatted = `<span class="last-three">${rawVal}</span>`;
            }
            rowsHtml += `<td>${formatted}</td>`;
          } else {
            rowsHtml += `<td></td>`;
          }
        }
        rowsHtml += "</tr>";
      }
      return `<table class="col-grid">${rowsHtml}</table>`;
    };

    const renderRunningDigits = (prizeGroup: any, fontClass = "") => {
      if (!prizeGroup || !prizeGroup.numbers || !prizeGroup.numbers.length) {
        return `<div style="font-size: 10pt; color: #777; margin: 6px 0;">မရှိပါ</div>`;
      }
      return prizeGroup.numbers
        .map((num: any) => {
          const val =
            typeof num === "object" ? num.number || num.ticketNumber : num;
          return `<div class="three-digit-box ${fontClass}">${val}</div>`;
        })
        .join("");
    };

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ထီပေါက်စဉ် - ${drawDateStr}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 6mm;
            }
            body {
              font-family: 'Pyidaungsu', 'Myanmar Text', sans-serif;
              padding: 0;
              margin: 0;
              color: #000;
              background: #fff;
            }
            .sheet-table {
              width: 100%;
              border-collapse: collapse;
              border: 1.5pt solid #000;
              text-align: center;
            }
            .sheet-table th, .sheet-table td {
              border: 1pt solid #000;
              vertical-align: top;
              
            }
            .header-flex {
              display: table;
              width: 100%;
            }
            .header-cell {
              display: table-cell;
              vertical-align: middle;
            }
            .header-title {
              font-size: 15pt;
              font-weight: bold;
            }
            .date-str {
              font-size: 9pt;
            }
            .first-prize-num {
              font-size: 24pt;
              font-weight: bold;
              letter-spacing: 2px;
            }
            .prize-title {
              font-size: 10pt;
              font-weight: bold;
            }
            .prize-amount {
              font-size: 9pt;
            }
            .col-grid {
              width: 100%;
              border-collapse: collapse;
            }
            .col-grid td {
              border: 0.5pt solid #777;
              width: 20%;
              padding: 2px 0;
              font-size: 8.5pt;
              font-family: 'Courier New', monospace;
              font-weight: bold;
            }
            .last-three {
              color: #d97706;
              background-color: #fef3c7;
              padding: 1px 2px;
              border-radius: 2px;
              font-weight: bold;
            }
            .three-digit-box {
              font-size: 18pt;
              font-weight: bold;
              margin: 4px 0;
              letter-spacing: 2px;
              font-family: monospace;
            }
            .two-digit-box {
              font-size: 22pt;
            }
            .footer-logo {
              margin-top: 15px;
              font-size: 16pt;
              font-weight: bold;
            }
            .footer-sub {
              font-size: 10pt;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <table class="sheet-table">
            <tr>
              <!-- LEFT COLUMN: First, Near 1st, 2nd, 3rd, 4th Prizes -->
              <td style="width: 42%; padding: 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <!-- Header & First Prize -->
                  <tr>
                    <td style="border-bottom: 1pt solid #000; padding: 4px;">
                      <div class="header-flex">
                        <div class="header-cell" style="text-align: left; width: 30%;">
                          <div class="header-title">ထီပေါက်စဉ်</div>
                          <div class="date-str">Date : ${drawDateStr}</div>
                        </div>
                        <div class="header-cell" style="text-align: center;">
                          <div class="prize-title">ပထမဆု</div>
                          <div class="prize-amount">( 6,000,000 )</div>
                        </div>
                        <div class="header-cell" style="text-align: right; width: 40%;">
                          <div class="first-prize-num">${
                            firstPrize?.numbers?.[0]
                              ? String(firstPrize.numbers[0])
                              : "-"
                          }</div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- Near 1st Prize -->
                  <tr>
                    <td style="border-bottom: 1pt solid #000; ">
                      <span class="prize-title">ပထမဆု (နီးစပ်)</span>
                      <span class="prize-amount">( 100,000 )</span>
                      <span style="margin-left: 20px; font-size: 14pt; font-weight: bold; font-family: monospace;">
                        ${
                          nearFirstPrize?.numbers
                            ? nearFirstPrize.numbers.join(
                                "&nbsp;&nbsp;&nbsp;&nbsp;"
                              )
                            : "-"
                        }
                      </span>
                    </td>
                  </tr>

                  <!-- 2nd Prize -->
                  <tr>
                    <td style="border-bottom: 1pt solid #000;">
                      <div class="prize-title" style="margin-bottom: 2px;">ဒုတိယဆု ( 200,000 )</div>
                      ${renderTableGrid(secondPrize?.numbers, 5)}
                    </td>
                  </tr>

                  <!-- 3rd Prize -->
                  <tr>
                    <td style="border-bottom: 1pt solid #000; ">
                      <div class="prize-title" style="margin-bottom: 2px;">တတိယဆု ( 80,000 )</div>
                      ${renderTableGrid(thirdPrize?.numbers, 5)}
                    </td>
                  </tr>

                  <!-- 4th Prize -->
                  <tr>
                    <td style="">
                      <div class="prize-title" style="margin-bottom: 2px;">စတုတ္ထဆု ( 40,000 )</div>
                      ${renderTableGrid(fourthPrize?.numbers, 5)}
                    </td>
                  </tr>
                </table>
              </td>

              <!-- MIDDLE COLUMN: 5th Prize -->
              <td style="width: 42%">
                <div class="prize-title" style="margin-bottom: 4px;">ပဉ္စမဆု ( 20,000 )</div>
                ${renderTableGrid(fifthPrize?.numbers, 5)}
              </td>

              <!-- RIGHT COLUMN: Front 3, Back 3, Back 2 -->
              <td style="width: 16%; padding: 4px;">
                <!-- ရှေ့သုံးလုံး -->
                <div style="margin-bottom: 10px;">
                  <div class="prize-title">ရှေ့ သုံးလုံး</div>
                  <div class="prize-amount">( 4,000 )</div>
                  ${renderRunningDigits(frontThree)}
                </div>

                <!-- နောက်သုံးလုံး -->
                <div style="margin-bottom: 10px; border-top: 1pt solid #000; padding-top: 6px;">
                  <div class="prize-title">နောက်သုံးလုံး</div>
                  <div class="prize-amount">( 4,000 )</div>
                  ${renderRunningDigits(backThree)}
                </div>

                <!-- နောက်နှစ်လုံး -->
                <div style="border-top: 1pt solid #000; padding-top: 6px;">
                  <div class="prize-title">နောက် နှစ်လုံး</div>
                  <div class="prize-amount">( 2,000 )</div>
                  ${renderRunningDigits(backTwo, "two-digit-box")}
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

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

      <div>
        <div className="flex flex-wrap justify-end gap-3 mb-3 items-center">
          <Select
            className="w-full md:w-52"
            allowClear
            placeholder="ထီထွက်ရက်ရွေးချယ်ရန်"
            showSearch={false}
            optionFilterProp="children"
            value={cate}
            onChange={onClearOrChange}
          >
            {draws?.drawCategories?.map((cat: any) => (
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
            onClick={onSearchClick}
            type="primary"
            icon={<EyeOutlined />}
          >
            ရလဒ်ကြည့်ရန်
          </Button>

          {sortedResults.length > 0 && cate !== undefined && (
            <Button
              onClick={handleDownloadPDF}
              icon={<DownloadOutlined />}
              className="bg-emerald-600 text-white hover:bg-emerald-500 border-none"
            >
             <span> PDF ဒေါင်းလုဒ်လုပ်ရန်</span> 
             
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center flex flex-col items-center gap-3 py-20">
          <Spin size="large" />
          <div>ရှာဖွေနေပါသည်</div>
        </div>
      ) : checkingError ? (
        <div className="mt-4 py-20">
          <Empty description={false} />
          <div className="text-center text-red-500 mt-2">
            {checkingError &&
            (checkingError as any)?.response?.data?.message ===
              "No results found for this draw category. Cannot check tickets."
              ? "ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။ လက်မှတ်များကို စစ်ဆေး၍မရပါ။"
              : (checkingError as any)?.response?.data?.message ||
                checkingError?.message ||
                "တစ်ခုခုမှားယွင်းနေပါသည်"}
          </div>
        </div>
      ) : !hasSearched ? (
        <div className="text-center text-gray-400 py-20">
          <Empty description="ထီထွက်ရက်ကို ဦးစွာရွေးချယ်ပါ။ ရွေးချယ်ထားသောနေ့ ညနေ ၄:၀၀ နာရီတွင် ထီရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်။" />
        </div>
      ) : sortedResults.length > 0 ? (
        <div className="space-y-3">
          {sortedResults.map((item: any) => (
            <ResultCard
              key={item.id || item._id}
              item={item}
              renderHighlightedNumber={renderHighlightedNumber}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-20">
          <Empty description="ရွေးချယ်ထားသောရက်အတွက် ထီမထွက်သေးပါ။" />
        </div>
      )}
    </div>
  );
}

export default ResultTab;
