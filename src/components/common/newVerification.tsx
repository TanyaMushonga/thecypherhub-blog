/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  LuLoaderCircle,
  LuMailCheck,
  LuArrowRight,
  LuRefreshCw,
} from "react-icons/lu";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCircleNotch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function NewVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<
    "loading" | "success" | "error" | "invalid"
  >("loading");
  const [message, setMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const verifyToken = useCallback(async () => {
    if (!token) {
      setState("invalid");
      setMessage("Verification link is invalid or expired.");
      return;
    }

    try {
      setState("loading");
      setMessage("Verifying your email...");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/email-confirmation`,
        { token },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.status === 200) {
        setState("success");
        setMessage(
          response.data.message || "Your email has been verified successfully!"
        );

        // Auto-redirect after 5 seconds on success
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        throw new Error(response.data.error || "Verification failed");
      }
    } catch (err: any) {
      console.error("Verification error:", err);

      let errorMessage = "Something went wrong. Please try again.";

      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please check your connection.";
      } else if (err.response?.status === 400) {
        errorMessage = "Invalid or expired verification token.";
      } else if (err.response?.status === 409) {
        errorMessage = "Email already verified.";
        setState("success");
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setState("error");
      setMessage(errorMessage);
    }
  }, [token, router]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    verifyToken();
  };

  const handleRedirect = () => {
    router.push("/");
  };

  const StatusIcon = () => {
    switch (state) {
      case "loading":
        return (
          <LuLoaderCircle className="w-16 h-16 text-primary animate-spin" />
        );
      case "success":
        return <AiOutlineCheckCircle className="w-16 h-16 text-green-500" />;
      case "error":
        return <FaCircleNotch className="w-16 h-16 text-destructive" />;
      case "invalid":
        return <LuMailCheck className="w-16 h-16 text-yellow-500" />;
      default:
        return null;
    }
  };

  const StatusTitle = () => {
    switch (state) {
      case "loading":
        return "Verifying Your Email";
      case "success":
        return "Email Verified! 🎉";
      case "error":
        return "Verification Failed";
      case "invalid":
        return "Invalid Verification Link";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-background to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Animated background effects */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

          {/* Animated linear border */}
          <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-br from-transparent via-primary/20 to-transparent -z-10" />

          <div className="relative z-10">
            {/* Icon Container */}
            <motion.div
              key={state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div
                className={`p-4 rounded-full ${
                  state === "loading"
                    ? "bg-primary/10"
                    : state === "success"
                    ? "bg-green-500/10"
                    : state === "error"
                    ? "bg-destructive/10"
                    : "bg-yellow-500/10"
                }`}
              >
                <StatusIcon />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={`title-${state}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-center mb-4 bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent"
            >
              {StatusTitle()}
            </motion.h1>

            {/* Message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`message-${state}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-center mb-8 ${
                  state === "success"
                    ? "text-green-400"
                    : state === "error"
                    ? "text-destructive"
                    : state === "invalid"
                    ? "text-yellow-400"
                    : "text-muted-foreground"
                }`}
              >
                {message}
              </motion.p>
            </AnimatePresence>

            {/* Loading Progress */}
            {state === "loading" && (
              <div className="mb-8">
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  This usually takes a few seconds...
                </p>
              </div>
            )}

            {/* Success Countdown */}
            {state === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping" />
                    <div className="relative w-6 h-6 border-2 border-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-500">
                        5
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-green-400">
                    Redirecting in 5 seconds...
                  </span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {state === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      className="w-full h-12 border-primary text-primary hover:bg-primary/10"
                    >
                      <LuRefreshCw
                        className={`mr-2 h-5 w-5 ${
                          retryCount > 0 ? "animate-spin" : ""
                        }`}
                      />
                      {retryCount > 0 ? "Retrying..." : "Try Again"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Attempt {retryCount + 1} of 3
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Always show home button except during loading */}
              {state !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={handleRedirect}
                    className="w-full h-12 bg-linear-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold group"
                  >
                    {state === "success" ? "Go to Homepage" : "Back to Home"}
                    <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {/* Additional options for error state */}
              {state === "error" && retryCount >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    Still having trouble?
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/contact")}
                    className="text-primary hover:text-primary/80"
                  >
                    Contact Support
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Need help?{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:text-primary/80 underline underline-offset-2"
            >
              Refresh page
            </button>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} The Cypher Hub
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NewVerificationForm;
