import { useEffect, useState } from "react";
import Header from "../shared/Header";
import Loader from "../../../utils/Loader";
import { GetHoroscope } from "../../../../api";
import RashiphalCarousel from "./RashiphalCarousel";
import EmptyState from "./EmptyState";
import horoscope from "../../../assets/horoscop.png";

const zodiacSigns = [
  { name: "Aries", symbol: "♈" },
  { name: "Taurus", symbol: "♉" },
  { name: "Gemini", symbol: "♊" },
  { name: "Cancer", symbol: "♋" },
  { name: "Leo", symbol: "♌" },
  { name: "Virgo", symbol: "♍" },
  { name: "Libra", symbol: "♎" },
  { name: "Scorpio", symbol: "♏" },
  { name: "Sagittarius", symbol: "♐" },
  { name: "Capricorn", symbol: "♑" },
  { name: "Aquarius", symbol: "♒" },
  { name: "Pisces", symbol: "♓" },
];

export default function Rashiphal() {
  const [rashis, setRashis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(true);

  const CACHE_KEY = "rashiphal_data";
  const CACHE_EXPIRY = 30 * 60 * 1000;

  const scrollLeft = () => document.querySelector(".scroll-smooth")?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => document.querySelector(".scroll-smooth")?.scrollBy({ left: 300, behavior: "smooth" });

  const fetchAllRashis = async () => {
    try {
      setLoading(true);
      setRashis([]);

      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
          setRashis(parsed.data);
          setLoading(false);
          return;
        }
      }

      const allData = await Promise.all(
        zodiacSigns.map(async (sign) => {
          const res = await GetHoroscope(sign.name.toLowerCase());
          const resData = res?.data?.data;

          if (resData?.is_fallback) {
            throw { isFallback: true, image: resData.fallback_image, website: resData.fallback_website };
          }

          return { ...sign, rashifal: resData.prediction, lucky_number: resData.lucky_number };
        })
      );

      setRashis(allData);
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: allData, timestamp: Date.now() }));
    } catch (err) {
      console.error(err);
      setRashis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRashis();
    const interval = setInterval(() => {
      sessionStorage.removeItem(CACHE_KEY);
      fetchAllRashis();
    }, CACHE_EXPIRY);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <Header text="आज का राशिफल" className="relative text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600" />

      {loading ? (
        <Loader />
      ) : rashis.length > 0 ? (
        <RashiphalCarousel
          rashis={rashis}
          leftVisible={leftVisible}
          rightVisible={rightVisible}
          setLeftVisible={setLeftVisible}
          setRightVisible={setRightVisible}
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />
      ) : (
        <EmptyState
          image={horoscope}
          link="https://www.bhaskar.com/rashifal"
          altText="Horoscope Fallback"
          message="Today's Horoscop Click the image."
        />
      )}
    </div>
  );
}
