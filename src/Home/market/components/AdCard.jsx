import { FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AdCard = ({ ad }) => {
  return (
    <div className="rounded-xl shadow-md border p-3">
      <Link to={`/market-place/${ad.id}`}>
      <img
        src={ad.image}
        alt={ad.title}
        className="rounded-lg w-full h-36 object-cover"
      />
      <h3 className="font-semibold mt-2 text-lg">{ad.title}</h3>
      <p className="text-sm text-gray-600">{ad.subtitle}</p>
      <p className="font-bold mt-1 text-black">₹{ad.price}</p>
      <div className="flex items-center mt-1 text-xs text-gray-500">
        <FaPinterestP className="text-red-600 mr-1" />
        Promoted by {ad.company}
      </div>
      </Link>
    </div>
  );
};
