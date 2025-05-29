import { useEffect, useState } from "react";
import Header from "../shared/Header";
import { getPollByCategoryId, getPollsIds, submitVote } from "../../../../api";
import toast from "react-hot-toast";

export const PollWidget = () => {
  const [pollIds, setPollIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const userId = "MYAU30042025001"; // ✅ Replace with dynamic user ID when available

  const handleVoteChange = (optionId) => {
    if (submitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = async () => {
    if (!selectedOptionId || !poll || !poll.question_id) return;
    // console.log(poll.question_id, selectedOptionId,userId);
    try {
      // ✅ Submit vote to backend
      const res = await submitVote({
        user_id: userId,
        question_id: poll.question_id,
        option_id: selectedOptionId,
      });
      // console.log("Submitted vote:", res);

      // ✅ Update local UI
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
      toast.success(res?.data?.response?.message||"Poll submitted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.response?.message || "Failed to submit vote");
    }
  };

  const fetchPollData = async (categoryId) => {
    try {
      const res = await getPollByCategoryId(categoryId);
      const data = res?.data?.response?.[0];
      if (data) {
        const formattedPoll = {
          question_id: data.poll_id,
          question: data.poll_title,
          options: data.options.map((opt) => ({
            option_id: opt.option_id,
            option: opt.option,
            votes: parseInt(opt.votes || 0),
          })),
          totalVotes: parseInt(data.total_poll_votes || 0),
        };
        setPoll(formattedPoll);
      }
    } catch (error) {
      console.error("Error fetching poll:", error);
    }
  };

  const loadPollIds = async () => {
    const res = await getPollsIds();
    const ids = res?.data?.response || [];
    setPollIds(ids);
    if (ids.length > 0) {
      fetchPollData(ids[0].category_id);
    }
  };

  const goToPoll = async (index) => {
    if (index >= 0 && index < pollIds.length) {
      setSelectedOptionId(null);
      setSubmitted(false);
      setCurrentIndex(index);
      await fetchPollData(pollIds[index].category_id);
    }
  };

  useEffect(() => {
    loadPollIds();
  }, []);

  if (!poll) return <div className="text-center py-4">लोड हो रहा है...</div>;

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[300px] mx-auto py-4">
      <Header text="Poll" />
      <div className="bg-gray-200 p-4 shadow-lg rounded-lg w-full">
        <h3 className="text-lg font-bold mb-3">{poll.question}</h3>

        <div className="space-y-2">
          {poll.options.map((option) => (
            <div
              key={option.option_id}
              className="flex items-center justify-between"
            >
              <label className="flex items-center">
                <input
                  type="radio"
                  name="poll"
                  className="mr-2"
                  disabled={submitted}
                  checked={selectedOptionId === option.option_id}
                  onChange={() => handleVoteChange(option.option_id)}
                />
                {option.option}
              </label>
              <span className="text-sm text-gray-600">
                {option.votes} वोट्स (
                {poll.totalVotes > 0
                  ? ((option.votes / poll.totalVotes) * 100).toFixed(1)
                  : 0}
                %)
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-3">
          कुल वोट्स: {poll.totalVotes}
        </p>

        <div className="flex justify-between items-center gap-2 mt-4">
          <button
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50"
            onClick={() => goToPoll(currentIndex - 1)}
            disabled={currentIndex <= 0}
          >
            Previous
          </button>

          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!selectedOptionId || submitted}
          >
            Submit
          </button>

          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
            onClick={() => goToPoll(currentIndex + 1)}
            disabled={currentIndex >= pollIds.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
