import Link from "next/link";
import React from "react";

function MostPopularHeader() {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <p className="text-white text-xl font-bold">Most Popular</p>
      <Link prefetch={false} className="text-white" href={"/all"}>
        VIEW ALL
      </Link>
    </div>
  );
}

export default MostPopularHeader;
