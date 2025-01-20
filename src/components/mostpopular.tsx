"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { LuPin } from "react-icons/lu";
import { formatDate, getRandomArticles } from "@/lib/utils";
import MostPopularSkeleton from "./mostPopularSkeleton";
import { useFetchArticles } from "@/hooks/useFetchBlogs";

function Mostpopular() {
  const router = useRouter();
  const { loading, articles } = useFetchArticles("all");
  return (
    <div className="lg:flex flex-col hidden gap-4 mb-4">
      <div className="flex flex-row justify-between items-center">
        <p className="text-white text-xl font-bold">Most Popular</p>
        <Link className="text-white" href={"/all"}>
          VIEW ALL
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        {loading ? (
          <MostPopularSkeleton />
        ) : (
          <>
            {getRandomArticles(articles, 3).map((article) => (
              <div
                className="bg-card w-1/3 p-4 rounded-lg flex flex-row justify-between cursor-pointer gap-2"
                key={article?.id}
                onClick={() => {
                  router.push(`/read/${article?.id}`);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-white text-md font-bold line-clamp-2">
                    {article?.title}
                  </p>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <LuPin className="text-slate-300 mr-2" />{" "}
                      <p className="text-white">
                        {formatDate(new Date(article?.createdAt))}
                      </p>
                    </div>
                  </div>
                </div>
                <Image
                  src={article?.coverImgUrl || "/blog_covers/devops.webp"}
                  width={120}
                  height={50}
                  alt="article cover"
                  className="rounded-md"
                  priority
                 
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Mostpopular;
