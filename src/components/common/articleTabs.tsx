import React from "react";
import ArticleLists from "./articleLists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ArticleTabs({allArticle}: {allArticle: Article[]}) {
  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            <p className="text-white">All</p>
          </TabsTrigger>
          <TabsTrigger value="system_design" className="text-white">
            <p className="text-white"> System Design</p>
          </TabsTrigger>
          <TabsTrigger value="devops">
            <p className="text-white">DevOps</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="system_design">
          <ArticleLists value="system-design" allArticle={allArticle} />
        </TabsContent>
        <TabsContent value="devops">
          <ArticleLists value="devops"  allArticle={allArticle} />
        </TabsContent>
        <TabsContent value="all">
          <ArticleLists value="all"  allArticle={allArticle} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ArticleTabs;
