"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { LuPin } from "react-icons/lu";
import { formatDate, getRandomArticles } from "@/lib/utils";

function Mostpopular({ mostPopular }: { mostPopular: Article[] }) {
  const router = useRouter();
  return (
    <div className="lg:flex flex-col gap-4 mb-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-white text-xl font-bold">Most Popular</p>
        <Link prefetch={false} className="text-white" href={"/all"}>
          VIEW ALL
        </Link>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        {getRandomArticles(mostPopular, 3).map((article) => (
          <div
            className="bg-card w-full md:w-1/3 p-4 rounded-lg flex flex-row justify-between cursor-pointer gap-2"
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
              src={article?.coverImgUrl || ""}
              width={120}
              height={50}
              alt="article cover"
              className="rounded-md"
              priority
              loading="eager"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mostpopular;
