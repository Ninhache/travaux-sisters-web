import ForumContent from "@/components/forum/threads/forum-content";
import { getCategories } from "@/lib/api/category";
import { getThreads } from "@/lib/api/forum";
import { Suspense } from "react";

// Le forum dépend de données live du back ; on évite le prérendu statique
// au build (sinon `fetch failed` quand l'API n'est pas joignable).
export const dynamic = "force-dynamic";

export default async function ForumPage() {
  const initialThreads = await getThreads({});
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center">Loading forum content...</div>
      }
    >
      <ForumContent categories={categories} initialThreads={initialThreads} />
    </Suspense>
  );
}
