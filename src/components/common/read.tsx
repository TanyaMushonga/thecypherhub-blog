"use client";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { LuPin } from "react-icons/lu";
import { MdTimer } from "react-icons/md";
import CopyLink from "@/components/common/copyLink";

function Read({ article }: { article: Article }) {
  return (
    <TracingBeam>
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        <div className="mb-10">
          <div className="text-sm  dark:prose-invert text-white">
            {article?.coverImgUrl && (
              <Image
                src={article?.coverImgUrl || "/blog_covers/codebuild.jpg"}
                alt="blog thumbnail"
                height="1000"
                width="1000"
                className="rounded-lg mb-5 object-cover"
              />
            )}
            <div className="flex flex-col gap-2">
              <h1 className="text-white md:text-3xl font-bold text-xl">
                {article?.title}
              </h1>
              <p className="text-slate-300 md:text-xl text-lg line-clamp-2">
                {article?.description}
              </p>
              <div className="flex md:flex-row flex-col md:items-center gap-2 mb-5 justify-between">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-row items-center ">
                    <MdTimer className="text-slate-300 mr-2 text-lg" />
                    <p className="text-slate-300 text-lg">
                      {article?.readTime}
                    </p>
                  </div>
                  <div className="flex flex-row items-center">
                    <LuPin className="text-slate-300 mr-2 text-lg" />
                    <p className="text-slate-300 text-lg">
                      {article?.createdAt &&
                        formatDate(new Date(article.createdAt))}
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
                    @TanyaMushonga
                  </Link>

                  <CopyLink />
                </div>
              </div>
            </div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: article?.content || "" }}
            />
          </div>
        </div>
      </div>
    </TracingBeam>
  );
}

export default Read;
