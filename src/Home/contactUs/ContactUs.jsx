import { useEffect, useState } from "react";
import { GetContactData } from "../../../api";
import call from "../../assets/telephone.svg";
import whatsapp from "../../assets/whatsapp.svg";

export default function ContactUs() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await GetContactData("MYAWR241227001");
        console.log(res.data.response);
        if (res) {
          setContactData(res.data.response);
        } else {
          console.error("Failed to load contact data.");
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-red-100 w-full h-full py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-red-600 text-white py-4 px-6">
          <h1 className="font-bold text-xl text-start">CONTACT US</h1>
        </header>

        {/* Main Content */}
        <section className="p-6">
          {/* Brand Information */}
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">MyPatrakar</h2>
            </div>
          </div>

          {/* Owner Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">{contactData?.name}</h3>
            <p className="text-sm">Founder and Owner</p>
            <p className="text-sm mt-2">📞 {contactData?.owner_phone_no}</p>
            <p className="text-sm">📧 {contactData?.owner_email}</p>
          </div>

          <section className="md:flex flex-1 items-start justify-between flex-wrap gap-5">
            {/* Address and Contact */}
            <div className="mb-6 md:w-1/2">
              <h3 className="text-lg font-semibold">Address:</h3>
              <p className="text-sm mt-2 whitespace-pre-line">
                {contactData?.address}
              </p>
              <p className="text-sm mt-2">📞 {contactData?.agency_phone_no}</p>
              <p className="text-sm">📧 {contactData?.agency_email}</p>
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-5 md:items-center">
              {/* Call Support */}
              <div className="text-center">
                <a href={`tel:+91${contactData?.agency_phone_no}`}>
                  <img
                    src={call}
                    alt="Call support"
                    className="w-12 h-12 cursor-pointer hover:scale-110 transform transition duration-300 animate-pulse"
                  />
                </a>
              </div>

              {/* WhatsApp Support */}
              <div className="text-center">
                <a
                  href={`https://wa.me/+91${contactData?.whatsapp_no}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={whatsapp}
                    alt="WhatsApp support"
                    className="w-12 h-12 cursor-pointer hover:scale-110 transform transition duration-300 animate-pulse"
                  />
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
