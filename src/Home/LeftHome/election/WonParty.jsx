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
      icon: <FaThumbsUp className="text-green-500 text-xl" />,
      text: "जीत दर्ज",
    },
    {
      name: "SP",
      symbol: sp,
      icon: <AiOutlineDash className="text-gray-500 text-xl" />,
      text: "दूसरे स्थान",
    },
    {
      name: "INC",
      symbol: inc,
      icon: <AiOutlineDash className="text-gray-500 text-xl" />,
      text: "तीसरे स्थान",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">प्रमुख उम्मीदवार</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">उम्मीदवार का नाम</th>
              <th className="p-3 text-center">चिन्ह</th>
              <th className="p-3 text-right">परिणाम</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="p-3 font-semibold text-gray-800">{party.name}</td>
                <td className="p-3 text-center">
                  <img
                    src={party.symbol}
                    alt={party.name}
                    className="h-8 w-8 object-contain mx-auto"
                  />
                </td>
                <td className="p-3 text-right text-gray-700 flex flex-col items-end">
                  {party.icon}
                  <span className="text-xs mt-1">{party.text}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopResultTable;
