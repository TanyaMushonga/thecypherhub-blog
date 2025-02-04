import React from "react";
import { Skeleton } from "../ui/skeleton";


function MostPopularSkeleton() {
  return (
    <div className="flex flex-row gap-10 w-full">
      <div className="flex flex-row gap-2 w-1/3">
        <div className="w-full flex flex-col space-y-3">
          <Skeleton className="h-[13px] w-full rounded-xl" />
          <Skeleton className="h-[13px] w-2/3 rounded-xl" />
          <Skeleton className="h-[10px] w-[230px] rounded-xl" />
        </div>
        <Skeleton className="h-[60px] w-[250px] rounded-xl" />
      </div>
      <div className="flex-row gap-2 w-1/3 hidden lg:flex">
        <div className="w-full flex flex-col space-y-3">
          <Skeleton className="h-[13px] w-full rounded-xl" />
          <Skeleton className="h-[13px] w-[240px] rounded-xl" />
          <Skeleton className="h-[10px] w-3/4 rounded-xl" />
        </div>
        <Skeleton className="h-[60px] w-[250px] rounded-xl" />
      </div>
    </div>
  );
}

export default MostPopularSkeleton;
