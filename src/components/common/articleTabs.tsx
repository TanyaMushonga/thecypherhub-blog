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
        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent value="system_design">
            <ArticleLists value="system-design" />
          </TabsContent>
          <TabsContent value="devops">
            <ArticleLists value="devops" />
          </TabsContent>
          <TabsContent value="all">
            <ArticleLists value="all" />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}

export default React.memo(ArticleTabs);
