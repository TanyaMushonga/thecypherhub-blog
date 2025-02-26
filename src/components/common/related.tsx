import dynamic from "next/dynamic";
import React from "react";
const Article = dynamic(() => import("./article"));

function Related({ related }: { related: Article[] }) {
  return (
    <div className="w-full border-t-2 border-slate-500 p-5">
      <h1 className="text-white font-bold text-xl">Explore related posts</h1>
      {related.length > 0 ? (
        <div className="w-full h-full mt-4 flex md:flex-row flex-col gap-5 overflow-auto">
          {related.map((blog) => (
            <Article key={blog.slug} blog={blog} className="w-full md:w-1/3 p-2" />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-slate-300 mt-4">No related posts found.</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(Related);
