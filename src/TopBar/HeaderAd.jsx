import MypatrakarLogo1 from "../assets/MyPatrakarLogo1.png";

const HeaderAd = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row justify-around items-center  py-3 ">
      {/* Left Section - Logo */}
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={MypatrakarLogo1}
          alt="MyPatrakar Logo"
          className="w-32 sm:w-40 md:w-48 lg:w-52 xl:w-56 object-contain"
        />
      </div>

      {/* Right Section - Advertisement */}
      <div className="flex flex-col items-center w-full md:w-auto">
      
        <div className="bg-gray-200 w-full md:w-[728px] h-[120px] flex items-center justify-center">
          <span className="text-sm text-gray-700 text-center px-2">
            Home Page Leaderboard: 728px * 120px
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderAd;
