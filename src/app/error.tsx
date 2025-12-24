"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="flex flex-col items-center max-w-md w-full space-y-6">
        {/* Icon with a subtle glow effect */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 mb-4">
          <FaExclamationCircle className="text-5xl text-destructive" />
          <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold text-slate-200">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-lg">
            We encountered an unexpected error. You can try refreshing the page
            or return home.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-red-400 text-sm font-mono mt-4 bg-black/20 p-2 rounded border border-red-900/50">
              {error.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            onClick={() => reset()}
            className="font-semibold px-8"
          >
            Try Again
          </Button>
          <Link href="/" prefetch={false}>
            <Button size="lg" variant="outline" className="font-semibold px-8">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
