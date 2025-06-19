// src/Home/aboutMypatrakar/AboutMypatrakar.jsx
import React, { useEffect, useState } from "react";
import { GetAboutUsData } from "../../../api";
import HtmlToPlainText from "../../utils/HtmlToPlainText";

export default function AboutMypatrakar() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="p-4 md:p-8">
      <h1 className="text-gray-900 text-center font-bold text-2xl mt-5">
        {aboutData?.title || "About MyPatrakar"}
      </h1>

      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      ) : aboutData ? (
        <div className="flex flex-col w-full items-start justify-start mt-6">
          <HtmlToPlainText
            htmlContent={aboutData.content}
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
  );
}
