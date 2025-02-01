import { useContext, useEffect, useState } from "react";
import Header from "../shared/Header";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const posts = [
//   {
//     id: 1,
//     title:
//       "Horoscope: इन 3 राशियों का भाग्य चमकेगा, मेहनत लाएगी रंग, पढ़ें आज का राशिफल",
//     link: "",
//     date: "January 25, 2025",
//     urlToImage:
//       "https://bharatsamachartv.in/wp-content/uploads/2025/01/मेष-वृष-मिथुन-राशिफल_-220x150.jpg",
//   },
//   {
//     id: 2,
//     title:
//       "Aaj Ka Rashifal: इन 5 राशियों के लिए आज का दिन है शुभ, आएगा पैसा ही पैसा!",
//     link: "",
//     date: "January 23, 2025",
//     urlToImage:
//       "https://bharatsamachartv.in/wp-content/uploads/2025/01/Untitled-design-5-1-220x150.png",
//   },
//   {
//     id: 3,
//     title:
//       "Aaj Ka Rashifal: मेष, वृषभ और वृश्चिक को मिलेगा सफलता का तोहफा, जानें आपके लिए क्या है खास!",
//     link: "",
//     date: "January 22, 2025",
//     urlToImage:
//       "https://bharatsamachartv.in/wp-content/uploads/2025/01/Horoscope-3-220x150.png",
//   },
// ];
export default function Rashiphal() {
  const [posts, setPosts] = useState();
  const [error, setError] = useState("");
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();
  const handleNewsContent = (post) => {
    setNews(post);
    navigate(`/readNews/${post.title}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://daily-rashifal-api.p.rapidapi.com/all",
          {
            headers: {
              "x-rapidapi-key":
                "1c77ef24a3msh65eb631c17b05e6p1a135bjsn29cbd848fe1a",
              "x-rapidapi-host": "daily-rashifal-api.p.rapidapi.com",
            },
          }
        );
        console.log(res.data.result);
        setPosts(res.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error?.response?.data || "An error occurred");
      }
    };

    fetchData();
  }, []);

  // console.log(posts)
  return (
    <div className="my-2 mt-5 font-sans">
      <Header text="Rashiphal" />
      <ul className="flex flex-wrap gap-4 overflow-y-auto hide-scroll h-[500px]">
        {error !== null ||
          (error !== "" && (
            <p className="text-red-500 font-semibold">{error}</p>
          ))}
        {posts?.map((post) => (
          <li key={post.rashi} className=" ">
            <article className="flex">
              <img
                src={
                  "https://bharatsamachartv.in/wp-content/uploads/2025/01/मेष-वृष-मिथुन-राशिफल_-220x150.jpg"
                }
                alt={post.rashifal}
                className="w-32 h-20 object-cover rounded shadow-lg"
              />
              <div className="px-2">
                <h3
                  className="text-xs font-semibold text-gray-800 hover:text-blue-500"
                  onClick={() =>
                    handleNewsContent({
                      title: post.rashifal,
                      urlToImage:
                        "https://bharatsamachartv.in/wp-content/uploads/2025/01/मेष-वृष-मिथुन-राशिफल_-220x150.jpg",
                    })
                  }
                >
                  {post.rashifal}
                </h3>
                <p className="text-xs text-gray-500">{post.rashi}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
