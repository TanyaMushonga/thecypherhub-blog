"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import SubscribeModal from "./SubscribeModal";

interface SubscribeModalTriggerProps {
  slug: string;
}

export default function SubscribeModalTrigger({
  slug,
}: SubscribeModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Check if it has already been triggered for this post in this session
    const triggeredPosts = JSON.parse(
      sessionStorage.getItem("subscribed_posts") || "[]"
    );
    if (triggeredPosts.includes(slug)) {
      setHasTriggered(true);
    }
  }, [slug]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Trigger when scrolled 25% (0.25)
    if (latest >= 0.25 && !hasTriggered && !isOpen) {
      setIsOpen(true);
      setHasTriggered(true);

      // Save to session storage to avoid re-triggering
      const triggeredPosts = JSON.parse(
        sessionStorage.getItem("subscribed_posts") || "[]"
      );
      if (!triggeredPosts.includes(slug)) {
        triggeredPosts.push(slug);
        sessionStorage.setItem(
          "subscribed_posts",
          JSON.stringify(triggeredPosts)
        );
      }
    }
  });

  return <SubscribeModal isOpen={isOpen} onOpenChange={setIsOpen} />;
}
