import React, { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
// const news = {
//   source: {
//     id: null,
//     name: "The Times of India",
//   },
//   author: {
//     name: "Rajat",
//     image: "https://picsum.photos/200/300",
//     links: [
//       {
//         url: "https://www.linkedin.com/in/rajat-singh-1b1b3b1b3/",
//         name: "LinkedIn",
//       },
//       {
//         url: "https://www.whatsapp.com/in/rajat-singh-1b1b3b1b3/",
//         name: "whatsapp",
//       },
//       {
//         url: "https://www.email.com/in/rajat-singh-1b1b3b1b3/",
//         name: "email",
//       },
//       { url: "https://www.instagram.com/rajat_2502/", name: "Instagram" },
//       { url: "https://twitter.com/RajatSi2502", name: "Twitter" },
//       { url: "https://www.facebook.com/rajat.singh.2502", name: "Facebook" },
//       {
//         url: "https://www.youtube.com/channel/UC9QJQJ9Zjv3ZJjJLJ9Zzv9A",
//         name: "Youtube",
//       },
//     ],
//   },
//   title: "This is comes from country section",
//   urlToImage:
//     "https://static.toiimg.com/thumb/msid-79510186,width-1070,height-580,imgsize-101117,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
//   publishedAt: "2020-05-15T14:30:00",
//   views: 100,
//   comments: 1020,
//   category: "Sports",
//   content:
//     "MELBOURNE: India's star batsmen Rohit Sharma, Virat Kohli and Rishabh Pant will join the squad on Wednesday ahead of the first Test against Australia, starting on December 17.The trio was not a part of the limi… [+1602 chars]",
// };
const NewsCard = ({
  news,
  className,
  classNameToImage,
  image,
  ctaText,
  title,
  description,
}) => {
  const navigate = useNavigate();
  const { setNews } = useContext(NewsContext);
  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/readNews/${title}`);
  };
  return (
    <div className={`relative ${className}`}>
      {/* Image Section */}
      <div className={`relative overflow-hidden ${classNameToImage}`}>
        <img
          src={image}
          alt="News"
          className="rounded-lg w-full h-full object-cover"
        />
        {/* CTA Button Stuck to Image Bottom-Right */}
        <button className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
          {ctaText}
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-grow mt-3">
        {/* Title */}
        <h2
          className="text-lg md:text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:underline"
          onClick={() => handleNewsContent(news)}
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-sm text-gray-600 mb-3">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
