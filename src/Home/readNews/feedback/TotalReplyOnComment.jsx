// import { useCallback, useEffect, useState } from "react";
// import { GetCommentsreply } from "../../../../api";
// import { useParams } from "react-router-dom";

// export default function TotalreplyOnComment({ id,isReply }) {
//   const [replies, setReplies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { newsId } = useParams();

//   const loadReplies =useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await GetCommentsreply(id);
//       console.log(res)
//       setReplies(res?.data?.response.replies || []);
//     } catch (error) {
//       setError("Failed to load replies.");
//       console.log("Error loading replies:", error);
//     } finally {
//       setLoading(false);
//     }
//   },[])

//   useEffect(() => {
//     loadReplies();
//   }, [isReply, loadReplies]);

//   if (loading)
//     return <div className="text-xs text-gray-500">Loading replies...</div>;
//   if (error) return <div className="text-xs text-red-500">{""}</div>;
//   if (replies.length>0 && replies[0].replies?.length === 0)
//     return <div className="text-xs text-gray-400">No replies found.</div>;

//   return (
//     <div className="space-y-4">
//       <h4 className="text-xs font-semibold text-gray-700">Replies</h4>

//       {replies.length > 0 &&
//         replies?.map((reply) => (
//           <div
//             key={reply.id}
//             className="flex items-start gap-3 bg-white p-3 rounded-md shadow-sm"
//           >
//            <img
//   src={
//     !reply.user?.profile_image_url
//       ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}/${reply.user.profile_image_url}`
//       : "https://wallpaperaccess.com/full/4723250.jpg"
//   }
//   alt={reply.name}
//   className="w-10 h-10 rounded-full object-cover border"
// />

//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h5 className="text-xs font-medium text-gray-900">
//                     {reply.user?.name || reply.name}
//                   </h5>
//                   <p className="text-xs text-gray-500">
//                     {reply.user?.email || reply.email}
//                   </p>
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {new Date(reply.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <p className="mt-2 text-xs text-gray-700">{reply.comment}</p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }




import { useCallback, useEffect, useState } from "react";
import { GetCommentsreply } from "../../../../api";
import { useParams } from "react-router-dom";

export default function TotalReplyOnComment({ id, isReply }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { newsId } = useParams();

  const loadReplies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await GetCommentsreply(id);
      const fetchedReplies = res?.data?.response?.replies || [];
      setReplies(fetchedReplies);
    } catch (err) {
      console.error("Error loading replies:", err);
      setError("Failed to load replies.");
    } finally {
      setLoading(false);
    }
  }, [id]); // <-- Added `id` as dependency

  useEffect(() => {
    loadReplies();
  }, [isReply, loadReplies]);

  if (loading) {
    return <div className="text-xs text-gray-500">Loading replies...</div>;
  }

  if (error) {
    return <div className="text-xs text-red-500">{error}</div>;
  }

  if (replies.length === 0) {
    return <div className="text-xs text-gray-400">No replies found.</div>;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold text-gray-700">Replies</h4>

      {replies?.slice(0,10)?.map((reply) => {
        const user = reply.user || {};
        const profileImageUrl = user.profile_image_url
          ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}/${user.profile_image_url}`
          : "https://wallpaperaccess.com/full/4723250.jpg";

        return (
          <div
            key={reply.id}
            className="flex items-start gap-3 bg-white p-3 rounded-md shadow-sm"
          >
            <img
              src={profileImageUrl}
              alt={user.name || reply.name}
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-medium text-gray-900">
                    {user.name || reply.name}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {user.email || reply.email}
                  </p>
                </div>
                {/* <span className="text-xs text-gray-400">
                  {new Date(reply.date).toLocaleDateString()}
                </span> */}
  {new Date(reply.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}

              </div>
              <p className="mt-2 text-xs text-gray-700">{reply.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
