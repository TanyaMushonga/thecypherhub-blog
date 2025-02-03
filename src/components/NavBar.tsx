"use client";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchList from "./SearchList";
import { useFetchArticles } from "@/hooks/useFetchBlogs";

function Navbar() {
  const { articles } = useFetchArticles("all");
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link prefetch={false} className="text-white" href="/">
            The Cypher Hub
          </Link>
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="rounded-md px-4 py-2 text-white focus:outline-none bg-card"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <div className="hidden">
                <DialogTitle>Search</DialogTitle>
              </div>
              <div className="flex items-center">
                <IoSearchOutline className="text-white w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-md px-4 py-2 text-white focus:outline-none bg-card"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <SearchList key={article.id} article={article} />
                ))
              ) : (
                <p className="text-white">No results found</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <Dialog>
            <DialogTrigger>
              <IoSearchOutline className="text-white w-7 h-7" />
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <div className="hidden">
                  <DialogTitle>Search</DialogTitle>
                </div>
                <div className="flex items-center">
                  <IoSearchOutline className="text-white w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="rounded-md px-4 py-2 text-white focus:outline-none bg-card"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <SearchList key={article.id} article={article} />
                  ))
                ) : (
                  <p className="text-white">No results found</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
