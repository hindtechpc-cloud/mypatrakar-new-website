import React from "react";

const TopResultTable = ({ results }) => {
  const totalVotes = results.reduce((acc, party) => acc + parseInt(party.seats_won), 0);

  return (
    <div className="w-full max-w-sm mx-auto my-6 bg-white rounded-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        शीर्ष चुनाव परिणाम
      </h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="py-2 px-3">दल का नाम</th>
            <th className="py-2 px-3 text-center">चिन्ह</th>
            <th className="py-2 px-3 text-right">परिणाम (%)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((party, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
              <td className="py-2 px-3 font-medium text-gray-800">{party.party_name}</td>
              <td className="py-2 px-3 flex justify-center items-center">
                <img src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${party.party_image}`} alt={party.party_name} className="h-8 w-8 object-contain" />
              </td>
              <td className="py-2 px-3 text-right font-semibold text-gray-700">
                {((parseInt(party.seats_won) / totalVotes) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResultTable;
