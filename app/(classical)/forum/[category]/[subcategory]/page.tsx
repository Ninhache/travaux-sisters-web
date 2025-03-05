import { ParamsProps } from "@/app/(classical)/devis/[id]/page";
import SubcategoryPageContent from "@/components/forum/categories/subcategory-page-content";
import { mockCategories, mockThreads } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return mockCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    })),
  );
}

interface SubcategoryPageProps {
  category: string;
  subcategory: string;
}
export default async function SubcategoryPage({
  params: _params,
}: ParamsProps<SubcategoryPageProps>) {
  // const { category, subcategory } = await params;
  const params = await _params;

  const category = mockCategories.find((cat) => cat.slug === params.category);
  const subcategory = category?.subcategories.find(
    (subcat) => subcat.slug === params.subcategory,
  );

  if (!category || !subcategory) {
    notFound();
  }

  const subcategoryThreads = mockThreads.filter(
    (thread) =>
      thread.category === params.category &&
      thread.subcategory === params.subcategory,
  );

  return (
    <SubcategoryPageContent
      category={category}
      subcategory={subcategory}
      initialThreads={subcategoryThreads}
    />
  );
}
