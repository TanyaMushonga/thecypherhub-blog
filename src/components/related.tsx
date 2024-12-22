"use client";
import React, { useState } from "react";
import { SkeletonCard } from "./blogSkeleton";
import Article from "./article";

function Related() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full border-t-2  border-slate-500 p-5">
      <h1 className="text-white font-bold text-xl">Explore related posts</h1>
      <div className="w-full h-full mt-4">
        {loading ? (
          <SkeletonCard />
        ) : (
          <div>
            <Article />
          </div>
        )}
      </div>
    </div>
  );
}

export default Related;
