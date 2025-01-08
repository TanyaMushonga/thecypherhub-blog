"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdTimer } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LatestSkeleton from "./latestSkeleton";
import MyProfile from "./myProfile";

function Latestblog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <LatestSkeleton />
      ) : (
        <div
          className="flex md:flex-row flex-col gap-5 items-center pb-5 cursor-pointer"
          onClick={() => {
            router.push("/read/1");
          }}
        >
          <Image
            src="/blog_covers/codebuild.jpg"
            width={600}
            height={200}
            alt="latest bog"
            className="rounded-md"
            priority
          />
          <div className="flex flex-col md:text-center gap-2">
            <h1 className="text-white md:text-3xl font-bold text-xl">
              How whatsapp was able to scale to 50 bilion messages a day
            </h1>
            <p className="text-slate-300 md:text-xl text-lg">
              #1: learn more - whatsapp engineering concepts{" "}
            </p>
            <div className="flex flex-row items-center gap-2 md:justify-center">
              {" "}
              <MdTimer className="text-slate-300" />{" "}
              <p className="text-slate-300">4 min read</p>
            </div>
            <div className="flex flex-row items-center md:justify-center">
              <LuPin className="text-slate-300 mr-2" />{" "}
              <p className="text-slate-300">
                {formatDate(new Date(2024, 11, 2))}
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
