import React from "react";
import { Breadcrumb as BC } from "antd";

interface BreadCrumbItem {
  title: string;
  link: string;
}

function Breadcrumb({ breadCrumbData }: { breadCrumbData: BreadCrumbItem[] }) {
  return (
    <div className="">
      <BC
        separator=">"
        className=" text-sm! md:text-base!"
        items={breadCrumbData.map((item) => ({

          title: (
            <a href={item.link} className="text-blue-500 hover:underline">
              {item.title}
            </a>
          ),
        })
      )
        
        }
      />
    </div>
  );
}

export default Breadcrumb;
