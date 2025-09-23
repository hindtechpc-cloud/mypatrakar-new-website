import { FaArrowCircleLeft, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ShortsHeader = ({ 
  lastUpdated, 
  onRefresh, 
  refreshing,
  formatTimeSinceUpdate 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition duration-300"
      >
        <FaArrowCircleLeft size={23} />
      </button>
      
      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="text-xs text-gray-500">
            Updated: {formatTimeSinceUpdate(lastUpdated)}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`p-2 rounded-full ${refreshing 
            ? "bg-gray-200 text-gray-500" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition duration-300`}
        >
          <FaSync className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>
    </div>
  );
};

export default ShortsHeader;