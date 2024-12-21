import React from "react";
import { Skeleton } from "./ui/skeleton";

function LatestSkeleton() {
  return (
    <div className="w-full flex md:flex-row flex-col items-center gap-4 mb-6">
      <Skeleton className="md:w-[450px] w-full h-[200px] md:h-[250px] rounded-xl" />
      <div className="flex flex-col gap-4 md:justify-center w-full">
        <Skeleton className="xl:w-[450px] w-full h-[15px] rounded-xl" />
        <Skeleton className="xl:w-[370px] w-2/3 h-[13px] rounded-xl" />
        <Skeleton className="xl:w-[400px] w-3/4 h-[10px] rounded-xl" />
      </div>
    </div>
  );
}

export default LatestSkeleton;
