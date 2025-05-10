import {
  FaEnvelope,
  FaFacebook,
  FaPen,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OurReporters() {
  const reporters = [
    {
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      description: "",
    },
    {
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      description: "",
    },
    {
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      description: "",
    },
    {
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      description: "",
    },
    {
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      description: "",
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/feedback");
  };
  return (
    <div className="bg-red-100 w-full min-h-screen py-5 px-4 md:px-10">
      <div className=" mx-auto max-w-5xl">
        {/* Header */}
        <header className=" text-gray-950 p-4 rounded-t-xl flex items-center justify-between">
          <h1 className="font-bold text-lg md:text-xl text-start">
            OUR REPORTERS
          </h1>
          <button
            className="border border-red-400 text-red-600 flex items-center justify-center gap-2 py-2 px-3 rounded"
            onClick={handleClick}
          >
            <div>
              <FaPen />
            </div>
            <div>Feedback</div>
          </button>
        </header>
        {/* reporters 
 
 */}
        <div className="flex flex-wrap items-center md:justify-start justify-center gap-3">
          {reporters.map((reporter, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white rounded-2xl shadow-lg p-4 text-center border border-gray-200"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full border-2 border-gray-300"
                />
                <h2 className="mt-4 text-xl font-bold">सुधीर चौधरी</h2>
                <p className="text-gray-700 font-medium">State Head</p>
                <p className="text-red-600 font-semibold">Area: Delhi</p>
                <div className="flex justify-center gap-2 mt-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaFacebook /> Facebook
                  </a>
                  <a
                    href="mailto:example@gmail.com"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaEnvelope /> Gmail
                  </a>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaPhone /> Call
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
