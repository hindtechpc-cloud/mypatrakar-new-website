// import { useState, useEffect } from "react";
// import { GetCommentsOnNews } from "../../../../api";
// import ReplyOnComment from "./ReplyOnCommnet";
// import TotalreplyOnComment from "./TotalReplyOnComment";
// import { useParams } from "react-router-dom";

// export default function TotalCommnets() {
//   const { newsId } = useParams();
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [replyingTo, setReplyingTo] = useState(null);

//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const response = await GetCommentsOnNews(newsId);
//         console.log(response);
//         if (response.status === 200) {
//           setComments(response.data.response);
//         } else {
//           setError("Failed to load comments");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadComments();
//   }, [newsId]);

//   const handleReplySuccess = (newReply, parentCommentId) => {
//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === parentCommentId
//           ? { ...comment, replies: [...(comment.replies || []), newReply] }
//           : comment
//       )
//     );
//     setReplyingTo(null);
//   };

//   if (loading)
//     return <div className="text-center py-8">Loading comments...</div>;
//   if (error)
//     return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//         Comments ({comments.length})
//       </h3>

//       {comments.length === 0 ? (
//         <p className="text-gray-500 text-center py-4">
//           No comments yet. Be the first to comment!
//         </p>
//       ) : (
//         comments.length > 0 &&
//         comments?.map((comment) => (
//           <div
          
//             key={comment.news_is}
//             className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
//           >
//             <div className="flex items-start space-x-3">
//               <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center">
//                <img src={comment?.user?.profile_image_url} alt={comment?.user?.name} />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2">
//                   <h4 className="font-medium text-gray-900">{comment.name}</h4>
//                   <span className="text-xs text-gray-500">
//                     {new Date(comment?.date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-gray-700">{comment.comment}</p>

//                 <div className="mt-3 flex items-center space-x-4">
//                   <button
//                     onClick={() =>
//                       setReplyingTo(
//                         replyingTo === comment.news_id ? null : comment.news_id
//                       )
//                     }
//                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     Reply
//                   </button>
//                   {comment.replies?.length > 0 && (
//                     <span className="text-sm text-gray-500">
//                       {comment.replies.length}{" "}
//                       {comment.replies.length === 1 ? "reply" : "replies"}
//                     </span>
//                   )}
//                 </div>

//                 {replyingTo === comment.id && (
//                   <div className="mt-4 pl-4 border-l-2 border-blue-100">
//                     <ReplyOnComment
//                       parentCommentId={comment.id}
//                       onSuccess={(newReply) =>
//                         handleReplySuccess(newReply, comment.id)
//                       }
//                     />
//                   </div>
//                 )}

//                 {comment.replies?.length > 0 && (
//                   <div className="mt-4 pl-4 border-l-2 border-gray-100">
//                     <TotalreplyOnComment replies={comment.replies} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { GetCommentsOnNews } from "../../../../api";
import ReplyOnComment from "./ReplyOnCommnet";
import TotalreplyOnComment from "./TotalReplyOnComment";
import { useParams } from "react-router-dom";

export default function TotalCommnets() {
  const { newsId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await GetCommentsOnNews(newsId);
        if (response.status === 200) {
          // Map the response to add empty replies array if not present
          const formattedComments = response.data.response.map(comment => ({
            ...comment,
            replies: comment.replies || []
          }));
          setComments(formattedComments);
        } else {
          setError("Failed to load comments");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [newsId]);

  const handleReplySuccess = (newReply, parentCommentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.user_id === parentCommentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
    setReplyingTo(null);
  };

  if (loading) return <div className="text-center py-8">Loading comments...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.user_id}  // Changed from news_is to user_id for unique key
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 rounded-full w-10 h-10 overflow-hidden">
                <img 
                  src={comment.user?.profile_image_url || "https://customer.mypatrakar.com/assets/No_Image_Available.jpg"} 
                  alt={comment.user?.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://customer.mypatrakar.com/assets/No_Image_Available.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{comment.user?.name || comment.name}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">{comment.comment}</p>

                <div className="mt-3 flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.user_id ? null : comment.user_id
                      )
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reply
                  </button>
                  {comment.replies.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {comment.replies.length}{" "}
                      {comment.replies.length === 1 ? "reply" : "replies"}
                    </span>
                  )}
                </div>

                {replyingTo === comment.user_id && (
                  <div className="mt-4 pl-4 border-l-2 border-blue-100">
                    <ReplyOnComment
                      parentCommentId={newsId}
                      onSuccess={(newReply) =>
                        handleReplySuccess(newReply, comment.user_id)
                      }
                    />
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-100">
                    <TotalreplyOnComment replies={comment.replies} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}