// import React from "react";

// const TopResultTable = ({ results }) => {
//   const totalVotes = results.reduce((acc, party) => acc + parseInt(party.seats_won), 0);

//   return (
//     <div className="w-full max-w-sm mx-auto my-6 bg-white rounded-xl">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//         शीर्ष चुनाव परिणाम
//       </h3>
//       <table className="w-full text-sm border-collapse">
//         <thead>
//           <tr className="bg-blue-600 text-white text-left">
//             <th className="py-2 px-3">दल का नाम</th>
//             <th className="py-2 px-3 text-center">चिन्ह</th>
//             <th className="py-2 px-3 text-right">परिणाम (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((party, index) => (
//             <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
//               <td className="py-2 px-3 font-medium text-gray-800">{party.party_name}</td>
//               <td className="py-2 px-3 flex justify-center items-center">
//                 <img src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${party.party_image}`} alt={party.party_name} className="h-8 w-8 object-contain" />
//               </td>
//               <td className="py-2 px-3 text-right font-semibold text-gray-700">
//                 {((parseInt(party.seats_won) / totalVotes) * 100).toFixed(2)}%
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TopResultTable;




import React from "react";

const TopResultTable = ({ results }) => {
  const totalVotes = results.reduce((acc, party) => acc + parseInt(party.seats_won), 0);

  // Define a color scheme for the top parties
  const rankColors = [
    "linear-gradient(135deg, #FFD700, #FFA500)", // Gold for 1st
    "linear-gradient(135deg, #C0C0C0, #A9A9A9)", // Silver for 2nd
    "linear-gradient(135deg, #CD7F32, #8C6B46)"  // Bronze for 3rd
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2">
        <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          शीर्ष चुनाव परिणाम
        </h3>
      </div>
      
      <div className="p-1">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-50 text-blue-800 text-left">
              {/* <th className="py-3 px-4 font-semibold rounded-tl-lg">क्रम</th> */}
              <th className="py-3 px-4 font-semibold">दल का नाम</th>
              <th className="py-3 px-4 font-semibold text-center">चिन्ह</th>
              <th className="py-3 px-4 font-semibold text-right rounded-tr-lg">परिणाम (%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((party, index) => {
              const percentage = ((parseInt(party.seats_won) / totalVotes) * 100).toFixed(1);
              return (
                <tr 
                  key={index} 
                  className="border-t border-gray-100 hover:bg-blue-50 transition-all duration-200"
                >
                  {/* <td className="py-3 px-4 text-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: index < 3 ? rankColors[index] : "#4f46e5" }}
                    >
                      {index + 1}
                    </div>
                  </td> */}
                  <td className="py-3 px-4 font-medium text-gray-800">
                    <div className="flex flex-col">
                      <span>{party.party_name}</span>
                      <span className="text-xs text-gray-500">{party.seats_won} सीटें</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center items-center">
                      <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                        <img 
                          src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${party.party_image}`} 
                          alt={party.party_name} 
                          className="h-10 w-10 object-contain" 
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgMTlBMiAyIDAgMCAwIDYgMjFIMThBMiAyIDAgMCAwIDIwIDE5VjVBMiAyIDAgMCAwIDE4IDNINkEyIDIgMCAwIDAgNCA1VjE5WiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDVWN0wxMiAxMUwxNiA3VjUiPjwvcGF0aD48cGF0aCBkPSJNOCAxM1YxOSI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAxM1YxOSI+PC9wYXRoPjwvc3ZnPg==";
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-blue-700">{percentage}%</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full rounded-full bg-blue-600" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t border-gray-200">
        कुल {totalVotes} सीटों में से शीर्ष {results.length} दलों का प्रदर्शन
      </div>
    </div>
  );
};

export default TopResultTable;