import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ResultCard({ item, fullWidth = false }) {
    const getGridClass = (count) => {
        if (count === 1)
            return "grid-cols-1";
        if (count === 2)
            return "grid-cols-2";
        if (count === 3)
            return "grid-cols-3";
        if (count === 4)
            return "grid-cols-4";
        if (count > 4)
            return "grid-cols-5";
        return "grid-cols-5";
    };
    // const getFontSizeClass = (numbers) => {
    //   const maxLength = Math.max(...numbers.map((n) => n.length));
    //   if (maxLength >= 12) return "text-xl md:text-3xl";
    //   if (maxLength >= 8) return "text-2xl md:text-4xl";
    //   if (maxLength >= 6) return "text-3xl md:text-5xl";
    //   return "text-4xl md:text-6xl";
    // };
    return (_jsxs("div", { className: `
          bg-white
          rounded-2xl
          overflow-hidden
         shadow-sm
          ${fullWidth ? "w-full" : ""}
        `, children: [_jsx("div", { className: "bg-primary py-2! flex items-center justify-center flex-col  text-center", children: _jsx("h3", { className: "text-white text-md  mt-2! font-bold", children: item.nameMM }) }), _jsx("div", { className: `grid ${getGridClass(item.numbers.length)}`, children: item.numbers.map((num, i) => (_jsx("div", { className: "\n                flex\n                items-center\n                justify-center\n                min-h-[60px]\n                text-primary\n                text-md\n                md:text-4xl\n                font-bold\n                border-r\n                border-b\n                border-primary/10\n                \n              ", children: num }, i))) })] }));
}
export default ResultCard;
