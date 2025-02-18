"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function RouteLayout({
  children,
  link,
  className,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(link)} className={cn(className)}>
      {children}
    </div>
  );
}

export default RouteLayout;
