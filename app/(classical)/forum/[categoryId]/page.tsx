import ForumContent from "@/components/forum/threads/forum-content";
import { getThreads } from "@/lib/api/forum";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ParamsProps } from "../../devis/[id]/page";
import { getCategories } from "@/lib/api/category";

interface CategoryPageProps {
  categoryId: string;
}

export default async function CategoryPage({
  params,
}: ParamsProps<CategoryPageProps>) {
  const { categoryId } = await params;

  if (!categoryId) {
    notFound();
  }

  const categorieId = parseInt(categoryId, 10);

  if (isNaN(categorieId)) {
    throw Error("`categorieId` must be a number");
  }

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
