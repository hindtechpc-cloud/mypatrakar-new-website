// import React from "react";
// import Slider from "react-slick";

// const ImageGallerySlider = ({ news }) => {
//   // 🧠 Testing: jab tak backend multiple images nahi bhej raha
//   const images = [
//     news.news_img_url,
//     news.news_img_url,
//     news.news_img_url,
//   ];
//   // 🎯 Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     arrows: true,
//     adaptiveHeight: true,
//   };

//   return (
//     <div className="w-full  mx-auto bg-gray-900 rounded-xl shadow-md p-2">
//       <Slider {...settings}>
//         {images?.map((img, index) => (
//           <div key={index} className="flex justify-center items-center h-96">
//             <img
//               src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${img}`}
//               alt={`news-slide-${index}`}
//               className="h-96 w-full object-cover rounded-lg shadow-sm"
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ImageGallerySlider;



import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const ImageGallerySlider = ({ news }) => {
  // 🧠 Testing: jab tak backend multiple images nahi bhej raha
  const images = [news.news_img_url, news.news_img_url, news.news_img_url];

  // 🎯 Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="relative w-full mx-auto bg-gray-900 rounded-xl shadow-md overflow-">
      <Slider {...settings}>
        {images?.map((img, index) => (
          <div key={index} className="flex justify-center items-center h-96">
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${img}`}
              alt={`news-slide-${index}`}
              className="h-96 w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>

      {/* Overlay gradient for better dot visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-xl" />
    </div>
  );
};

export default ImageGallerySlider;
