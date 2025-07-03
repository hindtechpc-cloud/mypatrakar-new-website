// import { useEffect, useState } from "react";
// import Header from "../shared/Header";
// import { getPollByCategoryId, getPollsIds, submitVote } from "../../../../api";
// import toast from "react-hot-toast";
// import { checkAuth } from "../../../utils/checkAuth";

// export const PollWidget = () => {
//   const [pollIds, setPollIds] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [poll, setPoll] = useState(null);
//   const [selectedOptionId, setSelectedOptionId] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   // const userId = "MYAU30042025001"; // ✅ Replace with dynamic user ID when available
//   const user = checkAuth(); // ⬅️ Authenticated user, if any
//   const userId = user?.user_id; // ✅ Replace with dynamic user ID when available
//   const handleVoteChange = (optionId) => {
//     if (submitted) return;
//     setSelectedOptionId(optionId);
//   };

//   const handleSubmit = async () => {
//     if (!selectedOptionId || !poll || !poll.question_id) return;
//     // console.log(poll.question_id, selectedOptionId,userId);
//     if (!userId) {
//       toast.error("Please login to vote");
//       return;
//     }
//     if (submitted) {
//       toast.error("You have already submitted your vote");
//       return;
//     }
//     if (!poll.options.some((opt) => opt.option_id === selectedOptionId)) {
//       toast.error("Please select a valid option");
//       return;
//     }

//     try {
//       // ✅ Submit vote to backend
//       const res = await submitVote({
//         user_id: userId,
//         question_id: poll.question_id,
//         option_id: selectedOptionId,
//       });
//       console.log("Submitted vote:", res);

//       // ✅ Update local UI
//       const updatedOptions = poll.options.map((option) =>
//         option.option_id === selectedOptionId
//           ? { ...option, votes: option.votes + 1 }
//           : option
//       );

//       setPoll((prev) => ({
//         ...prev,
//         options: updatedOptions,
//         totalVotes: prev.totalVotes + 1,
//       }));

//       setSubmitted(true);
//       toast.success(
//         res?.data?.response?.message || "Poll submitted successfully"
//       );
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.response?.message || "Failed to submit vote"
//       );
//     }
//   };

//   const fetchPollData = async (categoryId) => {
//     try {
//       const res = await getPollByCategoryId(categoryId);
//       const data = res?.data?.response?.[0];
//       if (data) {
//         const formattedPoll = {
//           question_id: data.poll_id,
//           question: data.poll_title,
//           options: data.options.map((opt) => ({
//             option_id: opt.option_id,
//             option: opt.option,
//             votes: parseInt(opt.votes || 0),
//           })),
//           totalVotes: parseInt(data.total_poll_votes || 0),
//         };
//         setPoll(formattedPoll);
//       }
//     } catch (error) {
//       console.error("Error fetching poll:", error);
//     }
//   };

//   const loadPollIds = async () => {
//     const res = await getPollsIds();
//     const ids = res?.data?.response || [];
//     setPollIds(ids);
//     if (ids.length > 0) {
//       fetchPollData(ids[0].category_id);
//     }
//   };

//   const goToPoll = async (index) => {
//     if (index >= 0 && index < pollIds.length) {
//       setSelectedOptionId(null);
//       setSubmitted(false);
//       setCurrentIndex(index);
//       await fetchPollData(pollIds[index].category_id);
//     }
//   };

//   useEffect(() => {
//     loadPollIds();
//   }, []);

//   if (!poll) return <div className="text-center py-4">लोड हो रहा है...</div>;

//   return (
//     <>
//       {pollIds.length > 0 && (
//         <div className="my-2 mt-5 font-sans md:max-w-sm w-[350px] mx-auto py-4">
//           <Header text="Poll" />
//           <div className="bg-gray-200 p-4 shadow-lg rounded-lg w-full">
//             <h3 className="text-lg font-bold mb-3">{poll.question}</h3>

//             <div className="space-y-2">
//               {poll.options.map((option) => (
//                 <div
//                   key={option.option_id}
//                   className="flex items-center justify-between"
//                 >
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="poll"
//                       className="mr-2"
//                       disabled={submitted}
//                       checked={selectedOptionId === option.option_id}
//                       onChange={() => handleVoteChange(option.option_id)}
//                     />
//                     {option.option}
//                   </label>
//                   <span className="text-sm text-gray-600">
//                     {option.votes} वोट्स (
//                     {poll.totalVotes > 0
//                       ? ((option.votes / poll.totalVotes) * 100).toFixed(1)
//                       : 0}
//                     %)
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <p className="text-sm text-gray-500 mt-3">
//               कुल वोट्स: {poll.totalVotes}
//             </p>

//             <div className="flex justify-between items-center gap-2 mt-4">
//               <button
//                 className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50"
//                 onClick={() => goToPoll(currentIndex - 1)}
//                 disabled={currentIndex <= 0}
//               >
//                 Previous
//               </button>

//               <button
//                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
//                 onClick={handleSubmit}
//                 disabled={!selectedOptionId || submitted}
//               >
//                 Submit
//               </button>

//               <button
//                 className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
//                 onClick={() => goToPoll(currentIndex + 1)}
//                 disabled={currentIndex >= pollIds.length - 1}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };import { useEffect, useState } from "react";
import { useEffect, useState, useCallback } from "react";
import Header from "../shared/Header";
import { getPollByCategoryId, getPollsIds, submitVote } from "../../../../api";
import toast from "react-hot-toast";
import SourceWidget from "../../../footer/SourceWidget";
import PropTypes from "prop-types";

/**
 * PollWidget - A component that displays polls and handles voting
 * @returns {JSX.Element} The poll widget component
 */
export const PollWidget = () => {
  // State management
  const [pollIds, setPollIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authentication
const user = JSON.parse(sessionStorage.getItem("user"));

  const userId = user?.user_id;
  // console.log(user);

  /**
   * Handle vote selection
   * @param {string} optionId - The ID of the selected option
   */
  const handleVoteChange = useCallback((optionId) => {
    if (submitted) return;
    setSelectedOptionId(optionId);
  }, [submitted]);

  /**
   * Submit the vote to the server
   */
  const submitVoteToServer = useCallback(async () => {
    if (!selectedOptionId || !poll || !poll.question_id || !userId) return;

    setIsSubmitting(true);
    try {
      const res = await submitVote({
        user_id: userId,
        question_id: poll.question_id,
        option_id: selectedOptionId,
      });

      // Optimistic UI update
      const updatedOptions = poll.options.map((option) =>
        option.option_id === selectedOptionId
          ? { ...option, votes: option.votes + 1 }
          : option
      );

      setPoll((prev) => ({
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
      }));

      setSubmitted(true);
      toast.success(res?.data?.response?.message || "Vote submitted successfully");
    } catch (error) {
      console.error("Vote submission error:", error);
      toast.error(
        error?.response?.data?.response?.message || "Failed to submit vote"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedOptionId, poll, userId]);

  /**
   * Handle vote submission
   */
  const handleSubmit = useCallback(async () => {
    // Validation checks
    if (!selectedOptionId || !poll || !poll.question_id) {
      toast.error("Please select an option to vote");
      return;
    }

    if (submitted) {
      toast.error("You have already voted in this poll");
      return;
    }

    if (!poll.options.some((opt) => opt.option_id === selectedOptionId)) {
      toast.error("Invalid option selected");
      return;
    }

    // Authentication check
    if (!user || !userId) {
      setShowLoginOverlay(true);
      toast.error("Please login to vote");
      return;
    }

    // Submit vote
    await submitVoteToServer();
  }, [selectedOptionId, poll, submitted, user, userId, submitVoteToServer]);

  /**
   * Fetch poll data for a specific category
   * @param {string} categoryId - The category ID to fetch
   */
  const fetchPollData = useCallback(async (categoryId) => {
    try {
      const res = await getPollByCategoryId(categoryId);
      const data = res?.data?.response?.[0];
      if (data) {
        setPoll({
          question_id: data.poll_id,
          question: data.poll_title,
          options: data.options.map((opt) => ({
            option_id: opt.option_id,
            option: opt.option,
            votes: parseInt(opt.votes || 0),
          })),
          totalVotes: parseInt(data.total_poll_votes || 0),
        });
      }
    } catch (error) {
      console.error("Poll fetch error:", error);
      // toast.error("Failed to load poll data");
    }
  }, []);

  /**
   * Load all poll IDs
   */
  const loadPollIds = useCallback(async () => {
    try {
      const res = await getPollsIds();
      const ids = res?.data?.response || [];
      setPollIds(ids);
      if (ids.length > 0) {
        await fetchPollData(ids[0].category_id);
      }
    } catch (error) {
      console.error("Poll IDs fetch error:", error);
      // toast.error("Failed to load polls");
    }
  }, [fetchPollData]);

  /**
   * Navigate to a specific poll
   * @param {number} index - The index of the poll to navigate to
   */
  const goToPoll = useCallback(async (index) => {
    if (index >= 0 && index < pollIds.length) {
      setSelectedOptionId(null);
      setSubmitted(false);
      setCurrentIndex(index);
      await fetchPollData(pollIds[index].category_id);
    }
  }, [pollIds, fetchPollData]);

  /**
   * Handle successful login
   */
  const handleLoginSuccess = useCallback(() => {
    setShowLoginOverlay(false);
    // If user had selected an option before logging in, submit automatically
    if (selectedOptionId) {
      submitVoteToServer();
    }
  }, [selectedOptionId, submitVoteToServer]);

  // Load polls on component mount
  useEffect(() => {
    loadPollIds();
  }, [loadPollIds]);

  if (!poll) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[350px] mx-auto py-4 relative">
      {/* Login Overlay */}
      {showLoginOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-md w-full animate-fade-in">
            <button
              onClick={() => setShowLoginOverlay(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
              aria-label="Close login"
            >
              &times;
            </button>
            <SourceWidget
              redirectTo={window.location.pathname}
              onSuccess={handleLoginSuccess}
              className="border-0"
              setShowLoginOverlay={setShowLoginOverlay}
              showLoginOverlay={showLoginOverlay}
            />
          </div>
        </div>
      )}

      <Header text="Poll" />
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{poll.question}</h3>

        <div className="space-y-3 mb-4">
          {poll.options.map((option) => (
            <div
              key={option.option_id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${selectedOptionId === option.option_id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
            >
              <label className="flex items-center w-full cursor-pointer">
                <input
                  type="radio"
                  name="poll"
                  className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                  disabled={submitted}
                  checked={selectedOptionId === option.option_id}
                  onChange={() => handleVoteChange(option.option_id)}
                />
                <span className="flex-1 text-gray-700">{option.option}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {option.votes} votes (
                  {poll.totalVotes > 0
                    ? ((option.votes / poll.totalVotes) * 100).toFixed(1)
                    : 0}
                  %)
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Total votes: {poll.totalVotes}</span>
          {submitted && (
            <span className="text-green-600 font-medium">✓ You voted</span>
          )}
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goToPoll(currentIndex - 1)}
            disabled={currentIndex <= 0 || isSubmitting}
          >
            Previous
          </button>

          <button
            className={`flex-1 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${submitted ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={handleSubmit}
            disabled={!selectedOptionId || submitted || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Submitting...
              </span>
            ) : submitted ? (
              'Vote Submitted'
            ) : (
              'Submit Vote'
            )}
          </button>

          <button
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goToPoll(currentIndex + 1)}
            disabled={currentIndex >= pollIds.length - 1 || isSubmitting}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

PollWidget.propTypes = {
  // Add any prop types if this component receives props
};