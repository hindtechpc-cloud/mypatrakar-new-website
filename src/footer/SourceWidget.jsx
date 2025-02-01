import image from "../assets/Ellipse.svg";
import image2 from "../assets/logoG.jpg";
import play from "../assets/play.png";
import apple from "../assets/apple.jpeg";

export default function SourceWidget(props) {
  return (
    <div className={props.className}>
      {/* Logo */}
      <div className="flex justify-center">
        <img src={image} alt="Company logo" className="w-20" />
      </div>

      {/* Title */}
      <h3 className="text-center text-md font-semibold mt-4 text-yellow-400">
        FOR SMARTPHONES AND TABLETS
      </h3>

      {/* Download Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-6">
        <button className="w-5/6">
          <a href="#" className="text-sm font-medium w-">
            <img src={play} alt="google play" className="w-full"/>
          </a>
        </button>
        <button className="w-5/6  ">
          <a href="#" className="text-sm font-medium">
            <img src={apple} alt="apple image" className="w-full"/>
          </a>
        </button>
      </div>

      {/* Google Sign-Up Button */}
      <div className="mt-6">
        <button className="flex items-center justify-center gap-3 bg-blue-700 text-gray-50 rounded-lg w-full py-1 px-1 shadow-md hover:bg-blue-600 transition-all duration-300">
          <img
            src={image2}
            alt="Google icon"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
