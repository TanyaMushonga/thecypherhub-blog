"use client";
import Image from "next/image";
import React from "react";
import { MdTimer } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

function Latestblog({ latestBlog }: { latestBlog: Article }) {
  const router = useRouter();

  return (
    <div
      className="flex md:flex-row flex-col gap-5 items-center pb-5 cursor-pointer"
      onClick={() => {
        router.push(`/read/${latestBlog?.id}`);
      }}
    >
      <Image
        src={latestBlog?.coverImgUrl || ""}
        width={600}
        height={200}
        alt="latest bog"
        className="rounded-md"
        priority
        loading="eager"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="flex flex-col md:text-center gap-2 w-full">
        <h1 className="text-white md:text-3xl font-bold text-xl">
          {latestBlog?.title}
        </h1>
        <p className="text-slate-300 md:text-xl text-lg line-clamp-2">
          {latestBlog?.description}
        </p>
        <div className="flex flex-row items-center gap-2 md:justify-center">
          {" "}
          <MdTimer className="text-slate-300" />{" "}
          <p className="text-slate-300">{latestBlog?.readTime}</p>
        </div>
        <div className="flex flex-row items-center md:justify-center">
          <LuPin className="text-slate-300 mr-2" />{" "}
          <p className="text-slate-300">
            {formatDate(new Date(latestBlog?.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Latestblog;
