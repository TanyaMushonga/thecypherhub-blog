"use client";
import Image from "next/image";
import React from "react";
import { MdTimer } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Latestblog() {
  const router = useRouter();
  return (
    <div
      className="flex md:flex-row flex-col gap-5 items-center pb-5"
      onClick={() => {
        router.push("/read/1");
      }}
    >
      <Image
        src="/blog_covers/codebuild.jpg"
        width={600}
        height={200}
        alt="latest bog"
        objectFit="cover"
        className="rounded-md"
      />
      <div className="flex flex-col md:text-center gap-2">
        <h1 className="text-white md:text-3xl font-bold text-xl">
          How whatsapp was able to scale to 50 bilion messages a day
        </h1>
        <p className="text-white md:text-xl text-lg">
          #1: learn more - whatsapp engineering concepts{" "}
        </p>
        <div className="flex flex-row items-center gap-2 md:justify-center">
          {" "}
          <MdTimer className="text-white" />{" "}
          <p className="text-white">4 min read</p>
        </div>
        <div className="flex flex-row items-center md:justify-center">
          <LuPin className="text-white mr-2" />{" "}
          <p className="text-white">{formatDate(new Date(2024, 11, 2))}</p>
          <div className="flex flex-row items-center md:justify-center">
            <BsDot className="text-white" />
            <Link
              href={"https://tanya-mushonga.vercel.app/"}
              className="text-white cursor-pointer hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TanyaMushonga
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Latestblog;
