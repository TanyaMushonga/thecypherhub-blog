import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentCard from "./commentCard";
import { MessageSquareText } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import WriteAcomment from "./writeComment";

function Comments({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-4 mt-5 border-t-2 border-slate-500 py-5">
      <h1 className="text-white font-bold text-xl">Comments</h1>
      <div>
        {article?.comments?.length > 0 ? (
          article?.comments.slice(-5).map((comment: comments) => (
            <CommentCard
              key={comment.id}
              comment={{
                ...comment,
                createdAt: new Date(comment.createdAt),
              }}
            />
          ))
        ) : (
          <p className="text-slate-300 mt-4">No comments found.</p>
        )}
      </div>
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2">
            <MessageSquareText />
            <p>Write a comment anonymously</p>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-white">Anonymous comments</SheetTitle>
            </SheetHeader>
            <div className="flex-1">
              <ScrollArea className="w-full h-[85vh]">
                {article?.comments?.length > 0 ? (
                  article?.comments.map((comment: comments) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p className="text-slate-300 mt-4">No comments found.</p>
                )}
              </ScrollArea>
              <WriteAcomment articleId={article?.id} slug={article?.slug} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Comments;
