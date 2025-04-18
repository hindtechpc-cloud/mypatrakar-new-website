import { useEffect, useState } from "react";
import Header from "../shared/Header";
import axios from "axios";
import Loader from "../../../utils/Loader";
import generateRandomRashiphal from "./staticRashiphal";

export default function Rashiphal() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRashiphal = async () => {
      try {
        const res = await axios.post(
          "https://corsproxy.io/?https://json.freeastrologyapi.com/astrology/v1/horoscope/today",
          {
            day: "18",
            month: "04",
            year: "2000",
            hour: "12",
            min: "00",
            lat: "28.6139",
            lon: "77.2090",
            tzone: "5.5",
          },
          {
            headers: {
              Authorization:
                "Bearer N8Y8g2w4NI3oAbBzkIAuK9phJhfRU9m66obIulOQ",
              "Content-Type": "application/json",
            },
          }
        );

        const result = res.data?.data || [];
        if (result.length === 0) throw new Error("Empty result");
        setPosts(result);
      } catch (err) {
        console.warn("Falling back to static rashiphal due to error:", err.message);
        const randomRashi = generateRandomRashiphal();
        setPosts(randomRashi);
        setError("Showing randomly generated rashiphal due to network issue.");
      }
    };

    fetchRashiphal();
  }, []);

  return (
    <div className="my-2 mt-5 md:max-w-sm w-[300px] mx-auto py-4">
      <Header text="Rashiphal" />
      {error && (
        <p className="text-center text-xs text-yellow-600 mb-2">{error}</p>
      )}
      <ul className="flex flex-col gap-4 items-center justify-center overflow-y-auto py-2 hide-scroll h-[500px]">
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <li key={index} className="w-full">
              <article className="flex items-start gap-3 bg-white p-2 rounded-lg shadow">
                <img
                  src="https://bharatsamachartv.in/wp-content/uploads/2025/01/मेष-वृष-मिथुन-राशिफल_-220x150.jpg"
                  alt="rashifal"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.rashi}
                  </h3>
                  <p className="text-xs text-gray-600">{item.rashifal}</p>
                </div>
              </article>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}
