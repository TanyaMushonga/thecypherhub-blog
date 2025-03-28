import { formatDate } from "@/lib/utils";
import React from "react";

function CommentCard({
  comment,
}: {
  comment: { id: string; comment: string; createdAt: Date };
}) {
  return (
    <div className="flex flex-col gap-2 mt-2 bg-card border-l-4 border-blue-300 p-2 rounded-lg  ">
      <p className="text-white ">{comment.comment}</p>
      <div className="flex flex-row justify-between mt-3">
        <p className="text-muted-foreground italic">- Anonymous</p>
        <p className="text-slate-300">{formatDate(comment?.createdAt)}</p>
      </div>
    </div>
  );
}

export default CommentCard;
