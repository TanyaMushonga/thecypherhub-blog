"use client";
import React, { useState } from "react";
import { SkeletonCard } from "./blogSkeleton";

function ArticleLists() {
 // const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-full p-4">
      {loading ? <SkeletonCard /> : <div>Articles</div>}
    </div>
  );
}

export default ArticleLists;
