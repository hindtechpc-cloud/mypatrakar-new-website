import React from "react";

const NotificationCard = ({ title, message, time, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src="https://img.icons8.com/color/48/appointment-reminders.png"
          alt="icon"
          className="w-6 h-6 mt-1"
        />
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1">
            THE TIMES OF REPUBLIC BHARAT • {time}
          </p>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
      {image && (
        <img
          src={image}
          alt="notification"
          className="mt-3 w-full h-auto rounded-md"
        />
      )}
    </div>
  );
};

export default NotificationCard;
