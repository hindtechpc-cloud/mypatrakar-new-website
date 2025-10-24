import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

import {
  FaPhoneAlt,
  FaGlobe,
  FaEnvelope,
  FaShareAlt,
} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Skeleton } from "../components/Skeleton";
import { toast } from "react-hot-toast";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";

export const AdDetailPage = ({ setIsOpenDetailCard, initialAd }) => {
  console.log(initialAd);
  const { AdsId } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (initialAd) {
      // 🔥 Map API response fields to UI friendly fields
      const mappedAd = {
        id: initialAd.ad_id,
        title: initialAd.title,
        subtitle: initialAd.short_desc,
        description: initialAd.long_desc,
        company: initialAd.company_name,
        phone: initialAd.contact,
        whatsapp: initialAd.whatapp_no,
        email: initialAd.email,
        website: initialAd.website,
        amount: Number(initialAd.amount) || 0,
        images: initialAd.images || [],
        location: initialAd.location,
        category: initialAd.category,
      };
      setAd(mappedAd);
      setLoading(false);
    } else {
      setError("Ad not found");
      setLoading(false);
    }
  }, [initialAd]);

  const handleShare = async () => {
    if (!ad) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad.title,
          text: `${ad.subtitle}\n\n${ad.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err.message);
      }
    } else {
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
        <Skeleton className="w-full h-64 rounded-xl" />
        <div className="mt-6 space-y-3">
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-1/4 h-6 rounded" />
          <Skeleton className="w-full h-4 rounded" />
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
        />
      </div>

      {/* Thumbnails */}
      {ad.images?.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {ad?.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`flex-shrink-0 h-16 w-16 rounded-lg border-2 transition-all ${
                activeImage === idx ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img
                src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${img}`}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      )}

      {/* Title & Price */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h1 className="font-bold text-xl text-gray-900">{ad.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{ad.subtitle}</p>
        </div>
        <p className="text-xl font-bold text-blue-600 whitespace-nowrap pl-2">
          ₹{ad.amount?.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 whitespace-pre-line text-justify">
          <HtmlToPlainText
            htmlContent={ad.description}
            maxLength={200}
            isReadmore={false}
            showReadMore={true}
          />
        </p>
      </div>
      <p className="text-xs text-gray-500 fo">
        <span>{ad?.company}</span> . <span>{ad?.location}</span>
      </p>
      {/* Contact Info */}
      <div className="mt-3 space-y-3">
        <h3 className="font-semibold text-gray-900">Contact Information</h3>

        {ad?.phone && (
          <button
            onClick={() => handleContact("phone")}
            className="w-full flex items-center gap-3 p-3 bg-green-100 rounded-lg hover:bg-green-50"
          >
            <FaPhoneAlt className="text-green-700" size={20}/> {ad?.phone}
          </button>
        )}
        {ad?.whatsapp && (
          <button
            onClick={() => handleContact("whatsapp")}
            className="w-full flex items-center gap-3 p-3 bg-green-100 rounded-lg hover:bg-green-50"
          >
            <SiWhatsapp className="text-green-700 font-bold" size={20}/> {ad?.whatsapp}
          </button>
        )}
        {ad?.email && (
          <button
            onClick={() => handleContact("email")}
            className="w-full flex items-center gap-3 p-3 bg-red-100 rounded-lg hover:bg-red-50"
          >
            <FaEnvelope className="text-red-600" size={20}/> {ad?.email}
          </button>
        )}
        {ad?.website && (
          <button
            onClick={() => handleContact("website")}
            className="w-full flex items-center gap-3 p-3 bg-blue-100 rounded-lg hover:bg-blue-50"
          >
            <FaGlobe className="text-blue-600" size={20}/>{" "}
            {ad?.website.replace(/^https?:\/\//, "")}
          </button>
        )}
      </div>
    </div>
  );
};
