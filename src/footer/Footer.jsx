import React from "react";
import FooterMenu from "./footerMenu";
import FooterFaceBook from "./FooterFaceBook";
// import FaceBookClone from './FaceBookClone'
import FooterTwitter from "./FooterTwitter";
import PostsListWidget from "./PostsListWidget";
import SourceWidget from "./SourceWidget";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <div>
      <div className="bg-blue-950 text-gray-200 py-10 font-noto mt-5">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between md:items-start sm:items-center gap-5 my-2 md:mx-14 sm:mx-8 mx-2 ">
          <FooterMenu />
          <FooterFaceBook />
          <FooterTwitter />
          <PostsListWidget />
          <SourceWidget />
        </div>
      </div>
      <FooterBottom />
    </div>
  );
}
