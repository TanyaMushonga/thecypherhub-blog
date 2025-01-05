"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SkeletonCard } from "./blogSkeleton";
import Article from "./article";

interface blog {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

function ArticleLists({ value }: { value: string }) {
  const [articles, setArticles] = useState<blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/blog",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.filter((article: blog) => {
          if (value === "all") {
            return article;
          }
          return article.category === value;
        });
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="w-full h-full p-4">
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {articles.map((article) => (
            <Article key={article.id} blog={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleLists;
