import ForumContent from "@/components/forum/threads/forum-content";
import { getThreads } from "@/lib/api/forum";
import { mockThreads } from "@/lib/mock-data";
import { Suspense } from "react";

export default async function ForumPage() {
  const initialThreads = await getThreads({});

  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center">Loading forum content...</div>
      }
    >
      <ForumContent initialThreads={initialThreads} />
    </Suspense>
  );
}
("");
