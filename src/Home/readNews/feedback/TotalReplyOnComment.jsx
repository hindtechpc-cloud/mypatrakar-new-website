import { useEffect, useState } from "react";
import { GetCommentsreply } from "../../../../api";
import { useParams } from "react-router-dom";

export default function TotalreplyOnComment({ id }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { newsId } = useParams();

  const loadReplies = async () => {
    try {
      setLoading(true);
      const res = await GetCommentsreply(id);
      // console.log(res)
      setReplies(res?.data?.response.replies || []);
    } catch (error) {
      setError("Failed to load replies.");
      console.error("Error loading replies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReplies();
  }, []);

  if (loading)
    return <div className="text-sm text-gray-500">Loading replies...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;
  if (replies.length>0 && replies[0].replies?.length === 0)
    return <div className="text-sm text-gray-400">No replies found.</div>;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-700">Replies</h4>

      {replies.length > 0 &&
        replies?.map((reply) => (
          <div
            key={reply.id}
            className="flex items-start gap-3 bg-white p-3 rounded-md shadow-sm"
          >
            <img
              src={
                reply.user?.profile_image_url ||
                "https://customer.mypatrakar.com/assets/No_Image_Available.jpg"
              }
              alt={reply.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    {reply.user?.name || reply.name}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {reply.user?.email || reply.email}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(reply.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{reply.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
