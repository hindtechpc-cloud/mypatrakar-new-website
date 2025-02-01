import React from "react";
import Menu from "../shared/MenuBar";
// import TopNews from "../TopNews/TopNews";
import { news } from "../../../navigation/news";
import TopNewsItems from "../TopNews/TopNewsItems";

export default function Country() {
 
  return (
    <div>
      <Menu menuText={"Country"} menu={[]} />
      <TopNewsItems
        topNewsItems={news}
        className={"grid grid-cols-1 sm:grid-cols-2 gap-4 my-2"}
      />
    </div>
  );
}
