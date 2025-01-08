"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import empty from "@/lottie/empty.json";
import { SkeletonCard } from "./blogSkeleton";
import Article from "./article";
import { useArticle } from "@/store";

interface blog {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  content: string;
}

function ArticleLists({ value }: { value: string }) {
  const [articles, setArticles] = useState<blog[]>([]);
  const [loading, setLoading] = useState(false);
  const setBlogs = useArticle((state) => state.setBlog);

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
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="w-full h-full p-4">
      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {articles.map((article) => (
                <Article key={article.id} blog={article} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
              <Lottie animationData={empty} loop={true} />
              <h2 className="text-white font-bold text-xl md:text-2xl">
                Something went wrong
              </h2>
              <p className="text-slate-300 text-lg ">
                Seams like there is nothing here yet, try to refresh
              </p>
              <button
                onClick={fetchArticles}
                className="px-6 py-2 bg-transparent border border-blue-500 dark:border-white dark:text-white text-blue-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Refresh
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArticleLists;
