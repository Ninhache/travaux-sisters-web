import SubcategoryPageContent from "@/components/forum/categories/subcategory-page-content";
import { mockCategories, mockThreads } from "@/lib/mock-data";
import type { Category } from "@/types/forum";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  const categoryObj: Category | undefined = mockCategories.find(
    (cat) => cat.slug === category
  );

  if (!categoryObj) {
    notFound();
  }

  const filteredThreads = mockThreads.filter(
    (thread) => thread.category === categoryObj.slug
  );

  return (
    <SubcategoryPageContent
      category={categoryObj}
      subcategory={categoryObj}
      initialThreads={filteredThreads}
    />
  );
}
