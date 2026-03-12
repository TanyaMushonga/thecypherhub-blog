import React from "react";
import dynamic from "next/dynamic";

import type { Metadata } from "next";

const NavBar = dynamic(() => import("@/components/common/NavBar"));
const Footer = dynamic(() => import("@/components/common/footer"));

// For nested layouts, you can still export metadata
export const metadata: Metadata = {
  // This metadata will be merged with parent layout metadata
  title: {
    template: "%s | Tanya's Blog",
    default: "Tanya's Blog",
  },
  description:
    "A coding blog for developers interested in technology trends and programming insights.",
  keywords: [
    "programming",
    "coding",
    "web development",
    "tech blog",
    "software engineering",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.tanyaradzwatmushonga.me",
    siteName: "Tanya's Blog",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      <main className="flex-1 ">
        <div className="">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
