// import React from "react";
// import bjp from "../../../assets/bjp.png";
// import sp from "../../../assets/sp.jpg";
// import inc from "../../../assets/inc.png";
// import { FaThumbsUp } from "react-icons/fa6";
// import { AiOutlineDash } from "react-icons/ai";

// const TopResultTable = ({ parties }) => {
//   // console.log(parties)
//   // const parties = [
//   //   {
//   //     name: "BJP",
//   //     symbol: bjp,
//   //     icon: <FaThumbsUp className="text-green-500 text-xl" />,
//   //     text: "जीत दर्ज",
//   //   },
//   //   {
//   //     name: "SP",
//   //     symbol: sp,
//   //     icon: <AiOutlineDash className="text-gray-500 text-xl" />,
//   //     text: "दूसरे स्थान",
//   //   },
//   //   {
//   //     name: "INC",
//   //     symbol: inc,
//   //     icon: <AiOutlineDash className="text-gray-500 text-xl" />,
//   //     text: "तीसरे स्थान",
//   //   },
//   // ];

//   return (
//     <div className="w-full max-w-3xl mx-auto mt-4 bg-white rounded-xl ">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">प्रमुख उम्मीदवार</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-blue-600 text-white text-left">
//               <th className="p-3">उम्मीदवार का नाम</th>
//               <th className="p-3 text-center">चिन्ह</th>
//               <th className="p-3 text-right">परिणाम</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parties?.map((party, index) => (
//               <tr
//                 key={index}
//                 className="border-t border-gray-200 hover:bg-gray-50 transition-all"
//               >
//                 <td className="p-3 font-semibold text-gray-800">
//                   {party.party_name}
//                 </td>
//                 <td className="p-3 text-center">
//                   <img
//                     src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${party.party_image}`}
//                     alt={party.party_name}
//                     className="h-8 w-8 object-contain mx-auto"
//                   />
//                 </td>
//                 <td className="p-3 text-right text-gray-700 flex flex-col items-end">
//                   {party?.icon}
//                   <span className="text-xs mt-1">{party?.text}</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TopResultTable;

import React from "react";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

const TopResultTable = ({ parties }) => {
  // console.log(parties);
  // Sample data structure for demonstration
  // const sampleData = {
  //   date: "2025-05-02",
  //   id: 9,
  //   key_candidates: [
  //     {
  //       constituency_name: "Atrauli",
  //       image: "polls-management/election-year//y435WoDSfybvCiCwKg9phdJNYtXn2SaPHnXHoVTB.png",
  //       name: "Moana Odom",
  //       political_party: "MYPP06032025001",
  //       winner: "1"
  //     }
  //   ],
  //   political_parties: [
  //     {
  //       party_name: "MYPP06032025004",
  //       seats_won: "15",
  //       party_image: "MYPP06032025004"
  //     },
  //     {
  //       party_name: "MYPP06032025001",
  //       seats_won: "52",
  //       party_image: "MYPP06032025001"
  //     }
  //   ],
  //   status: "Active",
  //   total_seats: 600,
  //   type: "Result",
  //   year: "1982",
  //   year_id: "MYEY02052025002"
  // };
  // console.log(`${import.meta.env.VITE_REACT_APP_API_URL_Image}/${parties.key_candidates[0].image}`)
  // Use sample data if no parties are provided
  const data = parties && parties.key_candidates ? parties : {};
  const keyCandidates = data?.key_candidates||[];
console.log(keyCandidates)
  // Get party information for each candidate
  const getPartyInfo = (partyId) => {
    return (
      data.political_parties?.find((party) => party.party_name === partyId) ||
      {}
    );
  };

  return (
    <div className="w-full  px-5 rounded-2xl shadow-lg overflow-hidden  mt-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-300" />
          प्रमुख उम्मीदवार ({data.year})
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          मुख्य चुनावी उम्मीदवारों का विवरण
        </p>
      </div>

      <div className="p-4">
        {keyCandidates?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-800 text-left">
                  <th className="p-3 font-semibold rounded-tl-lg">क्रम</th>
                  <th className="p-3 font-semibold">उम्मीदवार</th>
                  <th className="p-3 font-semibold text-center">
                    निर्वाचन क्षेत्र
                  </th>
                  <th className="p-3 font-semibold text-center">दल</th>
                  <th className="p-3 font-semibold text-right rounded-tr-lg">
                    परिणाम
                  </th>
                </tr>
              </thead>
              <tbody>
                {keyCandidates?.map((candidate, index) => {
                  const partyInfo = getPartyInfo(candidate.political_party);
                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="mr-3 flex-shrink-0">
                            <img
                              src={`${
                                import.meta.env.VITE_REACT_APP_API_URL_Image}/${candidate?.image}`}
                              alt={candidate.name}
                              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAwLTQtNEg4YTQgNCAwIDAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {candidate?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              उम्मीदवार
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center text-gray-700">
                        {candidate.constituency_name}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex flex-col items-center">
                          <img
                            src={`${
                              import.meta.env.VITE_REACT_APP_API_URL_Image}/${partyInfo.party_image}`}
                            alt={partyInfo.party_name}
                            className="h-8 w-8 object-contain mx-auto"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgMTlBMiAyIDAgMCAwIDYgMjFIMThBMiAyIDAgMCAwIDIwIDE5VjVBMiAyIDAgMCAwIDE4IDNINkEyIDIgMCAwIDAgNCA1VjE5WiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDVWN0wxMiAxMUwxNiA3VjUiPjwvcGF0aD48cGF0aCBkPSJNOCAxM1YxOSI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAxM1YxOSI+PC9wYXRoPjwvc3ZnPg==";
                            }}
                          />
                          <span className="text-xs text-gray-600 mt-1">
                            {partyInfo.party_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex flex-col items-end">
                          {candidate.winner === "1" ? (
                            <>
                              <div className="flex items-center text-green-600 font-bold">
                                <FaTrophy className="mr-1 text-yellow-500" />
                                विजयी
                              </div>
                              <span className="text-xs text-gray-500">
                                जीत दर्ज की
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center text-gray-600">
                                <FaMedal className="mr-1 text-gray-400" />
                                उम्मीदवार
                              </div>
                              <span className="text-xs text-gray-500">
                                परिणाम अपेक्षित
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaAward className="text-4xl text-gray-300 mx-auto mb-3" />
            <p>कोई प्रमुख उम्मीदवार जानकारी उपलब्ध नहीं है</p>
          </div>
        )}
      </div>

      <div className=" p-3 text-center text-xs text-gray-500 border-t border-gray-200">
        {parties && parties.key_candidates ? (
          <>चुनाव वर्ष {data.year} के प्रमुख उम्मीदवार</>
        ) : (
          <>
            नमूना डेटा प्रदर्शित किया जा रहा है। वास्तविक डेटा लोड होने पर यह
            अपडेट हो जाएगा।
          </>
        )}
      </div>
    </div>
  );
};

export default TopResultTable;
