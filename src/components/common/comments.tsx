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
import { getComments } from "@/actions/comments";

async function Comments({ articleId }: { articleId: string }) {
  const comments = await getComments(articleId);
  return (
    <div className="flex flex-col gap-4 my-5 border-t-2 border-slate-500 p-5">
      <h1 className="text-white font-bold text-xl">Comments</h1>
      <div>
        {comments?.length ? (
          comments
            .slice(-5)
            .map(
              (comment: { id: string; comment: string; createdAt: string }) => (
                <CommentCard key={comment.id} comment={comment} />
              )
            )
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
              <SheetTitle className="text-white">
                Anonymousy comments
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1">
              <ScrollArea className="w-full h-[85vh]">
                {comments?.length ? (
                  comments.map(
                    (comment: {
                      id: string;
                      comment: string;
                      createdAt: string;
                    }) => <CommentCard key={comment.id} comment={comment} />
                  )
                ) : (
                  <p className="text-slate-300 mt-4">No comments found.</p>
                )}
              </ScrollArea>
              <WriteAcomment />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Comments;
