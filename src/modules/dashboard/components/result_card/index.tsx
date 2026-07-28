// function ResultCard({ item, fullWidth = false }) {
//   const getGridClass = (count) => {
//     if (count === 1) return "grid-cols-1";
//     if (count === 2) return "grid-cols-2";
//     if (count === 3) return "grid-cols-3";
//     if (count === 4) return "grid-cols-4";
//     if (count > 4) return "grid-cols-5";
//     return "grid-cols-5";
//   };

 
//   return (
//     <div
//       className={`
//           bg-white
//           rounded-2xl
//           overflow-hidden
//          shadow-sm
//           ${fullWidth ? "w-full" : ""}
//         `}
//     >
//       <div className="bg-primary py-2! flex items-center justify-center flex-col  text-center">
//         <h3 className="text-white text-md  mt-2! font-bold">{item.nameMM}</h3>
//       </div>

//       <div className={`grid ${getGridClass(item.numbers.length)}`}>
//         {item.numbers.map((num, i) => (
//           <div
//             key={i}
//             className="
//                 flex
//                 items-center
//                 justify-center
//                 min-h-[60px]
//                 text-primary
//                 text-md
//                 md:text-2xl
//                 font-bold
//                 md:font-semibold
//                 border-r
//                 border-b
//                 border-primary/10
                
//               "
//           >
//             {num}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ResultCard;


interface ResultCardProps {
  item: {
    nameMM?: string;
    title?: string;
    name?: string;
    numbers: (string | number)[];
  };
  fullWidth?: boolean;
  renderHighlightedNumber?: (num: string | number) => React.ReactNode;
}

function ResultCard({
  item,
  fullWidth = false,
  renderHighlightedNumber,
}: ResultCardProps) {
  const getGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  };

  const numbers = item?.numbers || [];

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        border
        border-slate-100
        ${fullWidth ? "w-full" : ""}
      `}
    >
      <div className="bg-primary py-2! flex items-center justify-center flex-col text-center">
        <h3 className="text-white text-md mt-2! font-bold">
          {item.nameMM || item.title || item.name}
        </h3>
      </div>

      <div className={`grid ${getGridClass(numbers.length)}`}>
        {numbers.map((num, i) => (
          <div
            key={i}
            className="
              flex
              items-center
              justify-center
              min-h-[60px]
              text-primary
              text-md
              md:text-2xl
              font-bold
              md:font-semibold
              border-r
              border-b
              border-primary/10
              p-2
              tracking-wider
            "
          >
            {renderHighlightedNumber ? renderHighlightedNumber(num) : num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultCard;