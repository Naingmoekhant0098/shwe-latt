function ResultCard({ item, fullWidth = false }) {
  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-4";
    if (count > 4) return "grid-cols-5";
    return "grid-cols-5";
  };

  // const getFontSizeClass = (numbers) => {
  //   const maxLength = Math.max(...numbers.map((n) => n.length));

  //   if (maxLength >= 12) return "text-xl md:text-3xl";
  //   if (maxLength >= 8) return "text-2xl md:text-4xl";
  //   if (maxLength >= 6) return "text-3xl md:text-5xl";

  //   return "text-4xl md:text-6xl";
  // };

  return (
    <div
      className={`
          bg-white
          rounded-2xl
          overflow-hidden
         shadow-sm
          ${fullWidth ? "w-full" : ""}
        `}
    >
      <div className="bg-primary py-2! flex items-center justify-center flex-col  text-center">
        <h3 className="text-white text-md  mt-2! font-bold">{item.nameMM}</h3>
      </div>

      <div className={`grid ${getGridClass(item.numbers.length)}`}>
        {item.numbers.map((num, i) => (
          <div
            key={i}
            className="
                flex
                items-center
                justify-center
                min-h-[60px]
                text-primary
                text-md
                md:text-4xl
                font-bold
                border-r
                border-b
                border-primary/10
                
              "
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultCard;
