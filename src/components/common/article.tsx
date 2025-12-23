"use client";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { LuCalendar, LuClock } from "react-icons/lu";

function Article({ blog, className }: { blog: Article; className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    router.push(`/blog/${blog.slug}`);
  };

  return (
    <div
      className={`group flex flex-col gap-4 p-4 rounded-xl bg-card/50 border border-transparent hover:border-primary/50 hover:bg-card transition-all duration-300 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg">
        <Image
          src={blog?.coverImgUrl}
          fill
          alt={blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholderblur.png"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <LuCalendar className="w-3 h-3" />
            {formatDate(new Date(blog?.createdAt))}
          </span>
          <span className="flex items-center gap-1">
            <LuClock className="w-3 h-3" />
            {blog?.readTime}
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {blog?.title}
        </h2>

        <p className="text-sm text-slate-400 line-clamp-2">
          {blog?.description}
        </p>
      </div>
    </div>
  );
}

export default Article;
