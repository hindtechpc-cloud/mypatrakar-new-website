import { Link } from "react-router-dom";
import Header from "../shared/Header";

export default function Shorts() {
  const article = {
    urlToImage: "https://picsum.photos/200/500", // Replace with actual image URL
    category: "India",
    title:
      "Katchatheevu issue: India got Wadge Bank… agreement in good faith, say former diplomats",
    updated: "April 3, 2024 11:50 IST",
    description:
      "India and Sri Lanka signed agreements in 1974 and 1976 to establish sovereignty over Katchatheevu island and the Wadge Bank. These agreements have been respected by both countries and the Wadge Bank...India and Sri Lanka signed agreements in 1974 and 1976 to establish sovereignty over Katchatheevu island and the Wadge Bank. These agreements have been respected by both countries and the Wadge Bank...India and Sri Lanka signed agreements in 1974 and 1976 to establish sovereignty over Katchatheevu island and the Wadge Bank. These agreements have been respected by both countries and the Wadge Bank...India and Sri Lanka signed agreements in 1974 and 1976 to establish sovereignty over Katchatheevu island and the Wadge Bank. These agreements have been respected by both countries and the Wadge Bank...India and Sri Lanka signed agreements in 1974 and 1976 to establish sovereignty over Katchatheevu island and the Wadge Bank. These agreements have been respected by both countries and the Wadge Bank...",
  };

  return (
    <div className="my-2 mt-5 font-sans">
      <Header text="Shorts" />
      <div className="flex items-center justify-center relative">
        {/* Mobile Frame */}
        <div className="relative w-[250px] h-[500px] bg-gray-400 rounded-[2.5rem] shadow-2xl border-[12px] border-black overflow-hidden">
          {/* Screen Content */}
          <div className="h-full  rounded-[2rem] bg-gray-50 flex flex-col relative">
            {/* Logo */}
            <div className="text-center mt-">
              <h1 className="text-lg font-bold text-red-500">
                <span className="text-black">MY</span> Patrakar{" "}
                <span className="text-black">Shorts</span>
              </h1>
            </div>
            {/* Article Content */}
            <div className="flex-1 overflow-y-auto px-1 border-b-2 bg-gray-50 rounded-2xl shadow-2xl mx-auto">
              {/* Article Image */}
              <div className="w-full h-32  rounded-lg mt-4 ">
                <img
                  src={article.urlToImage}
                  alt="Article"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-sm font-semibold text-gray-800 leading-tight">
                {article.title}
              </h2>

              {/* Category & Updated Time */}
              <p className="text-xs text-gray-500 mt-2">
                <span className="text-red-500 font-semibold">
                  {article.category}
                </span>{" "}
                · Updated: {article.updated}
              </p>

              {/* Description */}
              <p className="text-xs text-gray-700 mt-3">
                {article.description}
              </p>
            </div>

            {/* Footer Button */}
            <div className="text-center p-2  bg-gray-100 mt-2">
              <Link
                to={`/shorts/${article.title}`}
                className="text-red-500 font-semibold text-sm hover:underline"
              >
                VIEW ALL SHORTS
                <div className="bg-black w-10 h-[1px] mx-auto flex items-center justify-center mt-1"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
