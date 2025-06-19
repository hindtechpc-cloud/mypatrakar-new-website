// src/Home/termsAndConditions/TermsAndConditions.jsx
import React, { useEffect, useState } from "react";
import { GetTermsAndConditionData } from "../../../api";
import HtmlToPlainText from "../../utils/HtmlToPlainText";

export default function TermsAndCondition() {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await GetTermsAndConditionData("MYAWR241227001");
        console.log(res.data.response);
        if (res) {
          setTermsData(res.data.response);
        } else {
          console.error("Failed to fetch Terms and Conditions data");
        }
      } catch (error) {
        console.error("Error fetching Terms and Conditions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-red-100 w-full min-h-screen py-5 px-4 md:px-10">
      <div className="bg-gray-50 rounded-xl shadow-lg mx-auto max-w-4xl">
        {/* Header */}
        <header className="bg-red-500 text-gray-50 p-4 rounded-t-xl flex items-center gap-3">
          {/* {termsData?.page_icon_url && (
            <img
              src={termsData.page_icon_url}
              alt="icon"
              className="w-8 h-8 rounded bg-white p-1"
            />
          )} */}
          <h1 className="font-bold text-lg md:text-xl">
            {termsData?.title || "Terms & Conditions"}
          </h1>
        </header>

        {/* Content Section */}
        <div className="flex flex-col w-full items-start justify-start p-5">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : termsData ? (
            <>
              <HtmlToPlainText
                htmlContent={termsData.content}
                className="text-gray-800 text-sm md:text-base leading-relaxed"
              />
              <p className="text-sm text-gray-400 mt-4">
                Last updated:{" "}
                {new Date(termsData.date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-red-500 text-sm">Failed to load content.</p>
          )}
        </div>
      </div>
    </div>
  );
}
