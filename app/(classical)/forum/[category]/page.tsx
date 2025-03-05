import SubcategoryPageContent from "@/components/forum/categories/subcategory-page-content";
import { CategorySlugs, mockCategories, mockThreads } from "@/lib/mock-data";
import { tCategory } from "@/types/forum";
import { notFound } from "next/navigation";
import { ParamsProps } from "../../devis/[id]/page";

interface CategoryPageProps {
  category: CategorySlugs;
}

export default async function CategoryPage({
  params,
}: ParamsProps<CategoryPageProps>) {
  const { category } = await params;

  const categoryObj: tCategory | undefined = mockCategories.find(
    (cat) => cat.slug === category,
  );

  if (!categoryObj) {
    notFound();
  }

  const filteredThreads = mockThreads.filter(
    (thread) => thread.category === categoryObj.slug,
  );

  return (
    <SubcategoryPageContent
      category={categoryObj}
      subcategory={categoryObj}
      initialThreads={filteredThreads}
    />
  );
}
