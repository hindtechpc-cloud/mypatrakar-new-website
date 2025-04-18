import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CorporateActions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCorporateActions = async () => {
    const options = {
      method: 'GET',
      url: 'https://indian-stock-exchange-api2.p.rapidapi.com/corporate_actions',
      params: { stock_name: 'IBM' },
      headers: {
        'x-rapidapi-key': 'f2a49f1cc5msh2be3e0f5ed587a2p1ab791jsn2d03db4d64c4',
        'x-rapidapi-host': 'indian-stock-exchange-api2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorporateActions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Infosys Corporate Actions</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Details</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="p-2 border">{item.date || 'N/A'}</td>
                    <td className="p-2 border">{item.type || 'N/A'}</td>
                    <td className="p-2 border">{item.details || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-600">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default CorporateActions;
