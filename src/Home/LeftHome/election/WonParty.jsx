import React from "react";
import bjp from "../../../assets/bjp.png";
import sp from "../../../assets/sp.jpg";
import inc from "../../../assets/inc.png";
import { FaThumbsUp } from "react-icons/fa6";
import { AiOutlineDash } from "react-icons/ai";
const TopResultTable = () => {
  const parties = [
    {
      name: "BJP",
      symbol: bjp,
      icon: (
        <FaThumbsUp className="text-blue-500 text-xl font-bold text-right" />
      ),
      text: "",
    },
    {
      name: "SP",
      symbol: sp,
      icon: <AiOutlineDash className="text-gray-800 text-xl font-bold" />,
      text: "",
    },
    {
      name: "INC",
      symbol: inc,
      icon: <AiOutlineDash className="text-gray-800 text-xl font-bold" />,
      text: "",
    },
  ];

  return (
    <div className="max-w-4xl ">
      <p className="text-xl font-bold my-2 text-gray-800">प्रमुख उम्मीदवार</p>
      <table className="w-full border-collapse border border-gray-300 shadow-lg shadow-gray-500 rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white rounded-lg p-2">
            <th className="p-2 text-left">उम्मीदवारका नाम</th>
            <th className="p-2 text-center">चिन्ह</th>
            <th className="p-2 text-right">परिणाम</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={index} className="border-t border-dotted border-gray-300">
              <td className="p-2 text-gray-900 font-bold">{party.name}</td>
              <td className="p-2 flex justify-center">
                <img src={party.symbol} alt={party.name} className="h-8" />
              </td>
              <td className="p-2 text-right items-end  text-gray-900 ">
                <p className=" left-96"> {party.icon}</p>{" "}
                <p className="text-blue-700 text-bold">{party.text}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResultTable;
