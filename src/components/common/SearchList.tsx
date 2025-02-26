import Image from "next/image";
import React from "react";
import { DialogClose } from "../ui/dialog";
import RouteLayout from "./routeLayout";

function SearchList({ article }: { article: Article }) {
  return (
    <DialogClose>
      <RouteLayout
        className="flex flex-row gap-2 items-center cursor-pointer hover:bg-secondary p-2 rounded-md"
        link={`/blog/${article.slug}`}
      >
        <Image
          src={article.coverImgUrl}
          alt="search"
          width={40}
          height={40}
          className="rounded-md"
          loading="eager"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <p className="text-white text-lg line-clamp-1">{article.title}</p>
      </RouteLayout>
    </DialogClose>
  );
}

export default SearchList;
