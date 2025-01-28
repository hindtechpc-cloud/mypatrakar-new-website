import Header from "../shared/Header";

const posts = [
  {
    id: 1,
    title:
      "Horoscope: इन 3 राशियों का भाग्य चमकेगा, मेहनत लाएगी रंग, पढ़ें आज का राशिफल",
    link: "",
    date: "January 25, 2025",
    imgSrc:
      "https://bharatsamachartv.in/wp-content/uploads/2025/01/मेष-वृष-मिथुन-राशिफल_-220x150.jpg",
  },
  {
    id: 2,
    title:
      "Aaj Ka Rashifal: इन 5 राशियों के लिए आज का दिन है शुभ, आएगा पैसा ही पैसा!",
    link: "",
    date: "January 23, 2025",
    imgSrc:
      "https://bharatsamachartv.in/wp-content/uploads/2025/01/Untitled-design-5-1-220x150.png",
  },
  {
    id: 3,
    title:
      "Aaj Ka Rashifal: मेष, वृषभ और वृश्चिक को मिलेगा सफलता का तोहफा, जानें आपके लिए क्या है खास!",
    link: "",
    date: "January 22, 2025",
    imgSrc:
      "https://bharatsamachartv.in/wp-content/uploads/2025/01/Horoscope-3-220x150.png",
  },
 
 
];
export default function Rashiphal() {
  return (
    <div className="my-2 mt-5 font-sans">
      <Header text="Rashiphal" />
      <ul className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className=" "
          >
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex">
              <img
                src={post.imgSrc}
                alt={post.title}
                className="w-32 h-20 object-cover rounded shadow-lg"
              />
              <div className="px-2">
                <h3 className="text-xs font-semibold text-gray-800 hover:text-blue-500">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
