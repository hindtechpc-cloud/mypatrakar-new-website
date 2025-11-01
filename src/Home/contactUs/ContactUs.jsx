// src/Home/contactUs/ContactUs.jsx
import React, { useEffect, useState } from "react";
import { GetContactData } from "../../../api";
import call from "../../assets/telephone.svg";
import whatsapp from "../../assets/whatsapp.svg";
import { FaPhone } from "react-icons/fa";
import { MdEmail, MdMap } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { useWebThemeContext } from "../../context/WebThemeContext";

export default function ContactUs() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
const {webTheme}=useWebThemeContext();
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await GetContactData("");
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
    <div className="bg-red-100 w-full min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className=" text-white py-4 px-6" style={{
          background:webTheme["bg-color"]
        }}>
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

            {contactData?.owner_phone_no && (
              <p className="text-sm mt-2 flex items-center justify-start gap-2">
                {" "}
                <span>
                  <FaPhone className="rotate-90 flex items-center justify-start gap-2 " />
                </span>
                <span>{contactData?.owner_phone_no}</span>
              </p>
            )}
            {contactData?.owner_email && (
              <p className="text-sm flex items-center justify-start gap-2 mt-2">
                {" "}
                <span>
                  <MdEmail />
                </span>
                <span>{contactData?.owner_email}</span>
              </p>
            )}

            <p className="text-sm mt-2"> {contactData?.owner_phone_no}</p>
            <p className="text-sm"> {contactData?.owner_email}</p>
          </div>

          <section className="md:flex flex-1 items-start justify-between flex-wrap gap-5">
            {/* Address and Contact */}
            <div className="mb-6 md:w-1/2">
              <h3 className="text-lg font-semibold">Address:</h3>
              {contactData?.address && (
                <p className="text-sm  whitespace-pre-line">
                  {/* {contactData?.address} */}
                  <p className="text-sm  flex items-start  justify-start gap-2 mt-1">
                    {" "}
                    <span className="mt-1">
                      <FiMapPin className=" flex items-center justify-start gap-2 " />
                    </span>
                    <span className="">{contactData?.address}</span>
                  </p>
                </p>
              )}
              {contactData?.agency_phone_no && (
                <p className="text-sm mt-2 flex items-center justify-start gap-2">
                  {" "}
                  <span>
                    <FaPhone className="rotate-90 flex items-center justify-start gap-2 " />
                  </span>
                  <span>{contactData?.agency_phone_no}</span>
                </p>
              )}
              {contactData?.agency_email && (
                <p className="text-sm flex items-center justify-start gap-2">
                  {" "}
                  <span>
                    <MdEmail />
                  </span>
                  <span>{contactData?.agency_email}</span>
                </p>
              )}
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-5 md:items-center">
              {/* Call Support */}
              {contactData?.agency_phone_no && (
                <div className="text-center">
                  <a href={`tel:+91${contactData?.agency_phone_no}`}>
                    <img
                      src={call}
                      alt="Call support"
                      className="w-12 h-12 cursor-pointer hover:scale-110 transform transition duration-300 animate-pulse"
                    />
                  </a>
                </div>
              )}

              {/* WhatsApp Support */}
              {contactData?.whatsapp_no && (
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
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
