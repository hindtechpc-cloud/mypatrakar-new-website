import React from "react";
import bjp from '../../../assets/bjp.png'
import sp from '../../../assets/sp.jpg'
import inc from '../../../assets/inc.png'
const TopResultTable = ({results}) => {
  const parties = [
    { name: "BJP", symbol: bjp, result: results.red },
    { name: "SP", symbol: sp, result: results.green },
    { name: "INC", symbol: inc, result:results.orange },
  ];

  return (
    <div className="lg:w-[370px] md:w-[370px]  sm:w-[300px]  w-[250px] sm:mx-auto mx-0 my-6 sm:p-4 p-2 bg-white rounded-lg shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">दल का नाम</th>
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
              <td className="p-2 text-right  text-gray-900 font-bold">{party.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResultTable;
