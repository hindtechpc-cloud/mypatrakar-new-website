import { useEffect, useState, useCallback, useContext } from "react";
import Header from "../shared/Header";
import { getPollByCategoryId, getPollsIds, submitVote } from "../../../../api";
import toast from "react-hot-toast";
import SourceWidget from "../../../footer/SourceWidget";
import PropTypes from "prop-types";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaChartBar,
  FaUsers,
  FaVoteYea,
} from "react-icons/fa";
import { WebThemeContext } from "../../../context/ThemeContext";

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
  const [loading, setLoading] = useState(true);
  const { webTheme } = useContext(WebThemeContext);
  // Authentication
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.user_id;
  const bgColor = webTheme["bg-color"];
  /**
   * Handle vote selection
   */
  const handleVoteChange = useCallback(
    (optionId) => {
      if (submitted) return;
      setSelectedOptionId(optionId);
    },
    [submitted]
  );

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

      // Optimistic UI update with animation
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
      toast.success(
        res?.data?.response?.message || "🎉 Vote submitted successfully!"
      );
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
    if (!selectedOptionId) {
      toast.error("Please select an option to vote");
      return;
    }

    if (submitted) {
      toast.error("You have already voted in this poll");
      return;
    }

    if (!user || !userId) {
      setShowLoginOverlay(true);
      toast.error("Please login to vote");
      return;
    }

    await submitVoteToServer();
  }, [selectedOptionId, submitted, user, userId, submitVoteToServer]);

  /**
   * Fetch poll data
   */
  const fetchPollData = useCallback(async (categoryId) => {
    setLoading(true);
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
            percentage: 0,
          })),
          totalVotes: parseInt(data.total_poll_votes || 0),
        });
      }
    } catch (error) {
      console.error("Poll fetch error:", error);
    } finally {
      setLoading(false);
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
      setLoading(false);
    }
  }, [fetchPollData]);

  /**
   * Navigate to a specific poll
   */
  const goToPoll = useCallback(
    async (index) => {
      if (index >= 0 && index < pollIds.length) {
        setSelectedOptionId(null);
        setSubmitted(false);
        setCurrentIndex(index);
        await fetchPollData(pollIds[index].category_id);
      }
    },
    [pollIds, fetchPollData]
  );

  /**
   * Handle successful login
   */
  const handleLoginSuccess = useCallback(() => {
    setShowLoginOverlay(false);
    if (selectedOptionId) {
      submitVoteToServer();
    }
  }, [selectedOptionId, submitVoteToServer]);

  // Calculate percentages when poll data changes
  useEffect(() => {
    if (poll && poll.options.length > 0) {
      const updatedOptions = poll.options.map((option) => ({
        ...option,
        percentage:
          poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0,
      }));
      setPoll((prev) => ({ ...prev, options: updatedOptions }));
    }
  }, [poll?.totalVotes]);

  // Load polls on component mount
  useEffect(() => {
    loadPollIds();
  }, [loadPollIds]);

  if (loading) {
    return (
      <div className="mt-4 xl:w-[335px] lg:w-[295px] w-full mx-auto">
        <Header text="Poll" />
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md border border-gray-100 p-8 flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading poll...</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="mt-4 xl:w-[335px] lg:w-[295px] w-full mx-auto">
        <Header text="Poll" />
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md border border-gray-100 p-8 text-center">
          <FaChartBar className="text-4xl text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Polls Available
          </h3>
          <p className="text-gray-500">Check back later for new polls</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 xl:w-[335px] lg:w-[295px] w-full mx-auto relative">
      {/* Login Overlay */}
      {showLoginOverlay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-lg animate-scale-in">
            <button
              onClick={() => setShowLoginOverlay(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl transition-colors z-10"
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

      <Header text="📊 Live Poll" />

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300">
        {/* Poll Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
            Poll {currentIndex + 1}/{pollIds.length}
          </span>
          <span className="flex items-center space-x-1 text-sm text-gray-600">
            <FaUsers className="text-blue-500" />
            <span>{poll.totalVotes} votes</span>
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-bold text-gray-900 mb-6 text-center leading-snug">
          {poll.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {poll.options.map((option) => {
            const isSelected = selectedOptionId === option.option_id;
            const isWinning =
              Math.max(...poll.options.map((o) => o.percentage)) ===
                option.percentage && poll.totalVotes > 0;

            return (
              <div
                key={option.option_id}
                onClick={() => !submitted && handleVoteChange(option.option_id)}
                className={`relative px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? " text-white shadow-md scale-[1.02]"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                  ${submitted && isWinning ? "ring-2 ring-green-400" : ""}
                `}
                style={{
                  background: isSelected ? bgColor : "",
                }}
              >
                {/* Progress Bar Background */}
                {submitted && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-50 rounded-2xl"
                    style={{
                      width: `${option.percentage}%`,
                      opacity: 0.3,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${
                          isSelected
                            ? "border-white bg-white/30"
                            : "border-gray-300 bg-white"
                        }`}
                    >
                      {isSelected && !submitted && (
                        <div
                          className="w-2 h-2  rounded-full"
                          style={{
                            background: isSelected ? bgColor : "",
                          }}
                        ></div>
                      )}
                      {submitted && isSelected && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {option.option}
                    </span>
                  </div>

                  {/* Vote Count */}
                  {submitted && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {option.percentage.toFixed(1)}%
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.votes} votes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div>
            {submitted ? (
              <div className="flex items-center space-x-1 text-green-600 font-medium">
                <FaCheck />
                <span>You've voted!</span>
              </div>
            ) : (
              <span>Select an option to vote</span>
            )}
          </div>

          {submitted && (
            <span className="flex items-center space-x-1 text-green-600 font-medium">
              <FaChartBar />
              <span>Results Live</span>
            </span>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center space-x-3">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
            onClick={() => goToPoll(currentIndex - 1)}
            disabled={currentIndex <= 0 || isSubmitting}
          >
            <FaChevronLeft />
          </button>

          <button
            className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-full transition-all duration-200 font-semibold shadow-md
              ${
                submitted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : ""
              }`}
            onClick={handleSubmit}
            disabled={!selectedOptionId || submitted || isSubmitting}
           style={{
                  background: !submitted ? bgColor : "",
                  color: !submitted ? 'white' : "",
                }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Voting...</span>
              </>
            ) : submitted ? (
              <>
                <FaCheck />
                <span>Voted</span>
              </>
            ) : (
              <>
                <FaVoteYea />
                <span>Vote Now</span>
              </>
            )}
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
            onClick={() => goToPoll(currentIndex + 1)}
            disabled={currentIndex >= pollIds.length - 1 || isSubmitting}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Progress Dots */}
        {pollIds.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {pollIds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPoll(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? " w-6"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                style={
                  {
                    background:index===currentIndex?bgColor:""
                  }
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

PollWidget.propTypes = {};
