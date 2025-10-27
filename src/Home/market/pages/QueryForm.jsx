// import React, { useState } from "react";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { useLocation } from "react-router-dom";
// import { AdvertiseWithUsApi } from "../../../../api";
// import toast from "react-hot-toast";
// import SourceWidget from "../../../footer/SourceWidget";

// const SellerQueryForm = () => {
//   const location = useLocation();
//   const isBuyer = location.pathname.includes("buyer");

//   const [formData, setFormData] = useState({
//     item: "",
//     name: "",
//     contact: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [isOpenLogin, setIsOpenLogin] = useState(false);

//   const user = JSON.parse(sessionStorage.getItem("user"));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "contact" && !/^\d*$/.test(value)) return; // Only numbers
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const { item, name, contact, description } = formData;

//     if (!item || !name || !contact || !description) {
//       toast.error("All fields are required.");
//       return false;
//     }

//     if (contact.length < 10 || contact.length > 12) {
//       toast.error("Contact number must be 10-12 digits.");
//       return false;
//     }

//     return true;
//   };

//   const submitQuery = async () => {
//     if (!user) {
//       setIsOpenLogin(true);
//       toast.error("Please login to submit your query.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await AdvertiseWithUsApi({
//         ...formData,
//         ContactNumber: formData.contact,
//         user_id: user.user_id,
//         user_type: isBuyer ? "0" : "1",
//       });

//       toast.success("Your query has been submitted!"+ response);
//       setFormData({ item: "", name: "", contact: "", description: "" });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit query. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) submitQuery();
//   };

//   const handleWhatsApp = () => {
//     const { item, name, contact, description } = formData;

//     const message = `Hello, I want to ${isBuyer ? "buy" : "sell"}: ${item}
// Name: ${name}
// Contact: ${contact}
// Description: ${description}`;

//     const encoded = encodeURIComponent(message);
//     window.open(`https://wa.me/918960905167?text=${encoded}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="flex items-center mb-6">
//           <button
//             className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
//             onClick={() => window.history.back()}
//           >
//             <MdOutlineKeyboardBackspace size={20} />
//           </button>
//           <h1 className="text-center flex-1 text-lg font-semibold">
//             Raise a Query
//           </h1>
//         </div>

//         {/* Title */}
//         <p className="text-xs uppercase text-gray-600">Hello!</p>
//         <h1 className="text-2xl font-bold text-black mb-6">
//           {isBuyer ? "Buyer" : "Seller"} Query Form
//         </h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputField
//             label={`What do you want to ${isBuyer ? "buy" : "sell"}?`}
//             name="item"
//             value={formData.item}
//             onChange={handleChange}
//           />

//           <InputField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />

//           <InputField
//             label="Contact Number"
//             name="contact"
//             type="tel"
//             maxLength={12}
//             value={formData.contact}
//             onChange={handleChange}
//           />

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full text-white py-2 rounded-md transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//           >
//             {loading ? "Submitting..." : "SUBMIT"}
//           </button>
//         </form>

//         {/* Login prompt */}
//         {isOpenLogin && (
//           <div className="fixed inset-0 top-20 sm:top-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div
//               className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md
//           "
//             >
//               <SourceWidget setShowLoginOverlay={setIsOpenLogin} />
//             </div>
//           </div>
//         )}

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-3 text-sm text-gray-500">OR</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         {/* WhatsApp Button */}
//         <button
//           onClick={handleWhatsApp}
//           className="w-full border-2 border-green-500 text-green-700 font-semibold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-50 transition"
//         >
//           <img
//             src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
//             alt="WhatsApp"
//             className="w-5 h-5"
//           />
//           Whatsapp Us
//         </button>
//       </div>
//     </div>
//   );
// };

// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   maxLength,
// }) => (
//   <div>
//     <label className="block text-sm text-gray-600 mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       maxLength={maxLength}
//       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       required
//     />
//   </div>
// );

// export default SellerQueryForm;




import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { AdvertiseWithUsApi } from "../../../../api";
import toast from "react-hot-toast";
import SourceWidget from "../../../footer/SourceWidget";
import { FaWhatsapp } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const SellerQueryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBuyer = location.pathname.includes("buyer");

  const [formData, setFormData] = useState({
    item: "",
    name: "",
    contact: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [errors, setErrors] = useState({});

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && !/^\d*$/.test(value)) return; // Only numbers
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { item, name, contact, description } = formData;

    if (!item) newErrors.item = "Please specify the item";
    if (!name) newErrors.name = "Name is required";
    if (!contact) {
      newErrors.contact = "Contact number is required";
    } else if (contact.length < 10 || contact.length > 10) {
      newErrors.contact = "Contact must be 10 digits";
    }
    if (!description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuery = async () => {
    if (!user) {
      setIsOpenLogin(true);
      toast.error("Please login to submit your query");
      return;
    }

    setLoading(true);
    try {
      const response = await AdvertiseWithUsApi({
        ...formData,
        ContactNumber: formData.contact,
        user_id: user.user_id,
        user_type: isBuyer ? "0" : "1",
      });

      toast.success(
        <div>
          <p className="font-medium">Query submitted successfully!</p>
          <p className="text-sm">We'll contact you shortly.</p>
        </div>,
        { duration: 4000 }
      );
      setFormData({ item: "", name: "", contact: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error(
        <div>
          <p className="font-medium">Submission failed</p>
          <p className="text-sm">Please try again later</p>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) submitQuery();
  };

  const handleWhatsApp = () => {
    const { item, name, contact, description } = formData;
    const hasEmptyFields = !item || !name || !contact || !description;

    if (hasEmptyFields) {
      toast.error("Please fill all fields before contacting via WhatsApp");
      return;
    }

    const message = `Hello, I want to ${isBuyer ? "buy" : "sell"}: ${item}
Name: ${name}
Contact: ${contact}
Description: ${description}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918960905167?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 sm:p-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <MdOutlineKeyboardBackspace size={20} />
          </button>
          <h1 className="text-center text-xl sm:text-2xl font-bold">
            {isBuyer ? "Buyer" : "Seller"} Query Form
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          {/* Form Title */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Hello {user?.name ? user.name.split(" ")[0] : "User"}!
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              Tell us what you want to {isBuyer ? "buy" : "sell"}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label={`What do you want to ${isBuyer ? "buy" : "sell"}?*`}
              name="item"
              value={formData.item}
              onChange={handleChange}
              error={errors.item}
              placeholder={`e.g. ${isBuyer ? "iPhone 13" : "Used furniture"}`}
            />

            <InputField
              label="Your Name*"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter your full name"
            />

            <InputField
              label="Contact Number*"
              name="contact"
              type="tel"
              maxLength={10}
              value={formData.contact}
              onChange={handleChange}
              error={errors.contact}
              placeholder="10 digit mobile number"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder={`Describe what you want to ${
                  isBuyer ? "buy" : "sell"
                } in detail`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" /> {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "SUBMIT QUERY"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            Contact via WhatsApp
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            We typically respond within 24 hours
          </p>
        </div>

        {/* Login Modal */}
        {isOpenLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-6">
                <SourceWidget setShowLoginOverlay={setIsOpenLogin} redirectTo={isBuyer?
                  "/buyer-query-form":"/seller-query-form"
                }/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  maxLength,
  error,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <FiAlertCircle className="mr-1" /> {error}
      </p>
    )}
  </div>
);

export default SellerQueryForm;