// import { useState } from "react";
// import { SubmitComment } from "../../../../api";
// import { useParams } from "react-router-dom";
// import { checkAuth } from "../../../utils/checkAuth";

// export default function Feedback() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     comment: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [submitError, setSubmitError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);

//   const { newsId } = useParams();
//   const isAuthenticated = checkAuth();

//   const handleChange = (e) => {
//     setSuccessMessage("");
//     setSubmitError("");
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Update character count for comments
//     if (name === "comment") {
//       setCharacterCount(value.length);
//     }
//   };

//   const validate = () => {
//     const tempErrors = {};
//     if (!formData.name.trim()) tempErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       tempErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       tempErrors.email = "Please enter a valid email address";
//     }
//     if (!formData.comment.trim()) {
//       tempErrors.comment = "Comment cannot be empty";
//     } else if (formData.comment.length > 500) {
//       tempErrors.comment = "Comment must be less than 500 characters";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;


//     setLoading(true);
//     setSubmitError("");
//     setSuccessMessage("");

//     try {
//       const res = await SubmitComment({
//         name: formData.name,
//         email: formData.email,
//         comment: formData.comment,
//         news_id: newsId,
//       });

//       if (res?.status === 200 || res?.status_code === 200) {
//         setFormData({ name: "", email: "", comment: "" });
//         setCharacterCount(0);
//         setSuccessMessage("Thank you for your feedback! Your comment has been posted successfully.");
//       } else {
//         setSubmitError(res?.message || "Failed to post comment. Please try again.");
//       }
//     } catch (error) {
//       setSubmitError(error.message || "Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-sm mt-10 border border-gray-100">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Thoughts</h2>
      
//       {/* Status Messages */}
//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
//           <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//           <div>
//             <h3 className="text-sm font-medium text-green-800">Success!</h3>
//             <p className="text-sm text-green-700 mt-1">{successMessage}</p>
//           </div>
//         </div>
//       )}

//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//           <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//           </svg>
//           <div>
//             <h3 className="text-sm font-medium text-red-800">Oops!</h3>
//             <p className="text-sm text-red-700 mt-1">{submitError}</p>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Your Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="John Doe"
//               className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
//               }`}
//               aria-invalid={!!errors.name}
//               aria-describedby={errors.name ? "name-error" : undefined}
//             />
//             {errors.name && (
//               <p id="name-error" className="mt-1 text-sm text-red-600">
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="your@email.com"
//               className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
//               }`}
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? "email-error" : undefined}
//             />
//             {errors.email && (
//               <p id="email-error" className="mt-1 text-sm text-red-600">
//                 {errors.email}
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//               Your Feedback <span className="text-red-500">*</span>
//             </label>
//             <span className={`text-xs ${characterCount > 500 ? 'text-red-500' : 'text-gray-500'}`}>
//               {characterCount}/500
//             </span>
//           </div>
//           <textarea
//             id="comment"
//             name="comment"
//             value={formData.comment}
//             onChange={handleChange}
//             placeholder="What are your thoughts?"
//             className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//               errors.comment ? "border-red-300 bg-red-50" : "border-gray-300"
//             }`}
//             rows="5"
//             maxLength="500"
//             aria-invalid={!!errors.comment}
//             aria-describedby={errors.comment ? "comment-error" : undefined}
//           ></textarea>
//           {errors.comment && (
//             <p id="comment-error" className="mt-1 text-sm text-red-600">
//               {errors.comment}
//             </p>
//           )}
//         </div>

//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full md:w-auto px-6 py-3 text-sm font-medium rounded-lg transition-all ${
//               loading
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
//             } flex items-center justify-center`}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Posting...
//               </>
//             ) : (
//               "Post Feedback"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { SubmitComment } from "../../../../api";
import { useParams } from "react-router-dom";
import { checkAuth } from "../../../utils/checkAuth";

export default function Feedback() {
  const user = checkAuth(); // ⬅️ Authenticated user, if any
  // console.log(user)
  const isAuthenticated = !!user && user!== null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const { newsId } = useParams();

  const handleChange = (e) => {
    setSuccessMessage("");
    setSubmitError("");
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "comment") {
      setCharacterCount(value.length);
    }
  };

  const validate = () => {
    const tempErrors = {};

    if (!isAuthenticated) {
      if (!formData.name.trim()) tempErrors.name = "Name is required";
      if (!formData.email.trim()) {
        tempErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        tempErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.comment.trim()) {
      tempErrors.comment = "Comment cannot be empty";
    } else if (formData.comment.length > 500) {
      tempErrors.comment = "Comment must be less than 500 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");
    setSuccessMessage("");

    try {
      const payload = {
        name: isAuthenticated ? user?.user_name : formData?.name,
        email: isAuthenticated ? user.email : formData?.email,
        comment: formData?.comment,
        news_id: newsId,
      };

      const res = await SubmitComment(payload);

      if (res?.status === 200 || res?.status_code === 200) {
        setFormData({ name: "", email: "", comment: "" });
        setCharacterCount(0);
        setSuccessMessage("Thank you for your feedback! Your comment has been posted successfully.");
      } else {
        setSubmitError(res?.message || "Failed to post comment. Please try again.");
      }
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-sm mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Thoughts</h2>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${characterCount > 500 ? "text-red-500" : "text-gray-500"}`}>
              {characterCount}/500
            </span>
          </div>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="What are your thoughts?"
            className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.comment ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            rows="5"
            maxLength="500"
          ></textarea>
          {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-6 py-3 text-sm font-medium rounded-lg transition-all ${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            } flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Posting...
              </>
            ) : (
              "Post Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
