import React from "react";
import CommentCard from "./commentCard";
import WriteAcomment from "./writeComment";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

function Comments({ article }: { article: Article }) {
  const commentsCount = article?.comments?.length || 0;
  const sortedComments = article?.comments
    ? [...article.comments].reverse()
    : [];
  const displayComments = sortedComments.slice(0, 15);
  const hasMoreComments = commentsCount > 15;

  return (
    <div className="flex flex-col gap-8 mt-12 border-t border-white/10 pt-12 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Comments
          <span className="ml-3 text-lg font-medium text-slate-500 bg-slate-800/50 px-3 py-0.5 rounded-full border border-white/5">
            {commentsCount}
          </span>
        </h2>
      </div>

      <div className="max-w-3xl">
        <WriteAcomment articleId={article?.id} slug={article?.slug} />

        <div className="mt-12 space-y-6">
          {displayComments.length > 0 ? (
            <>
              {displayComments.map((comment: comments) => (
                <CommentCard
                  key={comment.id}
                  comment={{
                    ...comment,
                    createdAt: new Date(comment.createdAt),
                  }}
                />
              ))}

              {hasMoreComments && (
                <div className="pt-8 flex justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all active:scale-95 group">
                        <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        <span>View all {commentsCount} comments</span>
                      </button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md border-white/10 bg-slate-950 p-0">
                      <SheetHeader className="p-6 border-b border-white/5">
                        <SheetTitle className="text-2xl font-bold text-white flex items-center gap-3">
                          Comments
                          <span className="text-sm font-medium text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                            {commentsCount}
                          </span>
                        </SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-80px)] p-6">
                        <div className="space-y-6 pb-20">
                          {sortedComments.map((comment: comments) => (
                            <CommentCard
                              key={comment.id}
                              comment={{
                                ...comment,
                                createdAt: new Date(comment.createdAt),
                              }}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-muted/5 rounded-3xl border border-dashed border-white/10">
              <p className="text-slate-400 text-lg font-medium text-center">
                No comments yet. <br />
                <span className="text-sm font-normal text-slate-500">
                  Be the first to share your thoughts!
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
