"use client";

import React, { useState } from "react";
import ArticleLists from "./articleLists";

function ArticleTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full">
      {/* Tabs List */}
      <div className="flex space-x-4 bg-muted p-2 rounded-lg">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "all" ? "bg-background text-foreground shadow" : "text-muted-foreground"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("system_design")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "system_design"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground"
          }`}
        >
          System Design
        </button>
        <button
          onClick={() => setActiveTab("devops")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "devops" ? "bg-background text-foreground shadow" : "text-muted-foreground"
          }`}
        >
          DevOps
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-4 min-h-[70vh] bg-card rounded-md p-4">
        {activeTab === "all" && <ArticleLists value="all" />}
        {activeTab === "system_design" && <ArticleLists value="system-design" />}
        {activeTab === "devops" && <ArticleLists value="devops" />}
      </div>
    </div>
  );
}

export default ArticleTabs;
