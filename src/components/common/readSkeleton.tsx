import React from "react";
import { Skeleton } from "../ui/skeleton";

function ReadSkeleton() {
  return (
    <div className="w-full h-full p-4">
      {/* Cover Image Skeleton */}
      <Skeleton className="w-full h-[300px] rounded-lg mb-6" />

      {/* Title Skeleton */}
      <Skeleton className="w-3/4 h-[30px] rounded-lg mb-4" />

      {/* Subheading Skeleton */}
      <Skeleton className="w-1/2 h-[20px] rounded-lg mb-6" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-10">
        <div className="space-y-4 w-full h-full">
          <Skeleton className="w-full h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-5/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-4/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-2/3 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-1/2 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-5/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[13px] rounded-lg mb-4" />
        </div>
        <div className="space-y-4 w-full h-full">
          <Skeleton className="w-full h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-5/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-4/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-1/2 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-[13px] rounded-lg mb-4" />
        </div>
        <div className="space-y-4 w-full h-full">
          <Skeleton className="w-full h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-5/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-5/6 h-[13px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[13px] rounded-lg mb-4" />
        </div>
      </div>
    </div>
  );
}

export default ReadSkeleton;
