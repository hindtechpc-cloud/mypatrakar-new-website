// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { GetUserAuthentication } from "../../api";

// import image from "../assets/Ellipse.svg";
// import image2 from "../assets/logoG.jpg"; // unused
// import play from "../assets/play.png"; // unused
// import apple from "../assets/apple.jpeg"; // unused

// export default function SourceWidget(props) {
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
// async function urlToFile(url, filename, mimeType) {
//   const res = await fetch(url);
//   const blob = await res.blob();

//   // Image ko canvas pe render kar ke jpeg me convert karenge
//   const img = new Image();
//   img.crossOrigin = "anonymous"; // cross origin error avoid karne ke liye

//   return new Promise((resolve, reject) => {
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width || 100;
//       canvas.height = img.height || 100;

//       const ctx = canvas.getContext("2d");
//       ctx.fillStyle = "#fff"; // background white for jpg
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(img, 0, 0);

//       canvas.toBlob(
//         (blob) => {
//           if (blob) {
//             const file = new File([blob], filename, { type: mimeType });
//             resolve(file);
//           } else {
//             reject(new Error("Canvas is empty"));
//           }
//         },
//         mimeType,
//         0.95
//       );
//     };

//     img.onerror = () => reject(new Error("Image load error"));
//     img.src = url;
//   });
// }

//   const navigate = useNavigate();
//   const location = useLocation();

// const handleSuccess = async (credentialResponse) => {
//   setLoading(true);
//   setErrorMsg("");

//   try {
//     const decoded = jwtDecode(credentialResponse.credential);

//     // Convert google image url to jpeg file
//     const imageFile = await urlToFile(decoded.picture, "user_image.jpg", "image/jpeg");

//     const formData = new FormData();
//     formData.append("user_email", decoded.email);
//     formData.append("user_name", decoded.name);
//     formData.append("user_image", imageFile);

//     const user = await GetUserAuthentication(formData);

//     localStorage.setItem("user", JSON.stringify(user));
//     const from = location.state?.from?.pathname || "/dashboard";
//     navigate(from, { replace: true });
//   } catch (error) {
//     console.error("Login Error:", error);
//     setErrorMsg("Login failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };




//   return (
//     <div className={props.className}>
//       {/* Logo */}
//       <div className="flex justify-center mt-10">
//         <img src={image} alt="Company logo" className="w-20" />
//       </div>

//       {/* Title */}
//       <h3 className="text-center text-md font-semibold mt-4 text-yellow-400">
//         Sign In
//       </h3>

//       {/* Google Login */}
//       <div className="flex justify-center items-center mx-auto mt-10">
//         {loading ? (
//           <div className="text-sm text-gray-300 animate-pulse">
//             Signing in...
//           </div>
//         ) : (
//           <GoogleLogin
//             onSuccess={handleSuccess}
//             onError={() => setErrorMsg("Google login failed. Try again.")}
//             size="medium"
//           />
//         )}
//       </div>

//       {/* Error Message */}
//       {errorMsg && (
//         <p className="text-center text-red-500 text-sm mt-4">{errorMsg}</p>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { GetUserAuthentication } from "../../api";

import image from "../assets/Ellipse.svg";

export default function SourceWidget(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to convert image URL to File
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const blob = await res.blob();

    // Draw image on canvas to ensure correct mime-type
    const img = new Image();
    img.crossOrigin = "anonymous"; // Avoid CORS issues

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width || 100;
        canvas.height = img.height || 100;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff"; // fill white background for jpeg
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], filename, { type: mimeType });
              resolve(file);
            } else {
              reject(new Error("Canvas is empty"));
            }
          },
          mimeType,
          0.95
        );
      };

      img.onerror = () => reject(new Error("Image load error"));
      img.src = url;
    });
  };

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google User:", decoded);

      // Convert Google profile image URL to a valid JPEG file
      const imageFile = await urlToFile(decoded.picture, "user_image.jpg", "image/jpeg");

      const formData = new FormData();
      formData.append("user_email", decoded.email);
      formData.append("user_name", decoded.name);
      formData.append("user_image", imageFile);

      // Call your backend API with FormData
      const user = await GetUserAuthentication(formData);
      console.log("Authenticated User:", user);

      localStorage.setItem("user", JSON.stringify(user));

      // Redirect after login success
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={props.className}>
      {/* Logo */}
      <div className="flex justify-center mt-10">
        <img src={image} alt="Company logo" className="w-20" />
      </div>

      {/* Title */}
      <h3 className="text-center text-md font-semibold mt-4 text-yellow-400">
        Sign In
      </h3>

      {/* Google Login */}
      <div className="flex justify-center items-center mx-auto mt-10">
        {loading ? (
          <div className="text-sm text-gray-300 animate-pulse">Signing in...</div>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => setErrorMsg("Google login failed. Try again.")}
            size="medium"
          />
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <p className="text-center text-red-500 text-sm mt-4">{errorMsg}</p>
      )}
    </div>
  );
}
