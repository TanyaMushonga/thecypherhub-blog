import React from "react";
import Link from "next/link";
import SeriesCard from "./SeriesCard";
import { ArrowRight, BookOpen } from "lucide-react";

interface SeriesHighlightProps {
  collections: Collection[];
}

export default function SeriesHighlight({ collections }: SeriesHighlightProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Learning Paths</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Curated Series
          </h2>
          <p className="text-muted-foreground">
            Master complex topics through our structured learning journeys.
          </p>
        </div>

        <Link
          href="/series"
          className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors"
        >
          Explore All Series
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.slice(0, 3).map((collection) => (
          <SeriesCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}
