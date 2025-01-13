"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { DialogClose } from "./ui/dialog";

function SearchList({ article }: { article: Article }) {
  const router = useRouter();
  const read = () => {
    router.push(`/read/${article.id}`);
  };
  return (
    <DialogClose>
      <div
        className="flex flex-row gap-2 items-center cursor-pointer hover:bg-secondary p-2 rounded-md"
        onClick={read}
      >
        <Image src={article.coverImgUrl} alt="search" width={40} height={40} />
        <p className="text-white text-lg line-clamp-1">{article.title}</p>
      </div>
    </DialogClose>
  );
}

export default SearchList;
