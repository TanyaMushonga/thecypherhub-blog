import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import RoadmapList from "@/components/series/RoadmapList";
import { BookOpen, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

async function getCollection(slug: string): Promise<Collection | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${slug}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch collection");
  }

  const data = await res.json();

  // Handle various API response formats
  let collection: Collection | null = null;
  if (data.collection) collection = data.collection;
  else if (data.series) collection = data.series;
  else collection = data;

  if (collection) {
    collection.title = collection.title || "Untitled Series";
    collection.articles = collection.articles || [];
    collection.createdAt = collection.createdAt || new Date().toISOString();
  }

  return collection;
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const collection = await getCollection(slug);

  if (!collection) {
    return {
      title: "Series Not Found - The Cypher Hub",
    };
  }

  return {
    title: `${collection.title} - The Cypher Hub`,
    description: collection.description || "Learning series on The Cypher Hub",
    openGraph: {
      title: collection.title,
      description: collection.description || "",
      images: collection.coverImgUrl ? [{ url: collection.coverImgUrl }] : [],
      type: "website",
    },
  };
}

export default async function SeriesRoadmapPage({ params }: SeriesPageProps) {
  const slug = (await params).slug;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Sidebar / Info Section */}
        <aside className="lg:w-1/3 lg:sticky lg:top-24 h-fit">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl mb-8">
            {collection.coverImgUrl ? (
              <Image
                src={collection.coverImgUrl}
                alt={collection.title || "Series Cover Image"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/20">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {collection.title}
            </h1>
            <p className="text-slate-400 leading-relaxed md:text-lg">
              {collection.description}
            </p>

            <div className="flex flex-col gap-4 border-t border-border/50 pt-8 mt-8">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Calendar className="h-4 w-4 text-primary" />
                <span suppressHydrationWarning>
                  Published {formatDate(new Date(collection.createdAt))}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>{collection.articles?.length || 0} Modules</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Roadmap Content */}
        <main className="lg:w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Roadmap</h2>
            <p className="text-slate-400">
              Follow these steps carefully to master this series.
            </p>
          </div>

          <RoadmapList articles={collection.articles || []} />
        </main>
      </div>
    </div>
  );
}
