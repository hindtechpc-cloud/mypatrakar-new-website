import { useState } from "react";
import Header from "../shared/Header";

export const PollWidget = () => {
    const initialPoll = {
      id: 1,
      question: "क्या केजरीवाल को जेल से सरकार चलानी चाहिए?",
      options: [
        {
          id: 1,
          option: "हां",
          votes: 20,
        },
        {
          id: 2,
          option: "नहीं",
          votes: 80,
        },
      ],
      totalVotes: 100,
    };
  
    const [poll, setPoll] = useState(initialPoll);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleVote = (optionId) => {
      if (selectedOption) return; // Prevent multiple votes
  
      setSelectedOption(optionId);
      const updatedOptions = poll.options.map((option) => {
        if (option.id === optionId) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });
  
      const newTotalVotes = poll.totalVotes + 1;
      setPoll({
        ...poll,
        options: updatedOptions,
        totalVotes: newTotalVotes,
      });
    };
  
    return (
     <div className="my-2 mt-5 font-sans">
        <Header text="Poll"  />
         <div className="bg-gray-200 p-4 shadow-lg rounded-lg  w-full">
        <h3 className="text-lg font-bold mb-3">{poll.question}</h3>
  
        <div className="space-y-2">
          {poll.options.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="poll"
                  className="mr-2"
                  disabled={!!selectedOption}
                  onChange={() => handleVote(option.id)}
                />
                {option.option}
              </label>
              <span className="text-sm text-gray-600">
                {option.votes} वोट्स ({((option.votes / poll.totalVotes) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
  
        <p className="text-sm text-gray-500 mt-3">Total votes: {poll.totalVotes}</p>
  
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
          और भी
        </button>
      </div>
     </div>
    );
  };
  