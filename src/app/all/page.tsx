import PaginatedBlogs from "@/components/common/paginatedBlogs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs - The Cypher Hub",
  description: "Browse all blogs from The Cypher Hub newsletter.",
  openGraph: {
    title: "All Blogs - The Cypher Hub",
    description: "Browse all blogs from The Cypher Hub newsletter.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/all`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/all`,
  },
};

export default function Page() {
  return <PaginatedBlogs />;
}