"use client";

import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchList from "./SearchList";

function Search({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((article) =>
    [article.title, article.content, article.description]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Dialog>
      {/* Desktop trigger */}
      <DialogTrigger asChild>
        <button className="hidden md:flex items-center gap-2 rounded-md bg-card px-4 py-2 text-muted-foreground">
          <SearchIcon className="w-4 h-4" />
          <span>Search…</span>
        </button>
      </DialogTrigger>

      {/* Mobile trigger */}
      <DialogTrigger asChild>
        <button className="md:hidden p-2">
          <SearchIcon className="w-6 h-6 text-white" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-card max-w-2xl w-full h-[60vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sr-only">Search articles</DialogTitle>

          <div className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-transparent outline-none text-foreground"
            />
          </div>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-y-auto space-y-2">
          {filteredArticles.length ? (
            filteredArticles.map((article) => (
              <SearchList key={article.slug} article={article} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No results found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Search;
