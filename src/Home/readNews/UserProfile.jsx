import React, { useState } from "react";
import { BiFont } from "react-icons/bi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPrint,
} from "react-icons/fa";
import { FaMinimize } from "react-icons/fa6";
import { MdOutlineEmail, MdTextDecrease, MdTextIncrease } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";

function getDateDifference(dateString) {
  if (!dateString) return null;
  const now = new Date();
  const past = new Date(dateString);

  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();
  let days = now.getDate() - past.getDate();
  let hours = now.getHours() - past.getHours();
  let minutes = now.getMinutes() - past.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes };
}

const socialIcons = {
  facebook: <FaFacebookF className="text-blue-400 hover:text-blue-600" />,
  linkedin: <FaLinkedinIn className="text-blue-400 hover:text-blue-600" />,
  twitter: <FaTwitter className="text-blue-400 hover:text-blue-600" />,
  youtube: <FaYoutube className="text-red-400 hover:text-red-600" />,
  instagram: <FaInstagram className="text-pink-400 hover:text-pink-600" />,
  whatsapp: <FaWhatsapp className="text-green-400 hover:text-green-600" />,
  email: <MdOutlineEmail className="text-orange-400 hover:text-orange-600" />,
};

const UserProfile = ({ user, setZoomText, zoomText, handleDownloadPDF }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleZoomOut = () => {
    if (zoomText <= 7) {
      setModalMessage(
        "Minimum zoom level reached! You cannot decrease further."
      );
      setIsModalOpen(true);
      return;
    }
    setZoomText((prev) => Math.max(prev - 1, 7));
  };

  const handleZoomIn = () => {
    if (zoomText >= 25) {
      setModalMessage(
        "Maximum zoom level reached! You cannot increase further."
      );
      setIsModalOpen(true);
      return;
    }
    setZoomText((prev) => Math.min(prev + 1, 25));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const dateDifference = getDateDifference(user?.date);

  const formattedTime = dateDifference
    ? `${dateDifference.years ? dateDifference.years + "y " : ""}${
        dateDifference.months ? dateDifference.months + "m " : ""
      }${dateDifference.days ? dateDifference.days + "d " : ""}${
        dateDifference.hours ? dateDifference.hours + "h " : ""
      }${dateDifference.minutes ? dateDifference.minutes + "m" : ""}`
    : "N/A";

  return (
    <div className="flex items-center space-x-4">
      <img
        src={user?.profileImage || "https://via.placeholder.com/150"}
        alt={user?.name || "User"}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="font-semibold text-md">
            {user?.name || "Unknown User"}
          </h2>
          <p className="text-gray-500 text-xs">
            {user?.date ? new Date(user.date).toDateString() : "No Date"} •{" "}
            {formattedTime}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex space-x-2 ml-auto">
            {user?.links?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                {socialIcons[social.name.toLowerCase()] || "🔗"}
              </a>
            ))}
          </div>

          <div className="flex items-start justify-start left-0 space-x-2 ml-auto">
            <div
              className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full"
              title="Print News"
              onClick={handleDownloadPDF}
            >
              <FaPrint className="" title="Print this news" />
            </div>
            <div
              className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full"
              title="Zoom Out"
              onClick={handleZoomOut}
            >
              <MdTextDecrease />
            </div>

            <div
              className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full"
              title="Normal Text"
              onClick={() => setZoomText(15)}
            >
              <BiFont />
            </div>

            <div
              className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full"
              title="Zoom In"
              onClick={handleZoomIn}
            >
              <MdTextIncrease />
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={handleClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-auto" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <Dialog.Title className="font-bold text-xl">
              Zoom Limit Reached
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mt-2">
              {modalMessage}
            </Dialog.Description>
            <div className="mt-4">
              <Dialog.Close
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleClose}
              >
                Close
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default UserProfile;
