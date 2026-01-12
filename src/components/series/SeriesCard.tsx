import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface SeriesCardProps {
  collection: Collection;
}

export default function SeriesCard({ collection }: SeriesCardProps) {
  return (
    <Link
      href={`/series/${collection.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-300 hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {collection.coverImgUrl ? (
          <Image
            src={collection.coverImgUrl}
            alt={collection.name || "Series Cover Image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <BookOpen className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md">
            {collection.articles?.length || 0} Modules
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-primary transition-colors">
          {collection.name}
        </h3>

        <p className="mb-6 line-clamp-2 text-sm text-slate-400">
          {collection.description}
        </p>

        <div className="mt-auto flex items-center text-sm font-semibold text-primary">
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
