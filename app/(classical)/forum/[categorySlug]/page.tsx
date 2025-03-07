import ForumContent from "@/components/forum/threads/forum-content";
import { getAPIBaseURL } from "@/config/url";
import { getCategories } from "@/lib/api/category";
import { getThreads } from "@/lib/api/forum";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ParamsProps } from "../../devis/[id]/page";

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
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center">Loading forum content...</div>
      }
    >
      <ForumContent categories={categories} initialThreads={filteredThreads} />
    </Suspense>
  );
}
