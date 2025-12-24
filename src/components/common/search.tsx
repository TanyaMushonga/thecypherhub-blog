"use client";
import { IoSearchOutline } from "react-icons/io5";
import React, { useState } from "react";
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

  const filteredArticles = articles?.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase())
  );

  // Common search input component to avoid duplication
  const SearchInput = () => (
    <div className="flex items-center w-full">
      <IoSearchOutline className="text-white w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-md px-4 py-2 text-white focus:outline-none bg-card"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        aria-label="Search articles"
      />
    </div>
  );

  // Common results component
  const SearchResults = () => (
    <div className="mt-4 space-y-2 overflow-y-auto flex-1">
      {filteredArticles.length ? (
        filteredArticles.map((article) => (
          <SearchList key={article.slug} article={article} />
        ))
      ) : (
        <p className="text-sm text-muted-foreground px-2 text-center py-4">
          No results found
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop version - shows input field */}
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild aria-label="Open search dialog">
            <div className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-md px-4 py-2 text-white focus:outline-none bg-card w-full min-w-[200px]"
                  readOnly
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <IoSearchOutline className="text-white w-4 h-4" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-card max-w-2xl w-full h-[60vh] flex flex-col p-0">
            <DialogHeader className="px-6 pt-6">
              <div className="sr-only">
                <DialogTitle>Search Articles</DialogTitle>
              </div>
              <SearchInput />
            </DialogHeader>
            <SearchResults />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile version - shows only icon */}
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger asChild aria-label="Open search dialog">
            <button className="p-2">
              <IoSearchOutline className="text-white w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card max-w-2xl w-[90vw] h-[60vh] flex flex-col p-0">
            <DialogHeader className="px-6 pt-6">
              <div className="sr-only">
                <DialogTitle>Search Articles</DialogTitle>
              </div>
              <SearchInput />
            </DialogHeader>
            <SearchResults />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Search;
