const ErrorMessage = ({ message, retryHandler }) => {
  return (
    <div className="text-center p-4 bg-red-50 rounded-lg">
      <p className="text-red-600 mb-2">{message}</p>
      <button 
        onClick={retryHandler}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;