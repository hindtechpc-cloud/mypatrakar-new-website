import React from "react";
import { GoDotFill } from "react-icons/go";

export default function Header({text}) {
  return (
    <div>
      <div className="bg-black text-gray-100 text-start w-full py-2 px-2 rounded-lg my-2">
        <span>{text}</span>
      </div>
    </div>
  );
}
