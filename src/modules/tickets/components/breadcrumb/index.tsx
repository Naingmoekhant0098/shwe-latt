import React from "react";
import { Breadcrumb as BC } from "antd";

function Breadcrumb() {
  return (
    <div >
      <BC
     className=" text-sm! md:text-base!"
        separator=">"
        items={[
          {
            title: "Dashboard",
          },
           
          {
            title: "Tickets",
          },
        ]}
      />
    </div>
  );
}

export default Breadcrumb;
