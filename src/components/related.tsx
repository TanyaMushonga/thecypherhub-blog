"use client";
import Article from "./article";
import { useArticle } from "@/store";

function Related() {
  const blogs = useArticle((state) => state.blog);

  return (
    <div className="w-full border-t-2  border-slate-500 p-5">
      <h1 className="text-white font-bold text-xl">Explore related posts</h1>
      <div className="w-full h-full mt-4">
        {blogs.slice(1, 4).map((blog) => (
          <Article key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Related;
