"use client";
import ForumContent from "@/components/forum/threads/forum-content";
import { mockThreads } from "@/lib/mock-data";
import { Suspense } from "react";

export default function ForumPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center">Loading forum content...</div>
      }
    >
      <ForumContent initialThreads={mockThreads} />
    </Suspense>
  );
}
