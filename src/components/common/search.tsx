"use client";
import React, { useState } from "react";
import { Search as SearchIcon, Command, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
        <button className="hidden md:flex items-center gap-3 rounded-xl bg-white/5 hover:bg-white/10 px-4 py-2 text-slate-400 hover:text-white border border-white/5 transition-all duration-300 group min-w-[180px]">
          <SearchIcon className="w-4 h-4 transition-colors group-hover:text-primary" />
          <span className="text-sm font-medium">Search articles...</span>
          <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-500">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </DialogTrigger>

      {/* Mobile trigger */}
      <DialogTrigger asChild>
        <button className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-slate-950/95 backdrop-blur-2xl border-white/10 max-w-2xl w-full h-[60vh] flex flex-col p-0 overflow-hidden shadow-2xl rounded-3xl [&>button]:hidden">
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b border-white/5">
          <DialogTitle className="sr-only">Search articles</DialogTitle>

          <div className="flex items-center gap-3 sm:gap-4 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-all duration-300">
            <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-base sm:text-lg"
            />
            <DialogClose asChild>
              <button className="p-1 sm:p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-2 custom-scrollbar">
          {filteredArticles.length ? (
            <div className="grid gap-2 pb-6">
              {filteredArticles.map((article) => (
                <div key={article.slug} className="group">
                  <SearchList article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <SearchIcon className="w-8 h-8 text-slate-700" />
              </div>
              <p className="text-slate-400 font-medium">
                No articles match your search
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between text-[11px] text-slate-500 font-medium px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded-md text-slate-400">
                ↵
              </kbd>{" "}
              to select
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded-md text-slate-400">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
          </div>
          <span>{filteredArticles.length} results</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Search;
