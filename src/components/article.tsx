"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { BsDot } from "react-icons/bs";
import { useArticle } from "@/store";

interface Article {
  id: string;
  coverImgUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  content: string;
}

function Article({ blog }: { blog: Article }) {
  const router = useRouter();
  const setBlog = useArticle((state) => state.setBlog);
  return (
    <div
      className="flex flex-col w-full relative cursor-pointer"
      onClick={() => {
        setBlog(blog);
        router.push(`/read/${blog.id}`);
      }}
    >
      <div className="w-auto h-auto">
        <Image
          src={blog?.coverImgUrl || "/blog_covers/codebuild.jpg"}
          width={340}
          height={200}
          alt="blog cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold line-clamp-1 mt-1">
          {blog?.title}
        </h1>
        <p className="text-slate-300 line-clamp-1">{blog?.description}</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-slate-300">4 min read</p>
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
