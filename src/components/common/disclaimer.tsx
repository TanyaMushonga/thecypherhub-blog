import { AiOutlineExclamationCircle } from "react-icons/ai";

const Disclaimer = () => {
  return (
    <div className="text-white rounded-lg shadow-lg p-4 mt-4 bg-gray-800 my-6">
      <div className="flex items-center mb-2">
        <AiOutlineExclamationCircle className="text-yellow-400 text-md mr-2" />
        <h2 className="text-md font-semibold">Disclaimer</h2>
      </div>
      <p className="text-sm text-gray-300 mb-2">
        This content reflects my personal research. Please verify details
        independently.
      </p>
      <p className="text-sm text-gray-300">
        If referencing this article, kindly provide a backlink to the original
        source.
      </p>
    </div>
  );
};

export default Disclaimer;
