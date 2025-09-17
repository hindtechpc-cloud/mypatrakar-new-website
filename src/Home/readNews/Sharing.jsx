// import { Eye, MessageCircle, Layers } from "lucide-react";

import { BsEye, BsLayers } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function Sharing({ data }) {
  return (
    <div className="flex items-center space-x-4  my-5 ">
      <div className="flex items-center space-x-1">
        <BsEye className="w-5 h-5 text-blue-500" />
        <span className="text-xs">
          {data?.views > 1000 ? data.views / 1000 + "k" : data?.views}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <FiMessageCircle className="w-5 h-5 text-blue-500" />
        <span className="text-xs">
          {data?.comments > 1000 ? data.comments / 1000 + "k" : data.comments}{" "}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <BsLayers className="w-5 h-5 text-blue-500" />
        <span className="text-xs">{data?.category ?? "News"}</span>
      </div>
      {data?.video && (
        <div className="flex items-center space-x-1">
          <FaYoutube className="w-5 h-5 text-red-500" />
          <a href={data?.video} target="_black" className="text-xs">
            Watch on Youtube
          </a>
        </div>
      )}
    </div>
  );
}
