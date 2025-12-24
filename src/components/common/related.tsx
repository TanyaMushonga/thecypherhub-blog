import dynamic from "next/dynamic";
import React from "react";
const Article = dynamic(() => import("./article"));

function Related({ related }: { related: Article[] }) {
  return (
    <div className="w-full border-t border-slate-500/50 pt-5 mt-2">
      <h1 className="text-white font-bold text-xl">Explore related posts</h1>
      {related.length > 0 ? (
        <div className="w-full h-full mt-4 flex md:flex-row flex-col gap-5 overflow-auto">
          {related.map((blog) => (
            <Article
              showImage={false}
              key={blog.slug}
              blog={blog}
              className="w-full md:w-1/3 p-1 h-fit"
            />
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
