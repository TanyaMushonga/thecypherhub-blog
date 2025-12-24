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
    <div className="flex flex-col gap-4 mt-5 border-t border-slate-500/50 py-5">
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
            <p>Write a comment</p>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-white">Comments</SheetTitle>
            </SheetHeader>
            <div className="w-full h-full flex flex-col mb-10">
              <ScrollArea className="w-full h-[80vh]">
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
