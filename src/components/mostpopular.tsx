"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LuPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import MostPopularSkeleton from "./mostPopularSkeleton";

function Mostpopular() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="lg:flex flex-col hidden gap-4 mb-4"
      onClick={() => {
        router.push("read/2");
      }}
    >
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
          <div className="bg-card w-1/3 p-4 rounded-lg flex flex-row cursor-pointer gap-2">
            <div className="flex flex-col">
              <p className="text-white text-md font-bold line-clamp-2">
                How instagram was able to handle 20 million messages per day...
              </p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <LuPin className="text-slate-300 mr-2" />{" "}
                  <p className="text-white">
                    {formatDate(new Date(2024, 11, 2))}
                  </p>
                </div>
              </div>
            </div>
            <Image
              src={"/blog_covers/devops.webp"}
              width={120}
              height={50}
              alt="article cover"
              className="rounded-md"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Mostpopular;
