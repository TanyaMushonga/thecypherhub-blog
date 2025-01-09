"use client";
import Image from "next/image";
import React from "react";
import { MdTimer } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/navigation";
import LatestSkeleton from "./latestSkeleton";
import MyProfile from "./myProfile";
import { useFetchArticles } from "@/hooks/useFetchBlogs";

function Latestblog() {
  const router = useRouter();
  const { articles, loading } = useFetchArticles("all");

  return (
    <>
      {loading ? (
        <LatestSkeleton />
      ) : (
        <div
          className="flex md:flex-row flex-col gap-5 items-center pb-5 cursor-pointer"
          onClick={() => {
            router.push(`/read/${articles[0]?.id}`);
          }}
        >
          <Image
            src={articles[0]?.coverImgUrl || "/blog_covers/codebuild.jpg"}
            width={600}
            height={200}
            alt="latest bog"
            className="rounded-md"
            priority
          />
          <div className="flex flex-col md:text-center gap-2 w-full">
            <h1 className="text-white md:text-3xl font-bold text-xl">
             {articles[0]?.title}
            </h1>
            <p className="text-slate-300 md:text-xl text-lg line-clamp-2">
            {articles[0]?.description}
            </p>
            <div className="flex flex-row items-center gap-2 md:justify-center">
              {" "}
              <MdTimer className="text-slate-300" />{" "}
              <p className="text-slate-300">4 min read</p>
            </div>
            <div className="flex flex-row items-center md:justify-center">
              <LuPin className="text-slate-300 mr-2" />{" "}
              <p className="text-slate-300">
                {formatDate(new Date(articles[0]?.createdAt))}
              </p>
              <div className="flex flex-row items-center md:justify-center">
                <BsDot className="text-slate-300" />
                <MyProfile />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Latestblog;
