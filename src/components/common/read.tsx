import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { MdTimer } from "react-icons/md";
import React from "react";
import SUbscribe from "./Subscribe";
import Comments from "./comments";

function Read({ article }: { article: Article }) {
  return (
    <div className="max-w-4xl mx-auto antialiased pt-8 pb-20 md:px-0 relative">
      {/* Header Section */}
      <header className="mb-10 text-left border-b border-border/50 pb-10">
        <div className="flex items-center gap-2 mb-6 justify-start">
          <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
            {article.category || "Article"}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {article?.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 text-slate-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full">
                <Image
                  src="https://vhwltxiaz42mcyxk.public.blob.vercel-storage.com/profile.jpg"
                  width={28}
                  height={28}
                  alt="Author"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase">
                  Written by
                </span>
                <Link
                  href="https://tanyaradzwatmushonga.me"
                  className="text-white hover:text-primary transition-colors font-medium text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tanyaradzwa
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MdTimer className="w-4 h-4" />
              <span>{article?.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuCalendarDays className="w-4 h-4" />
              <span>{formatDate(new Date(article?.createdAt))}</span>
            </div>
          </div>
        </div>
      </header>
      {/* Cover Image */}
      {article?.coverImgUrl && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl border border-border/30">
          <Image
            src={article?.coverImgUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw"
            priority
            quality={100}
          />
        </div>
      )}

      {/* Main Content - Utilizing the Updated Global CSS .prose */}
      <article className="prose prose-slate prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: article?.content || "" }} />
      </article>

      <SUbscribe />
      <Comments article={article} />
    </div>
  );
}

export default React.memo(Read);
