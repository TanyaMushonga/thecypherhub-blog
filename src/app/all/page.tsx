import PaginatedBlogs from "@/components/common/paginatedBlogs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs - The Cypher Hub",
  description: "Browse all blogs from The Cypher Hub newsletter.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}all`,
  },
};

export default function Page() {
  return <PaginatedBlogs />;
}