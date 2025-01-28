import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-4xl text-red-600" />
        <p className="mt-2 text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
