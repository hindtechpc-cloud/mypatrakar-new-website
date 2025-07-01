// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// // import axios from "axios";
// import { FaPhoneAlt, FaGlobe, FaEnvelope, FaWhatsapp, FaArrowLeft, FaShareAlt } from "react-icons/fa";
// import { defaultAds } from "./data";

// export const AdDetailPage = () => {
//   const { AdsId } = useParams();
//   const [ad, setAd] = useState(null);
//   console.log(AdsId)
//   console.log("object");
//   console.log(ad)

//   useEffect(() => {
//     // axios
//     //   .get(`/api/ads/${AdsId}`) // 🔁 replace with real API
//     //   .then((res) => {
//     //     setAd(res.data);
//     //   })
//     //   .catch(() => {
//         setAd(defaultAds.find((ad) => ad.id == AdsId)); // fallback if API fails
//     //   });
//   }, [AdsId]);

//   if (ad) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4 max-w-screen-sm mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2">
//         <button onClick={() => window.history.back()}>
//           <FaArrowLeft />
//         </button>
//         <h2 className="font-bold">{ad.title}</h2>
//         <FaShareAlt className="text-blue-600" />
//       </div>

//       {/* Main Image */}
//       <img
//         src={ad.images[0]}
//         alt={ad?.title}
//         className="rounded-xl w-full h-48 object-cover"
//       />

//       {/* Thumbnail Images */}
//       <div className="flex gap-2 mt-2 overflow-x-auto">
//         {ad?.images.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`thumb-${idx}`}
//             className="h-16 w-16 object-cover rounded-lg border"
//           />
//         ))}
//       </div>

//       {/* Title & Price */}
//       <div className="mt-3 flex justify-between items-center">
//         <h3 className="font-bold text-xl">{ad.title}</h3>
//         <p className="text-lg font-semibold text-black">₹{ad.price}</p>
//       </div>

//       <p className="text-sm text-gray-600">{ad.subtitle}</p>

//       {/* Description */}
//       <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
//         {ad.description}
//       </p>

//       {/* Company & Date */}
//       <p className="text-sm mt-4 text-gray-400">
//         {ad.company} • {ad.date}
//       </p>

//       {/* Contact Info */}
//       <div className="mt-5 space-y-3 text-sm">
//         <div className="flex items-center gap-2">
//           <FaPhoneAlt className="text-green-600" />
//           Contact Number: {ad.phone}
//         </div>
//         <div className="flex items-center gap-2">
//           <FaEnvelope className="text-red-600" />
//           Email: {ad.email}
//         </div>
//         <div className="flex items-center gap-2">
//           <FaGlobe className="text-blue-600" />
//           Website: {ad.website}
//         </div>
//         <div className="flex items-center gap-2">
//           <FaWhatsapp className="text-green-500" />
//           Whatsapp: {ad.whatsapp}
//         </div>
//       </div>
//     </div>
//   );
// };

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaGlobe,
  FaEnvelope,
  FaWhatsapp,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";
import { defaultAds } from "./data";

export const AdDetailPage = () => {
  const { AdsId } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const foundAd = defaultAds.find((item) => item.id == AdsId);
      console.log(foundAd)
      if (!foundAd) {
        setError("Ad not found or invalid ID.");
      } else {
        setAd(foundAd);
      }
    } catch (err) {
      setError("Something went wrong while loading the ad.");
    } finally {
      setLoading(false);
    }
  }, [AdsId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2 className="font-bold">{ad?.title}</h2>
        <FaShareAlt className="text-blue-600" />
      </div>

      {/* Main Image */}
      <img
        src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${ad?.images[0]}`}
        alt={ad?.title}
        className="rounded-xl w-full h-48 object-cover"
      />

      {/* Thumbnail Images */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {ad?.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className="h-16 w-16 object-cover rounded-lg border"
          />
        ))}
      </div>

      {/* Title & Price */}
      <div className="mt-3 flex justify-between items-center">
        <h3 className="font-bold text-xl">{ad.title}</h3>
        <p className="text-lg font-semibold text-black">₹{ad.price}</p>
      </div>

      <p className="text-sm text-gray-600">{ad.subtitle}</p>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
        {ad.description}
      </p>

      {/* Company & Date */}
      <p className="text-sm mt-4 text-gray-400">
        {ad.company} • {ad?.date}
      </p>

      {/* Contact Info */}
      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-green-600" />
          Contact Number: {ad?.phone}
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-red-600" />
          Email: {ad?.email}
        </div>
        <div className="flex items-center gap-2">
          <FaGlobe className="text-blue-600" />
          Website: {ad?.website}
        </div>
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-green-500" />
          Whatsapp: {ad?.whatsapp}
        </div>
      </div>
    </div>
  );
};
