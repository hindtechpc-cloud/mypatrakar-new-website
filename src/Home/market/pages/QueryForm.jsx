import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation } from "react-router-dom";

const SellerQueryForm = () => {
  const [formData, setFormData] = useState({
    item: "",
    name: "",
    contact: "",
    description: "",
  });

  const location = useLocation();
  const isBuyer = location.pathname.includes("buyer");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Query submitted successfully!");
    setFormData({ item: "", name: "", contact: "", description: "" });
  };

  const handleWhatsApp = () => {
    const { item, name, contact, description } = formData;
    const message = `Hello, I want to ${isBuyer ? "buy" : "sell"}: ${item}\nName: ${name}\nContact: ${contact}\nDescription: ${description}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918960905167?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* <div className="flex items-center justify-between mb-4">
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            onClick={() => window.history.back()}
          >
            <MdOutlineKeyboardBackspace />
          </button>
          <h2 className="text-center text-gray-400 font-semibold mb-2">
            Raise a query
          </h2>
        </div> */}
         <div className="flex items-center mb-6">
                <button
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
                  onClick={() => window.history.back()}
                >
                  <MdOutlineKeyboardBackspace size={20} />
                </button>
                <h1 className="text-center flex-1 text-lg font-semibold">Raise a query</h1>
              </div>

        <p className="text-xs uppercase text-gray-600">Hello!</p>
        <h1 className="text-2xl font-bold text-black mb-6">
          {isBuyer ? "Buyer" : "Seller"} Query Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              What do you want to {isBuyer ? "buy" : "sell"}?
            </label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            SUBMIT
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full border-2 border-green-500 text-green-700 font-semibold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-50 transition"
        >
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Whatsapp Us
        </button>
      </div>
    </div>
  );
};

export default SellerQueryForm;
