import { useState } from "react";
import { SubmitCommentsReply } from "../../../../api";
import { useParams } from "react-router-dom";
// import { postReply } from "../../../../api";

export default function ReplyOnComment({ parentCommentId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reply: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {newsId}=useParams();

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSubmitError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
    }
    if (!formData.reply.trim()) tempErrors.reply = "Reply cannot be empty";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");

    try {
      const response = await SubmitCommentsReply({
        comment_id:parentCommentId,
        news_id:newsId,
        name: formData.name,
        email: formData.email,
        reply: formData.reply,
      });

      if (response.status === 201) {
        setFormData({ name: "", email: "", reply: "" });
        onSuccess(response.data);
      } else {
        setSubmitError(response.message || "Failed to post reply");
      }
    } catch (error) {
      setSubmitError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {submitError && (
        <div className="bg-red-50 text-red-600 text-sm p-2 rounded">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full px-3 py-2 text-sm border rounded ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full px-3 py-2 text-sm border rounded ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <textarea
          name="reply"
          value={formData.reply}
          onChange={handleChange}
          placeholder="Write your reply..."
          rows="3"
          className={`w-full px-3 py-2 text-sm border rounded ${
            errors.reply ? "border-red-300" : "border-gray-300"
          }`}
        ></textarea>
        {errors.reply && <p className="text-red-500 text-xs mt-1">{errors.reply}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => onSuccess(null)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-sm text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>
      </div>
    </form>
  );
}