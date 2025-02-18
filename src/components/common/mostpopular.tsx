import Image from "next/image";
import React from "react";
import { LuPin } from "react-icons/lu";
import { formatDate, getRandomArticles } from "@/lib/utils";
import MostPopularHeader from "./mostPopularHeader";
import RouteLayout from "./routeLayout";

function Mostpopular({ mostPopular }: { mostPopular: Article[] }) {
  return (
    <div className="lg:flex flex-col gap-4 mb-4">
      <MostPopularHeader />
      <div className="flex md:flex-row flex-col gap-4">
        {getRandomArticles(mostPopular, 3).map((article) => (
          <RouteLayout
            className="bg-card w-full md:w-1/3 p-4 rounded-lg flex flex-row justify-between cursor-pointer gap-2"
            key={article?.id}
            link={`/read/${article?.id}`}
          >
            <div className="flex flex-col">
              <p className="text-white text-md font-bold line-clamp-2">
                {article?.title}
              </p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <LuPin className="text-slate-300 mr-2" />
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
              placeholder="blur"
              blurDataURL="/placeholderblur.png"
              style={{ aspectRatio: "3 / 1" }}
            />
          </RouteLayout>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Mostpopular);
