"use client";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Facebook, Linkedin, Twitter, Link } from "lucide-react";

function CopyLink() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${currentUrl}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`,
      "_blank"
    );
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={shareOnFacebook}
        className="inline-flex items-center justify-center"
        aria-label="Share on Facebook"
      >
        <Facebook className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="inline-flex items-center justify-center"
        aria-label="Share on Twitter"
      >
        <Twitter className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="inline-flex items-center justify-center"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center justify-center"
        aria-label="Copy link to clipboard"
      >
        <Link className="text-lg text-white h-7 w-7" />
      </button>
    </div>
  );
}

export default CopyLink;