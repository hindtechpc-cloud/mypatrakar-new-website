// src/Home/aboutMypatrakar/AboutMypatrakar.jsx
import React, { useEffect, useState } from "react";
import { GetAboutUsData } from "../../../api";
import HtmlToPlainText from "../../utils/HtmlToPlainText";
import { useWebThemeContext } from "../../context/WebThemeContext";

export default function AboutMypatrakar() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {webTheme}=useWebThemeContext();

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await GetAboutUsData("MYAWR241227001");
        console.log(res.data.response)
        if (res) {
          setAboutData(res.data.response);
        } else {
          console.error("Failed to fetch About Us data");
        }
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-red-100 w-full min-h-screen py-5  md:px-10">
   <div className="bg-gray-50 rounded-xl shadow-lg mx-auto max-w-4xl">


        <header className=" text-gray-50 p-4 rounded-t-xl flex items-center gap-3" style={{
        background:webTheme["bg-color"]
       }}>
          {/* {termsData?.page_icon_url && (
            <img
              src={termsData.page_icon_url}
              alt="icon"
              className="w-8 h-8 rounded bg-white p-1"
            />
          )} */}
          <h1 className="font-bold text-lg md:text-xl">
            {aboutData?.title || "About Us"}
          </h1>
        </header>

      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      ) : aboutData ? (
        <div className="flex flex-col w-full items-start justify-start mt-6 px-5">
          <HtmlToPlainText
            htmlContent={aboutData.content}
            maxLength={15000}
            className="mb-5 text-gray-700 text-base leading-relaxed"
          />
          <p className="text-sm text-gray-400 mt-2">
            Last updated: {new Date(aboutData.date).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-4">
          Unable to load About Us content.
        </p>
      )}
   </div>
    </div>
  );
}
