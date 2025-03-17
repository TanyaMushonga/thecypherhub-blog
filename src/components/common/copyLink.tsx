"use client";
import toast from "react-hot-toast";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";

function CopyLink() {
  const currentUrl = window.location.href;

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
        <FaFacebook className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="inline-flex items-center justify-center"
        aria-label="Share on Twitter"
      >
        <RiTwitterXLine className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="inline-flex items-center justify-center"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="text-lg text-white h-7 w-7" />
      </button>
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center justify-center"
        aria-label="Copy link to clipboard"
      >
        <FaLink className="text-lg text-white h-7 w-7" />
      </button>
    </div>
  );
}

export default CopyLink;
