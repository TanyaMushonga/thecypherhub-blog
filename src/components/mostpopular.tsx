"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function Mostpopular() {
  const router = useRouter();
  return (
    <div
      className="md:flex flex-col hidden gap-4"
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
        <div className="bg-card w-1/3 p-4 rounded-lg flex flex-row cursor-pointer">
          <div className="flex flex-col">
            <p className="text-white text-md font-bold line-clamp-2">
              How instagram was able to handle 20 million messages per day...
            </p>
            <p className="text-slate-300 text-sm line-clamp-1">
              #1: learn more - whatsapp engineering concepts{" "}
            </p>
          </div>
          <Image
            src={"/blog_covers/devops.webp"}
            width={120}
            height={50}
            alt="article cover"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="bg-card w-1/3 p-4 rounded-lg flex flex-row">
          <div className="flex flex-col">
            <p className="text-white text-md font-bold line-clamp-2">
              How instagram was able to handle 20 million messages per day...
            </p>
            <p className="text-slate-300 text-sm line-clamp-1">
              #1: learn more - whatsapp engineering concepts{" "}
            </p>
          </div>
          <Image
            src={"/blog_covers/devops.webp"}
            width={120}
            height={50}
            alt="article cover"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="bg-card w-1/3 p-4 rounded-lg flex flex-row">
          <div className="flex flex-col">
            <p className="text-white text-md font-bold line-clamp-2">
              How instagram was able to handle 20 million messages per day...
            </p>
            <p className="text-slate-300 text-sm line-clamp-1">
              #1: learn more - whatsapp engineering concepts{" "}
            </p>
          </div>
          <Image
            src={"/blog_covers/devops.webp"}
            width={120}
            height={50}
            alt="article cover"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Mostpopular;
