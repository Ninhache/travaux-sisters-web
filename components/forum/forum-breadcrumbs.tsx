"use client";
import { mockCategories, mockThreads } from "@/lib/mock-data";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ForumBreadcrumbs() {
  const params = useParams();

  const categorySlug = params?.category;
  const subcategorySlug = params?.subcategory;
  const threadId = params?.threadId;

  let categoryName: string | undefined;
  let subcategoryName: string | undefined;
  let threadTitle: string | undefined;

  if (categorySlug) {
    const cat = mockCategories.find((c) => c.slug === categorySlug);
    if (cat) {
      categoryName = cat.name;

      if (subcategorySlug) {
        const subcat = cat.subcategories.find(
          (s) => s.slug === subcategorySlug
        );
        if (subcat) {
          subcategoryName = subcat.name;
        }
      }
    }
  }

  if (threadId) {
    const thr = mockThreads.find((t) => t.id === threadId);
    if (thr) {
      threadTitle = thr.title;
    }
  }

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link href="/forum">Forum</Link>
        </li>
        {categorySlug && categoryName && (
          <li>
            <Link href={`/forum/${categorySlug}`}>{categoryName}</Link>
          </li>
        )}
        {subcategorySlug && subcategoryName && categorySlug && (
          <li>
            <Link href={`/forum/${categorySlug}/${subcategorySlug}`}>
              {subcategoryName}
            </Link>
          </li>
        )}
        {threadId && threadTitle && <li>{threadTitle}</li>}
      </ul>
    </div>
  );
}
