import Image from "next/image";
import React from "react";
import { DialogClose } from "../ui/dialog";
import RouteLayout from "./routeLayout";

function SearchList({ article }: { article: Article }) {
  return (
    <DialogClose>
      <RouteLayout
        className="flex flex-row gap-2 items-center cursor-pointer hover:bg-secondary p-2 rounded-md"
        link={`/read/${article.id}`}
      >
        <Image src={article.coverImgUrl} alt="search" width={40} height={40} />
        <p className="text-white text-lg line-clamp-1">{article.title}</p>
      </RouteLayout>
    </DialogClose>
  );
}

export default SearchList;
