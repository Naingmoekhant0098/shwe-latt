function Header() {
  // const[search,setSearch] = useState<string>("");
  return (
    <div className="flex justify-between items-center  ">
      <div>
        <div className="font-semibold text-lg md:text-xl">ထီမဲနံပါတ်များ</div>
        <p className="text-sm text-gray-400 mt-1!">
          အမျိုးအစားအလိုက် ခွဲခြားထားသော ထီမဲရလဒ်များကို ကြည့်ရှုနိုင်ပါသည်
        </p>
      </div>
      <div>
        {/* <Input
            size="large"
            className=" text-xs"
            placeholder="Search....."
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Search className=" size-5" />}
          /> */}
      </div>
    </div>
  );
}
export default Header;
