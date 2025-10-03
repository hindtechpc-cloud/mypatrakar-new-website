import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GetUserAuthentication } from "../../api";
import toast from "react-hot-toast";
import image from "../assets/Ellipse.svg";
import PropTypes from "prop-types";
import Loader from "../utils/Loader";
import { useWebThemeContext } from "../context/WebThemeContext";

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
  const { webTheme } = useWebThemeContext();
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
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={image}
              alt="Company logo"
              className="w-20 h-20 rounded-full border-4 border-yellow-400/30 shadow-lg"
              loading="lazy"
            />
            <div className="absolute -inset-2 bg-yellow-400/20 rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-blue-200">Sign in to continue to your account</p>
      </div>

      <div className="mb-6 flex items-center justify-center">
        {loading ? (
          <div className="bg-blue-800/50 rounded-xl p-6">
            <Loader message="Signing you in..." />
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleGoogleError}
            size="medium"
            shape="pill"
            text="continue_with"
            theme="filled_red"
            width="100%"
            useOneTap
          />
        )}
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm text-center flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMsg}
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-blue-300 text-xs">
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            className=" transition-colors"
            style={{
              color: webTheme["bg-color"],
            }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className=" transition-colors"
            style={{
              color: webTheme["bg-color"],
            }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

SourceWidget.propTypes = {
  className: PropTypes.string,
  redirectTo: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default SourceWidget;
