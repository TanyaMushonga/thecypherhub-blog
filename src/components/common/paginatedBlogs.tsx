"use client";

import { useFetchArticles } from "@/hooks/useFetchArticles";
import React from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BlogSkeleton } from "./blogSkeleton";

function PaginatedBlogs() {
  const { setPage, articles, loading, totalCount, page } =
    useFetchArticles("all");

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {loading ? (
        <div className="h-full w-fit mt-20">
          <BlogSkeleton />{" "}
        </div>
      ) : (
        <ParallaxScroll articles={articles} />
      )}
      <div className="flex flex-col items-center mt-4">
        <div className="flex gap-2 mb-4">
          {page > 1 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                First
              </button>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <FaArrowLeft />
              </button>
            </>
          )}
          {page < totalPages && (
            <>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <FaArrowRight />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Last
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginatedBlogs;
