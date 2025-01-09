import AllArticles from "@/components/allArticles";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore"
}


function page() {
  return (
    <div>
      <AllArticles />
    </div>
  );
}

export default page;
