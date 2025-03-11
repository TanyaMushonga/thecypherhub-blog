import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-900 text-white text-center p-4">
      <FaExclamationTriangle className="text-6xl mb-4 text-red-500" />
      <h2 className="text-4xl font-bold mb-2">Not Found</h2>
      <p className="text-lg mb-4">Could not find the requested resource</p>
      <Link href="/" prefetch={false} className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
