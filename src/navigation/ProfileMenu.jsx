// src/navigation/Navbar/ProfileMenu.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) return null; // Agar login nahi hai to kuch mat dikhao

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/"); 
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Profile Icon */}
      <button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/20 transition">
        <FaUserCircle className="text-3xl text-white drop-shadow-md" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-60 lg:-left-28 left-0 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 animate-fadeIn z-50">
          {/* User Info */}
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <p className="text-sm font-semibold text-gray-900">
              {user?.user_name}
            </p>
            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
