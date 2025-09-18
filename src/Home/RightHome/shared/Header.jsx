import React, { useContext } from "react";
import { GoDotFill } from "react-icons/go";
import { WebThemeContext } from "../../../context/ThemeContext";

export default function Header({text}) {
  const {webTheme}=useContext(WebThemeContext)
    const themeColor = webTheme["bg-color"] || "#b91c1c"
  return (
    <div>
      <div className=" text-gray-100 text-start w-full py-[7px] px-[10px] rounded-lg my-2" style={{
        background:themeColor
      }}>
        <span>{text}</span>
      </div>
    </div>
  );
}
