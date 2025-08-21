// // src/footer/SourceWidget.jsx

// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { GetUserAuthentication } from "../../api";
// import toast from "react-hot-toast";
// import image from "../assets/Ellipse.svg";
// import PropTypes from "prop-types";

// const SourceWidget = ({ className = "",redirectTo }) => {
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const handleSuccess = async (credentialResponse) => {
//     if (!credentialResponse?.credential) {
//       setErrorMsg("Invalid credentials received");
//       toast.error("Login failed. Invalid credentials.");
//       return;
//     }

//     setLoading(true);
//     setErrorMsg("");

//     try {
//       const decoded = jwtDecode(credentialResponse.credential);

//       // Validate required fields from Google response
//       if (!decoded.email || !decoded.name || !decoded.picture) {
//         throw new Error("Incomplete user data from Google");
//       }

//       const formData = new FormData();
//       formData.append("user_email", decoded.email);
//       formData.append("user_name", decoded.name);
//       formData.append("user_image", decoded.picture);

//       const response = await GetUserAuthentication(formData);

//       if (!response?.data?.response) {
//         throw new Error("Invalid response from server");
//       }

//       const userData = {
//         user_id: response.data.response.user_id,
//         user_name: response.data.response.name,
//         email: response.data.response.email,
//       };
//       sessionStorage.setItem("user", JSON.stringify(userData));

//       const redirectPath = state?.from?.pathname||redirectTo||"/";
//       toast.success("Login successful!");
//       navigate(redirectPath, { replace: true });
//     } catch (error) {
//       console.error("Login Error:", error);
//       const message = error.response?.data?.message ||
//                       error.message ||
//                       "Login failed. Please try again.";
//       setErrorMsg(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     const message = "Google login failed. Please try again.";
//     setErrorMsg(message);
//     toast.error(message);
//   };

//   return (
//     <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow-md ${className}`}>
//       {/* Logo and Title */}
// <div className="text-center mb-8">
//   <div className="flex justify-center mb-4">
//     <img
//       src={image}
//       alt="Company logo"
//       className="w-20 h-20"
//       loading="lazy"
//     />
//   </div>
//   <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//   <p className="text-gray-600">Sign in to continue to your account</p>
// </div>

//       {/* Google Login */}
//       <div className="mb-6">
//         {loading ? (
//           <div className="flex flex-col items-center">
//             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
//             <p className="text-gray-500">Signing you in...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <GoogleLogin
//               onSuccess={handleSuccess}
//               onError={handleGoogleError}
//               size="medium"
//               shape="pill"
//               text="continue_with"
//               theme="filled_blue"
//               width="100%"
//               useOneTap
//             />
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {errorMsg && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
//           {errorMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// SourceWidget.propTypes = {
//   className: PropTypes.string,
// };

// export default SourceWidget;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GetUserAuthentication } from "../../api";
import toast from "react-hot-toast";
import image from "../assets/Ellipse.svg";
import PropTypes from "prop-types";
import Loader from "../utils/Loader";

const SourceWidget = ({
  className = "",
  redirectTo,
  onSuccess,
  setShowLoginOverlay,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setErrorMsg("Invalid credentials received");
      toast.error("Login failed. Invalid credentials.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);

      if (!decoded.email || !decoded.name || !decoded.picture) {
        throw new Error("Incomplete user data from Google");
      }

      const formData = new FormData();
      formData.append("user_email", decoded.email);
      formData.append("user_name", decoded.name);
      formData.append("user_image", decoded.picture);

      const response = await GetUserAuthentication(formData);
      console.log(response);
      if (!response?.data?.response) {
        throw new Error("Invalid response from server");
      }

      const userData = {
        user_id: response.data.response.user_id,
        user_name: response.data.response.name,
        email: response.data.response.email,
      };
      sessionStorage.setItem("user", JSON.stringify(userData));

      setShowLoginOverlay(false);
      toast.success("Login successful!");
      const redirectPath = state?.from?.pathname || redirectTo || "/";
      navigate(redirectPath, { replace: true });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    const message = "Google login failed. Please try again.";
    setErrorMsg(message);
    toast.error(message);
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded ${className}`}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt="Company logo"
            className="w-20 h-20"
            loading="lazy"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue to your account</p>
      </div>

      <div className="mb-6">
        {loading ? (
          <Loader message="Signing you in..." />
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleGoogleError}
            size="medium"
            shape="pill"
            text="continue_with"
            theme="filled_blue"
            width="100%"
            useOneTap
          />
        )}
      </div>

      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

SourceWidget.propTypes = {
  className: PropTypes.string,
  redirectTo: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default SourceWidget;
