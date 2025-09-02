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
import { FiAlertCircle } from "react-icons/fi";
import { Skeleton } from "../components/Skeleton";
import { toast } from "react-hot-toast";
export const AdDetailPage = ({ setIsOpenDetailCard, initialAd }) => {
  const defaultAds = initialAd;
  // console.log(initialAd)
  const { AdsId } = useParams();
  const [ad, setAd] = useState(defaultAds || null);
  const [loading, setLoading] = useState(!initialAd);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  // console.log(initialAd);
  // Mock data - replace with your actual data source
// console.log(ad)
  // useEffect(() => {
  //   if (!initialAd) return; // Skip if ad is passed as prop

  //   const fetchAd = async () => {
  //     try {
  //       setLoading(true);
  //       // In a real app, replace this with your API call
  //       // const response = await fetchAdById(AdsId);
  //       const foundAd = defaultAds.find((item) => item.id === AdsId);

  //       if (!foundAd) {
  //         throw new Error("Ad not found");
  //       }

  //       setAd(foundAd);
  //     } catch (err) {
  //       console.error("Failed to load ad:", err);
  //       setError(err.message || "Failed to load ad details");
  //       toast.error("Could not load ad details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAd();
  // }, [AdsId, initialAd]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad?.title,
          text: `${ad?.subtitle}\n\n${ad?.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err.message);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleContact = (type) => {
    if (!ad) return;

    switch (type) {
      case "phone":
        window.open(`tel:${ad.phone}`);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:${ad.email}?subject=Regarding ${ad.title}`,
          "_blank"
        );
        break;
      case "website":
        window.open(
          ad.website.startsWith("http") ? ad.website : `https://${ad.website}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-md mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-40 h-6 rounded" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        <Skeleton className="w-full h-64 rounded-xl" />

        <div className="flex gap-2 mt-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-lg" />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-1/4 h-6 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-full h-20 rounded" />
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="max-w-screen-md mx-auto p-4 min-h-[50vh] flex flex-col items-center justify-center">
        <FiAlertCircle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-center mb-2">
          {error || "Ad not found"}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          The ad you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => setIsOpenDetailCard(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 pb-20 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2 z-10">
        {/* <button
          onClick={() => setIsOpenDetailCard(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-gray-700" />
        </button> */}

        <h2 className="font-bold text-lg text-center line-clamp-1 px-2">
          {ad.title}
        </h2>

        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Share"
        >
          <FaShareAlt className="text-blue-600" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative">
        <img
          src={
            ad.images?.[activeImage]?.startsWith("http")
              ? ad.images[activeImage]
              : `${import.meta.env.VITE_REACT_APP_API_URL_Image || ""}${
                  ad.images[activeImage]
                }`
          }
          alt={ad.title}
          className="rounded-xl w-full h-64 sm:h-80 object-cover shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x600";
            e.target.onerror = null;
          }}
        />
        {/* Image counter */}
        {ad.images?.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {activeImage + 1}/{ad.images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {ad.images?.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {ad.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`flex-shrink-0 h-16 w-16 rounded-lg border-2 transition-all ${
                activeImage === idx ? "border-blue-500" : "border-gray-200"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={
                  img.startsWith("http")
                    ? img
                    : `${
                        import.meta.env.VITE_REACT_APP_API_URL_Image || ""
                      }${img}`
                }
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover rounded-md"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x200";
                  e.target.onerror = null;
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Title & Price */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h1 className="font-bold text-xl text-gray-900">{ad.title}</h1>
          <p className="text-sm text-gray-600 mt-1">{ad.subtitle}</p>
        </div>
        <p className="text-xl font-bold text-blue-600 whitespace-nowrap pl-2">
          ₹{ad.amount?.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 whitespace-pre-line text-justify">
          {ad.description}
        </p>
      </div>

      {/* Company & Date */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm text-gray-500">
            Posted by: <span className="font-medium">{ad.company}</span>
          </span>
        </div>
        <span className="text-sm text-gray-400">
          {new Date(ad.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Contact Info */}
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold text-gray-900">Contact Information</h3>

        {ad.phone && (
          <button
            onClick={() => handleContact("phone")}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <FaPhoneAlt className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium">{ad.phone}</p>
            </div>
          </button>
        )}

        {ad.whatsapp && (
          <button
            onClick={() => handleContact("whatsapp")}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <FaWhatsapp className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">WhatsApp</p>
              <p className="font-medium">{ad.whatsapp}</p>
            </div>
          </button>
        )}

        {ad.email && (
          <button
            onClick={() => handleContact("email")}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-red-100 p-2 rounded-full">
              <FaEnvelope className="text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{ad.email}</p>
            </div>
          </button>
        )}

        {ad.website && (
          <button
            onClick={() => handleContact("website")}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <FaGlobe className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Website</p>
              <p className="font-medium truncate">
                {ad.website.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Fixed Contact Button (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg sm:hidden">
        <button
          onClick={() => handleContact(ad.whatsapp ? "whatsapp" : "phone")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Contact Seller
        </button>
      </div>
    </div>
  );
};
