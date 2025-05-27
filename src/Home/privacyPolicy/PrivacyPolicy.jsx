import { useEffect, useState } from "react";
import { GetPrivacyPolicyData } from "../../../api";

import HtmlToPlainText from "../../utils/HtmlToPlainText";

export default function PrivacyPolicy() {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await GetPrivacyPolicyData("MYAWR241227001");
        console.log(res.data.response);
        if (res) {
          setPolicyData(res.data.response);
        } else {
          console.error("Failed to fetch Privacy Policy data");
        }
      } catch (error) {
        console.error("Error fetching Privacy Policy data:", error);
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
          {/* {policyData?.page_icon_url && (
            <img
              src={policyData.page_icon_url||}
              alt="icon"
              className="w-8 h-8 rounded bg-white p-1"
            />
          )} */}
          <h1 className="font-bold text-lg md:text-xl">
            {policyData?.title || "Privacy Policy"}
          </h1>
        </header>

        {/* Content Section */}
        <div className="flex flex-col w-full items-start justify-start p-5">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : policyData ? (
            <>
              <HtmlToPlainText
                htmlContent={policyData.content}
                className="text-gray-800 text-sm md:text-base leading-relaxed"
              />
              <p className="text-sm text-gray-400 mt-4">
                Last updated: {new Date(policyData.date).toLocaleDateString()}
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
