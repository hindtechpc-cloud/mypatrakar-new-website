// import { useState, useEffect } from "react";
// import { GetCommentsOnNews } from "../../../../api";
// import ReplyOnComment from "./ReplyOnCommnet";
// import TotalreplyOnComment from "./TotalReplyOnComment";
// import { useParams } from "react-router-dom";
// import { decryptData } from "../../../utils/cryptoHelper";

// export default function TotalCommnets({ isComment }) {
//   const { newsId } = useParams();
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [isReply, setIsReply] = useState(false);

//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const response = await GetCommentsOnNews(decryptData(newsId));
//         // console.log(response)
//         if (response.status === 200) {
//           // Map the response to add empty replies array if not present
//           const formattedComments = response.data.response.map((comment) => ({
//             ...comment,
//             replies: comment.replies || [],
//           }));
//           setComments(formattedComments);
//         } else {
//           setError("Failed to load comments");
//         }
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadComments();
//   }, [newsId, isComment]);

//   const handleReplySuccess = (newReply, parentCommentId) => {
//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.user_id === parentCommentId
//           ? { ...comment, replies: [...comment.replies, newReply] }
//           : comment
//       )
//     );
//     setReplyingTo(null);
//   };

//   if (loading) {
//     return (
//       <div className="space-y-4 py-8">
//         {[...Array(3)].map((_, index) => (
//           <div key={index} className="animate-pulse flex space-x-4 px-4">
//             <div className="rounded-full bg-gray-300 h-10 w-10"></div>
//             <div className="flex-1 space-y-2 py-1">
//               <div className="h-4 bg-gray-300 rounded w-1/3"></div>
//               <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) null;
//   // return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="space-y-2 mt-10">
//       <h3 className="text text-gray-800 border-b pb-2">
//         Comments ({comments.length})
//       </h3>

//       {comments.length === 0 ? (
//         <p className="text-gray-500 text-center py-2">
//           No comments yet. Be the first to comment!
//         </p>
//       ) : (
//         comments?.slice(0, 2)?.map((comment) => (
//           <div
//             key={comment?.user_id} // Changed from news_is to user_id for unique key
//             className="bg-white rounded-lg shadow-sm p-1 border border-gray-100"
//           >
//             <div className="flex items-start space-x-3">
//               <div className="flex-shrink-0 rounded-full w-10 h-10 overflow-hidden">
//                 <img
//                   src={
//                     comment.user?.profile_image_url ||
//                     "https://customer.mypatrakar.com/assets/No_Image_Available.jpg"
//                   }
//                   alt={comment.user?.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.src =
//                       "https://customer.mypatrakar.com/assets/No_Image_Available.jpg";
//                   }}
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center text-sm space-x-2">
//                   <h4 className="font-medium text-gray-900">
//                     {(comment.date && comment.user?.name) || comment.name}
//                   </h4>
//                   {
//                     <span className="text-sm text-gray-500">
//                       {new Date(comment.date).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   }
//                 </div>
//                 <p className="mt-1 text-gray-700 text-xs">{comment.comment}</p>

//                 <div className="mt-1 flex items-center space-x-4">
//                   <button
//                     onClick={() =>
//                       setReplyingTo(
//                         replyingTo === comment.user_id ? null : comment.user_id
//                       )
//                     }
//                     className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     Reply
//                   </button>
//                   {comment.replies.length > 0 && (
//                     <span className="text-xs text-gray-500">
//                       {comment.replies.length}{" "}
//                       {comment.replies.length === 1 ? "reply" : "replies"}
//                     </span>
//                   )}
//                 </div>

//                 {replyingTo === comment.user_id && (
//                   <div className="mt-1 text-xs pl-4 border-l-2 border-blue-100">
//                     <ReplyOnComment
//                       parentCommentId={comment.id}
//                       onSuccess={(newReply) =>
//                         handleReplySuccess(newReply, comment.user_id)
//                       }
//                       setIsReply={setIsReply}
//                       isReply={isReply}
//                     />
//                   </div>
//                 )}

//                 {comment && (
//                   <div className="mt-1 pl-4 border-l-2 border-gray-100">
//                     <TotalreplyOnComment id={comment.id} isReply={isReply} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//       <p>Next</p>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { GetCommentsOnNews } from "../../../../api";
import ReplyOnComment from "./ReplyOnCommnet";
import TotalreplyOnComment from "./TotalReplyOnComment";
import { useMatch, useParams } from "react-router-dom";
import { decryptData } from "../../../utils/cryptoHelper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TotalCommnets({ isComment }) {
  const match = useMatch("/read-news/:type/:newsId");
  // const type = match?.params?.type;
  const newsId = match?.params?.newsId;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isReply, setIsReply] = useState(false);

  // Pagination States
  const [page, setPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await GetCommentsOnNews(decryptData(newsId));
        if (response.status === 200) {
          const formattedComments = response.data.response.map((comment) => ({
            ...comment,
            replies: comment.replies || [],
          }));
          setComments(formattedComments);
        } else {
          setError("Failed to load comments");
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [newsId, isComment]);

  const handleReplySuccess = (newReply, parentCommentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.user_id === parentCommentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
    setReplyingTo(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const paginatedComments = comments.slice(
    (page - 1) * commentsPerPage,
    page * commentsPerPage
  );

  if (loading) {
    return (
      <div className="space-y-4 py-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse flex space-x-4 px-4">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-2 mt-10 mb-5">
      <h3 className="text text-gray-800 border-b pb-2">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-2 border-b">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        paginatedComments.map((comment) => (
          <div
            key={comment?.user_id}
            className="bg-white rounded-lg shadow-sm p-1 border border-gray-100"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 rounded-full w-10 h-10 overflow-hidden">
                <img
                  src={
                    comment.user?.profile_image_url ||
                    "https://customer.mypatrakar.com/assets/No_Image_Available.jpg"
                  }
                  alt={comment.user?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://customer.mypatrakar.com/assets/No_Image_Available.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center text-sm space-x-2">
                  <h4 className="font-medium text-gray-900">
                    {(comment.date && comment.user?.name) || comment.name}
                  </h4>
                  {
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  }
                </div>
                <p className="mt-1 text-gray-700 text-xs">{comment.comment}</p>

                <div className="mt-1 flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.user_id ? null : comment.user_id
                      )
                    }
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reply
                  </button>
                  {comment.replies.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {comment.replies.length}{" "}
                      {comment.replies.length === 1 ? "reply" : "replies"}
                    </span>
                  )}
                </div>

                {replyingTo === comment.user_id && (
                  <div className="mt-1 text-xs pl-4 border-l-2 border-blue-100">
                    <ReplyOnComment
                      parentCommentId={comment.id}
                      onSuccess={(newReply) =>
                        handleReplySuccess(newReply, comment.user_id)
                      }
                      setIsReply={setIsReply}
                      isReply={isReply}
                    />
                  </div>
                )}

                {comment && (
                  <div className="mt-1 pl-4 border-l-2 border-gray-100">
                    <TotalreplyOnComment id={comment.id} isReply={isReply} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center py-6">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#374151",
                  backgroundColor: "#d1d5db80",
                  borderRadius: "8px",
                  border: "1px solid #fff",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontWeight: "bold",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#9ca3af",
                  color: "black",
                },
              }}
            />
          </Stack>
        </div>
      )}
    </div>
  );
}
