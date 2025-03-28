import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { LuPin } from "react-icons/lu";
import { MdTimer } from "react-icons/md";
import dynamic from "next/dynamic";
import React from "react";
import SUbscribe from "./Subscribe";
import Disclaimer from "./disclaimer";
import Comments from "./comments";

const CopyLink = dynamic(() => import("@/components/common/copyLink"));

function Read({ article }: { article: Article }) {
  return (
    <div className="max-w-2xl mx-auto antialiased pt-4 relative">
      <div className="mb-10">
        <h1 className="text-white md:text-3xl font-bold text-xl my-4">
          <span className="text-blue-400 pe-2">#</span>
          {article?.title}
        </h1>
        <div className="flex md:flex-row flex-col md:items-center gap-2 mb-5 justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center ">
              <MdTimer className="text-slate-300 mr-2 text-lg" />
              <p className="text-slate-300 text-lg">{article?.readTime}</p>
            </div>
            <div className="flex flex-row items-center">
              <LuPin className="text-slate-300 mr-2 text-lg" />
              <p className="text-slate-300 text-lg">
                {article?.createdAt && formatDate(new Date(article.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center md:justify-center">
            <Link
              prefetch={false}
              href={"https://tanyaradzwatmushonga.me"}
              className="text-slate-300 cursor-pointer hover:underline mr-5 text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Written by <span className="text-blue-400">TanyaMushonga</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-6">
          <p className="text-slate-300 md:text-xl text-lg line-clamp-6">
            {article?.description}
          </p>
        </div>
        <div className="text-sm dark:prose-invert text-white">
          {article?.coverImgUrl && (
            <Image
              src={article?.coverImgUrl}
              alt="blog thumbnail"
              height={1000}
              width={1000}
              className="rounded-lg mb-5 object-cover w-full h-auto"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="/placeholderblur.png"
              priority
              loading="eager"
              quality={100}
            />
          )}
          <div className="flex flex-row flex-wrap justify-between items-center  py-3 gap-4">
            <p className="text-lg">Share this article on</p>
            <CopyLink />
          </div>
          <Disclaimer />
          <SUbscribe />

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: article?.content || "" }}
          />
          <div>
            <p className="text-slate-300 text-sm italic">
              Last updated on{" "}
              {article?.updatedAt && formatDate(new Date(article.updatedAt))}
            </p>
          </div>
          <Comments article={article} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Read);
