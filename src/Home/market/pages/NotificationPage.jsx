import React from "react";
import NotificationCard from "../components/NotificationCard";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const notifications = [
  {
    id: 1,
    title: "Add Vendor Details for WhatsApp Ordering",
    message:
      "Easily order from your preferred vendors by adding their name and phone number in our Order Management app.",
    time: "12 HOURS AGO",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Grand_Pointe.jpg/800px-Grand_Pointe.jpg", // Replace with real image
  },
  {
    id: 2,
    title: "Add Vendor Details for WhatsApp Ordering",
    message:
      "Easily order from your preferred vendors by adding their name and phone number in our Order Management app.",
    time: "12 HOURS AGO",
  },
  {
    id: 3,
    title: "Add Vendor Details for WhatsApp Ordering",
    message:
      "Easily order from your preferred vendors by adding their name and phone number in our Order Management app.",
    time: "12 HOURS AGO",
  },
];

const NotificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center mb-6">
        <button
          className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
          onClick={() => window.history.back()}
        >
          <MdOutlineKeyboardBackspace size={20} />
        </button>
        <h1 className="text-center flex-1 text-lg font-semibold">Notification</h1>
      </div>

      <p className="text-sm text-gray-500 mb-3">FRIDAY 16 MAY</p>

      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          title={n.title}
          message={n.message}
          time={n.time}
          image={n.image}
        />
      ))}
    </div>
  );
};

export default NotificationPage;
