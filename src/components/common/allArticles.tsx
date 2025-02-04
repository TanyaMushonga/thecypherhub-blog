"use client";
import React from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";
import { useFetchArticles } from "@/hooks/useFetchBlogs";

function AllArticles() {
  const { articles } = useFetchArticles("all");
  return <ParallaxScroll articles={articles} />;
}

export default AllArticles;
