import React from "react";
import FooterMenu from "./footerMenu";
import FooterFaceBook from "./FooterFaceBook";
// import FaceBookClone from './FaceBookClone'
import FooterTwitter from "./FooterTwitter";
import PostsListWidget from "./PostsListWidget";
import SourceWidget from "./SourceWidget";
import FooterBottom from "./FooterBottom";
import HeaderAd from "../TopBar/HeaderAd";

export default function Footer() {
  return (
    <div>
      <div className=" flex items-center justify-center mx-auto">
        {" "}
        <HeaderAd
          className="my-4 flex justify-center items-center bg-gray-300 rounded shadow 
             w-full h-[100px] sm:w-[728px] sm:h-[90px] md:w-[970px] mx-auto"
        />
        {/* <Horoscope/> */}
      </div>
      <div className="bg-blue-950 text-gray-200 py-10 font-noto ">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between md:items-start sm:items-center gap-5 my-2 md:mx-14 sm:mx-8 mx-2 ">
          <FooterMenu />
          <FooterFaceBook />
          <FooterTwitter />
          <PostsListWidget />
          <SourceWidget className="mx-auto  text-white shadow-lg w-[300px] `" />
        </div>
      </div>
      <FooterBottom />
    </div>
  );
}
