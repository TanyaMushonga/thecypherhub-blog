"use client";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { BsDot } from "react-icons/bs";

function Article({ blog }: { blog: Article }) {
  const router = useRouter();

  const handleClick = () => {
    // Ensure window.scrollTo only runs in the browser environment
    // if (typeof window !== "undefined") {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
    router.push(`/read/${blog.id}`);
  };

  return (
    <div
      className="flex flex-col w-full relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-auto h-auto">
        <Image
          src={blog?.coverImgUrl || "/blog_covers/codebuild.jpg"}
          width={340}
          height={200}
          alt="blog cover"
          className="rounded-md"
          priority
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold line-clamp-1 mt-1">
          {blog?.title}
        </h1>
        <p className="text-slate-300 line-clamp-1">{blog?.description}</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-slate-300">{blog?.readTime}</p>
          <BsDot className="text-slate-300" />
          <p className="text-slate-300">
            {formatDate(new Date(blog?.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Article;
