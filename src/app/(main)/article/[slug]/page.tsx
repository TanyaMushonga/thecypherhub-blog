import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Read from "@/components/common/read";
import TableOfContents from "@/components/common/tableOfContents";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import Related from "@/components/common/related";
import ReadSkeleton from "@/components/common/readSkeleton";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch article");
  }

  return res.json();
}

async function getRelatedArticles(
  category: string,
  currentSlug: string
): Promise<Article[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?page=1&page_size=50`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const articles: Article[] = data.blogs || [];

  return articles
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, 3);
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found - The Cypher Hub",
    };
  }

  return {
    title: `${article.title} - The Cypher Hub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.createdAt,
      images: article.coverImgUrl ? [{ url: article.coverImgUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.coverImgUrl ? [article.coverImgUrl] : [],
    },
  };
}

export default async function ArticleReaderPage({ params }: ArticlePageProps) {
  const slug = (await params).slug;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(article.category, slug);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 md:px-5">
      <ScrollProgressBar />

      <div className="lg:w-2/3 w-full p-4 md:p-5 mt-5">
        <Suspense fallback={<ReadSkeleton />}>
          <Read article={article} />
          {related.length > 0 && <Related related={related} />}
        </Suspense>
      </div>

      <aside className="lg:w-1/3 lg:block mt-5 sticky top-24 h-fit hidden">
        <Suspense
          fallback={
            <div className="animate-pulse h-40 bg-muted/10 rounded-xl" />
          }
        >
          <TableOfContents content={article.content} />
        </Suspense>
      </aside>
    </div>
  );
}
