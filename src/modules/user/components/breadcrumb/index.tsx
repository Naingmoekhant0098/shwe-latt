import React from "react";
import { Breadcrumb as BC } from "antd";

function Breadcrumb() {
  return (
    <div>
      <BC
        separator=">"
        items={[
          {
            title: "Home",
          },
          {
            title: "Application Center",
            href: "",
          },
          {
            title: "Application List",
            href: "",
          },
          {
            title: "An Application",
          },
        ]}
      />
    </div>
  );
}

export default Breadcrumb;
