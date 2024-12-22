"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { BsDot } from "react-icons/bs";

function Article() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col md:w-1/4 w-full relative cursor-pointer"
      onClick={() => {
        router.push("/read/1");
      }}
    >
      <Image
        src="/blog_covers/iac.jpg"
        width={340}
        height={200}
        alt="blog cover"
        objectFit="cover"
        className="rounded-md"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold line-clamp-1 mt-1">
          Infrastructure as code
        </h1>
        <p className="text-slate-300 line-clamp-1">
          #1: learn more - infrastructure as code concepts
        </p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-slate-300">4 min read</p>
          <BsDot className="text-slate-300" />
          <p className="text-slate-300">{formatDate(new Date(2024, 11, 8))}</p>
        </div>
      </div>
    </div>
  );
}

export default Article;
