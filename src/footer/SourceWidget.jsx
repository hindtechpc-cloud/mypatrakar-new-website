import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GetUserAuthentication } from "../../api";
import toast from "react-hot-toast";
import image from "../assets/Ellipse.svg";

export default function SourceWidget({ className }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const formData = new FormData();
      formData.append("user_email", decoded.email);
      formData.append("user_name", decoded.name);
      formData.append("user_image", decoded.picture);

      const user = await GetUserAuthentication(formData);
      console.log(user.data.response);

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          user_id: user.data.response.user_id,
          user_name: user.data.response.name,
          email: user.data.response.email,
        })
      );

      const from = location.state?.from?.pathname || "/";
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow-md ${className}`}>
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img src={image} alt="Company logo" className="w-20 h-20" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue to your account</p>
      </div>

      {/* Google Login */}
      <div className="mb-6">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-500">Signing you in...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                setErrorMsg("Google login failed. Try again.");
                toast.error("Google login failed. Try again.");
              }}
              size="medium"
              shape="pill"
              text="continue_with"
              theme="filled_blue"
              width="100%"
            />
            
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
          {errorMsg}
        </div>
      )}

 
    
    </div>
  );
}