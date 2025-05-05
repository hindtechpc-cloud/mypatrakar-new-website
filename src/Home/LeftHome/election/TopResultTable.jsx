import React from "react";
import bjp from "../../../assets/bjp.png";
import sp from "../../../assets/sp.jpg";
import inc from "../../../assets/inc.png";

const TopResultTable = ({ results }) => {
  const parties = [
    { name: "BJP", symbol: bjp, result: results.red },
    { name: "SP", symbol: sp, result: results.green },
    { name: "INC", symbol: inc, result: results.orange },
  ];

  return (
    <div className="w-full max-w-sm mx-auto my-6  bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        शीर्ष चुनाव परिणाम
      </h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="py-2 px-3">दल का नाम</th>
            <th className="py-2 px-3 text-center">चिन्ह</th>
            <th className="py-2 px-3 text-right">परिणाम</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition-all"
            >
              <td className="py-2 px-3 font-medium text-gray-800">
                {party.name}
              </td>
              <td className="py-2 px-3 flex justify-center items-center">
                <img src={party.symbol} alt={party.name} className="h-8 w-8 object-contain" />
              </td>
              <td className="py-2 px-3 text-right font-semibold text-gray-700">
                {party.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResultTable;
