import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import React from "react";

export default async function page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    cache: 'force-cache'
  });
  const data = await response.json();

  return <ParallaxScroll articles={data} />;
}
