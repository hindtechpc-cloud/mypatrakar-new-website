// import React, { useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// const MenuBar = ({ menuText, setSubcategory, menuItems }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="bg-blue-600 text-gray-50 my-2 py-2 rounded-md px-2 mt-5">
//       {/* Menu Header */}
//       <div className="flex items-center justify-between ">
//         <span className="text-sm font-semibold">{menuText}</span>

//         {/* Toggle Button for Mobile */}
//         {menuItems.length > 0 && (
//           <button
//             onClick={toggleMenu}
//             className="md:hidden focus:outline-none transition-transform duration-300"
//           >
//             {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
//           </button>
//         )}

//         {/* Menu Items */}
//         <div
//           className={` md:flex flex-wrap items-center justify-center  transition-all duration-300 ${
//             isOpen ? "block" : "hidden md:flex"
//           }`}
//         >
//           {menuItems.length > 0 &&
//             menuItems?.map((item, index) => (
//               <div
//                 key={index}
//                 className="px-2 py-1 text-sm hover:text-red-600 font-semibold cursor-pointer hover:bg-gray-50 rounded-lg transition-all"
//                 onClick={() => setSubcategory(item)}
//               >
//                 {item}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Menu({ menuText, setSubcategory, menu }) {
//   return (
//     <div className="w-full">
//       <MenuBar
//         menuItems={menu}
//         menuText={menuText}
//         setSubcategory={setSubcategory}
//       />
//     </div>
//   );
// }



import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MenuBar = ({ menuText, setSubcategory, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md rounded-xl p-3 mt-5">
      {/* Menu Header */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleMenu}>
        <span className="text-base font-bold tracking-wide">{menuText}</span>

        {menuItems.length > 0 && (
          <button
            className="md:hidden focus:outline-none transition-transform duration-300"
          >
            {isOpen ? (
              <IoIosArrowUp size={22} className="text-yellow-300" />
            ) : (
              <IoIosArrowDown size={22} className="text-yellow-300" />
            )}
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div
        className={`md:flex flex-wrap gap-2 transition-all duration-300 ease-in-out ${
          isOpen ? "block opacity-100" : "hidden md:flex opacity-0 md:opacity-100"
        }`}
      >
        {menuItems?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSubcategory(item)}
            className="px-3 py-2 bg-white/10 hover:bg-white hover:text-blue-700 text-sm font-semibold rounded-lg cursor-pointer shadow-sm transition-all duration-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Menu({ menuText, setSubcategory, menu }) {
  return (
    <div className="w-full">
      <MenuBar
        menuItems={menu}
        menuText={menuText}
        setSubcategory={setSubcategory}
      />
    </div>
  );
}
