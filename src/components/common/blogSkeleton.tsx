import { Skeleton } from "@/components/ui/skeleton";

export function BlogSkeleton() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:gap-4">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
      <div className="flex-col space-y-3 hidden md:flex">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
      <div className="flex-col space-y-3 hidden lg:flex">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
      <div className="flex-col space-y-3 hidden xl:flex">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
      <div className="flex-col space-y-3 hidden xl:flex">
        <Skeleton className="h-[125px] md:w-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[250px]" />
          <Skeleton className="h-4 md:w-[200px] w-[260px]" />
        </div>
      </div>
    </div>
  );
}
