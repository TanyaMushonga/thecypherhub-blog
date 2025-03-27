import { AiOutlineExclamationCircle } from "react-icons/ai";

const Disclaimer = () => {
  return (
    <div className="text-white rounded-lg shadow-lg my-6 p-4 bg-gray-800">
      <div className="flex items-center mb-4">
        <AiOutlineExclamationCircle className="text-yellow-400 text-2xl mr-2" />
        <h2 className="text-xl font-semibold">Disclaimer</h2>
      </div>
      <p className="text-sm mb-2">
        The content provided in this article is based solely on my research and
        personal understanding. While I strive for accuracy, information may
        vary, and readers should verify details independently.
      </p>
      <p className="text-sm mb-2">
        If you wish to redistribute or reference this article, please ensure you
        provide a proper backlink to the original source.
      </p>
      <p className="text-xs text-gray-400 italic">
        Thank you for your understanding and support!
      </p>
    </div>
  );
};

export default Disclaimer;