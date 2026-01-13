import { formatDate } from "@/lib/utils";
import React from "react";
import { User } from "lucide-react";

function CommentCard({
  comment,
}: {
  comment: { id: string; comment: string; createdAt: Date };
}) {
  return (
    <div className="flex flex-col mt-4 bg-muted/20 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-sm hover:border-white/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white border border-white/10 shadow-inner">
          <User className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-100">
            Anonymous User
          </span>
          <span className="text-xs text-slate-400">
            {formatDate(comment?.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-slate-200 leading-relaxed text-[15px] pl-1">
        {comment.comment}
      </p>
    </div>
  );
}

export default CommentCard;
