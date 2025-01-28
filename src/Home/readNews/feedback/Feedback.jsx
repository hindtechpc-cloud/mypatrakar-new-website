import { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // empty all error
    setErrors({
      name: "",
      email: "",
      comments: "",
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.comments) tempErrors.comments = "Comments cannot be empty";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // try {
    //   const response = await fetch("/api/feedback", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     alert("Feedback submitted successfully!");
    //     setFormData({ name: "", email: "", comments: "" });
    //     setErrors({});
    //   } else {
    //     alert("Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting feedback:", error);
    // }
    setFormData({
      name: "",
      email: "",
      comments: "",
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Write your feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name..."
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address..."
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="comments" className="block font-medium text-gray-700">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Write your feedback..."
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            rows="4"
          ></textarea>
          {errors.comments && (
            <p className="text-red-500 text-sm">{errors.comments}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full sm:w-1/4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
