"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { LuPin } from "react-icons/lu";
import { MdTimer } from "react-icons/md";
import CopyLink from "@/components/copyLink";
import { useArticle } from "@/store";
import { useParams } from "next/navigation";
import axios from "axios";

function Read() {
  const blog = useArticle((state) => state.blog);
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${ process.env.NEXT_PUBLIC_API_URL}/blog`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TracingBeam className="">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        <div className="mb-10">
          <div className="text-sm  prose prose-sm dark:prose-invert text-white">
            {blog?.coverImgUrl && (
              <Image
                src={blog?.coverImgUrl || "/blog_covers/codebuild.jpg"}
                alt="blog thumbnail"
                height="1000"
                width="1000"
                className="rounded-lg mb-5 object-cover"
              />
            )}
            <div className="flex flex-col gap-2">
              <h1 className="text-white md:text-3xl font-bold text-xl">
                {blog?.title}
              </h1>
              <p className="text-slate-300 md:text-xl text-lg">
                {blog?.description}
              </p>
              <div className="flex md:flex-row flex-col md:items-center gap-2 mb-5 justify-between">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-row items-center ">
                    <MdTimer className="text-slate-300 mr-2" />
                    <p className="text-slate-300">4 min read</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <LuPin className="text-slate-300 mr-2" />
                    <p className="text-slate-300">
                      {formatDate(new Date(blog?.createdAt))}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center md:justify-center">
                  <Link
                    href={"https://tanya-mushonga.vercel.app/"}
                    className="text-slate-300 cursor-pointer hover:underline mr-5"
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
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
          </div>
        </div>
      </div>
    </TracingBeam>
  );
}

export default Read;
