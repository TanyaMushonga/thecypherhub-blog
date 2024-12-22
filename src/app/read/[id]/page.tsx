import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import React from "react";
import { dummyContent } from "@/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import { LuPin } from "react-icons/lu";
import { MdTimer } from "react-icons/md";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

function page() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <div className="text-sm  prose prose-sm dark:prose-invert text-white">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt="blog thumbnail"
                      height="1000"
                      width="1000"
                      className="rounded-lg mb-5 object-cover"
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <h1 className="text-white md:text-3xl font-bold text-xl">
                      {item.title}
                    </h1>
                    <p className="text-slate-300 md:text-xl text-lg">
                      {item.subtitle}
                    </p>
                    <div className="flex md:flex-row flex-col md:items-center gap-2 mb-5 justify-between">
                      <div className="flex flex-row items-center gap-4">
                        <div className="flex flex-row items-center">
                          <MdTimer className="text-slate-300 mr-2" />{" "}
                          <p className="text-slate-300">4 min read</p>
                        </div>
                        <div className="flex flex-row items-center">
                          <LuPin className="text-slate-300 mr-2" />{" "}
                          <p className="text-slate-300">
                            {formatDate(new Date(2024, 11, 2))}
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

                        <button className="ms-auto relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-card px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <IoIosLink className="text-white" />
                              <p className="text-white">Copy link</p>
                            </div>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {item?.introduction}
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default page;
