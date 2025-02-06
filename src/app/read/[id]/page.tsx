import React, { Suspense } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/common/Subscribe";
import Related from "@/components/common/related";
import ReadSkeleton from "@/components/common/readSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const Read = React.lazy(() => import("@/components/common/read"));

async function getArticle(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
  const article: Article = await res.json();
  if (!article) notFound();
  return article;
}

async function getRelated(id: string) {
  const currentBlog: Article = await getArticle(id);
  const currentBlogCategory = currentBlog?.category;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const article = await res.json();
  const related: Article[] = article.filter(
    (related: Article) => related.category === currentBlogCategory
  );
  if (!related) notFound();
  return related.slice(0, 3);
}

// export async function generateStaticParams() {
//   const pageSize = 10; // Adjust the page size as needed
//   let page = 1;
//   let allBlogs: Article[] = [];
//   let blogs: Article[] = [];

//   do {
//     blogs = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&pageSize=${pageSize}`
//     ).then((res) => res.json());

//     if (blogs && blogs.length > 0) {
//       allBlogs = allBlogs.concat(blogs);
//       page++;
//     }
//   } while (blogs && blogs.length === pageSize);

//   if (!allBlogs) {
//     return [];
//   }

//   return allBlogs.map((post: Article) => ({
//     id: String(post.id),
//   }));
// }
interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
    ).then((res) => res.json());

    if (!article) {
      return {
        title: "Error",
        description: "An error occurred while fetching metadata.",
      };
    }

    return {
      title: article?.title,
      description: article?.description,
      openGraph: {
        images: [
          {
            url: article?.coverImgUrl,
            width: 800,
            height: 600,
            alt: article?.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching metadata.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = await getArticle(id);
  const related = await getRelated(id);

  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <Suspense fallback={<ReadSkeleton />}>
          <Read article={blog} />
        </Suspense>
        <Suspense fallback={<p className="text-slate-200">Loading...</p>}>
          <Related related={related} />
        </Suspense>
        <SUbscribe />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
