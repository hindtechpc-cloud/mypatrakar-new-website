import { useState } from "react";
import whatsapp from "../../assets/whatsapp.svg";

export default function AdvertiseWithUs() {
  const [advertise, setAdvertise] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "advertise") setAdvertise(value);
    if (name === "name") setName(value);
    if (name === "contact") setContact(value);
    if (name === "description") setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = {
      advertise,
      name,
      contact,
      description,
    };
    setFormData([...formData, newFormData]); // Push new data into the array
    console.log(formData); // Log the form data (optional)
    setAdvertise("");
    setName("");
    setContact("");
    setDescription("");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = contact || "9170446729"; // If user doesn't provide contact, default to the given number
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="bg-red-100 w-full min-h-screen py-8 px-4">
      <div className="bg-white rounded-lg shadow-xl mx-auto max-w-4xl">
        {/* Header */}
        <header className="bg-red-500 text-white p-6 rounded-t-lg">
          <h1 className="text-xl md:text-2xl font-bold">Advertise With Us</h1>
        </header>

        <div className="p-6 space-y-6">
          {/* Raise Query Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Raise a Query</h2>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Advertising Query */}
            <div>
              <label
                htmlFor="advertise"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                What do you want to advertise for?
              </label>
              <select
                id="advertise"
                name="advertise"
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-red-500 focus:border-red-500"
                value={advertise}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="product">Selling a product</option>
                <option value="service">Offering a service</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-red-500 focus:border-red-500"
                value={name}
                onChange={handleChange}
              />
            </div>

            {/* Contact Number */}
            <div>
              <label
                htmlFor="contact"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder="Enter your contact number"
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-red-500 focus:border-red-500"
                value={contact}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter a brief description"
                rows="4"
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-red-500 focus:border-red-500"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center flex items-center justify-center mx-auto w-1/3">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 w-full text-white font-bold py-2 px-6 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          {/* OR Section */}
          <div className="flex items-center justify-center my-4">
          <div className="bg-gray-200 w-full h-[1px]"/>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                
              OR
              <hr />
            </span>
            <div className="bg-gray-200 w-full h-[1px]"/>
          </div>

          {/* WhatsApp Section */}
          <div
            className=" mx-auto w-1/3 flex items-center justify-center border border-green-500 py-2  px-3
            rounded-lg hover:bg-green-50 transition duration-300 cursor-pointer"
            onClick={handleWhatsAppClick}
          >
            <img src={whatsapp} alt="WhatsApp" className="w-8 h-8 mr-3" />
            <span className="text-green-600 font-bold text-lg">
              WhatsApp Us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
