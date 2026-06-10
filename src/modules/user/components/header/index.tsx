import { Input } from "antd";
import { Search } from "lucide-react";

function Header() {
  return (
    <div className="flex justify-between items-center  ">
      <div className=" font-semibold text-xl">Users</div>
      <div>
        <Input
          size="large"
          className=" text-sm"
          placeholder="Search....."
          prefix={<Search className=" size-5" />}
        />
      </div>
    </div>
  );
}
export default Header;
