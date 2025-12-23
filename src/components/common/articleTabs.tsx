import React, { Suspense, lazy } from "react";
const Tabs = lazy(() =>
  import("@/components/ui/tabs").then((module) => ({ default: module.Tabs }))
);
const TabsContent = lazy(() =>
  import("@/components/ui/tabs").then((module) => ({
    default: module.TabsContent,
  }))
);
const TabsList = lazy(() =>
  import("@/components/ui/tabs").then((module) => ({
    default: module.TabsList,
  }))
);
const TabsTrigger = lazy(() =>
  import("@/components/ui/tabs").then((module) => ({
    default: module.TabsTrigger,
  }))
);

const ArticleLists = lazy(() => import("./articleLists"));

function ArticleTabs() {
  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-start mb-8 overflow-x-auto pb-2 no-visible-scrollbar border-b border-border/40">
          <TabsList className="bg-transparent p-0 gap-8 h-auto">
            <TabsTrigger
              value="all"
              className="bg-transparent px-0 py-3 text-base text-muted-foreground data-[state=active]:text-cyan-400/80 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-400/80 rounded-none transition-none"
            >
              All Posts
            </TabsTrigger>
            <TabsTrigger
              value="system_design"
              className="bg-transparent px-0 py-3 text-base text-muted-foreground data-[state=active]:text-cyan-400/80 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-400/80 rounded-none transition-none"
            >
              System Design
            </TabsTrigger>
            <TabsTrigger
              value="devops"
              className="bg-transparent px-0 py-3 text-base text-muted-foreground data-[state=active]:text-cyan-400/80 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-400/80 rounded-none transition-none"
            >
              DevOps
            </TabsTrigger>
          </TabsList>
        </div>

        <Suspense
          fallback={
            <div className="py-10 text-center text-muted-foreground">
              Loading articles...
            </div>
          }
        >
          <TabsContent value="all" className="mt-0">
            <ArticleLists value="all" />
          </TabsContent>
          <TabsContent value="system_design" className="mt-0">
            <ArticleLists value="system-design" />
          </TabsContent>
          <TabsContent value="devops" className="mt-0">
            <ArticleLists value="devops" />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}

export default React.memo(ArticleTabs);
