import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { GetOurRepoterData } from "../../../api";

export default function OurReporters() {
  const [reporters, setReporters] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await GetOurRepoterData("MYAWR241227001");
      const data = res?.data?.response;

      // Ensure it is an array; if single object, convert to array
      if (data) {
        const result = Array.isArray(data) ? data : [data];
        setReporters(result);
      }
    } catch (error) {
      console.error("Failed to load reporter:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  if (reporters.length === 0) {
    return <div className="p-10 text-center text-lg">No reporters found.</div>;
  }

  return (
    <div className="bg-red-50 w-full min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-800">
          Our Reporters / Agencies
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reporters.map((rep, index) => {
            const {
              name,
              address,
              owner_email,
              owner_phone_no,
              whatsapp_no
            } = rep;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {name}
                </h2>
                <p className="text-gray-600 text-sm mt-2 whitespace-pre-line text-center">
                  {address}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-5">
                  {owner_email && (
                    <a
                      href={`mailto:${owner_email}`}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-red-700"
                    >
                      <FaEnvelope /> Email
                    </a>
                  )}
                  {whatsapp_no && (
                    <a
                      href={`https://wa.me/+91${whatsapp_no}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-green-700"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                  )}
                  {owner_phone_no && (
                    <a
                      href={`tel:+91${owner_phone_no}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-blue-600"
                    >
                      <FaPhone /> Call
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
