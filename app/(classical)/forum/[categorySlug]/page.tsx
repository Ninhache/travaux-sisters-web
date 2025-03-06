import ForumContent from "@/components/forum/threads/forum-content";
import { getThreads } from "@/lib/api/forum";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ParamsProps } from "../../devis/[id]/page";
import { getAPIBaseURL } from "@/config/url";

interface CategoryPageProps {
  categorySlug: string;
}

async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${getAPIBaseURL()}/categorie/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export default async function CategoryPage({
  params,
}: ParamsProps<CategoryPageProps>) {
  const { categorySlug } = await params;

  if (!categorySlug) {
    notFound();
  }

  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const { id: categorieId } = category;

  const filteredThreads = await getThreads({ categorieId });

  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center">Loading forum content...</div>
      }
    >
      <ForumContent initialThreads={filteredThreads} />
    </Suspense>
  );
}
