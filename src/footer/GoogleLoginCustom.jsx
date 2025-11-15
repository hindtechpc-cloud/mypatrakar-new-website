import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginCustomButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess,
    onError,
    flow: "implicit", // or "auth-code" if backend verification needed
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
};

// Wrap inside GoogleOAuthProvider so context works
const GoogleLoginCustom = (props) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLoginCustomButton {...props} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginCustom;
