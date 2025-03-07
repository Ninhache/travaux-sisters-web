"use client";

import { Category } from "@/lib/api/forum";
import { Hash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryMenuProps {
  categories: readonly Category[];
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const pathname = usePathname();

  return (
    <div className="bg-base-100 rounded-box p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <ul className="menu bg-base-100 rounded-box w-full">
        <li>
          <Link
            href="/forum"
            className={
              pathname === "/forum" ? "active text-primary font-bold" : ""
            }
          >
            <Hash className="h-4 w-4" />
            <span>Toutes les catégories</span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/forum/${category.slug}`}
              className={
                // pathname.startsWith(`/forum/${category.id}`) ? "active" : ""
                pathname === `/forum/${category.slug}`
                  ? "text-primary font-bold"
                  : ""
              }
            >
              <span className="capitalize">{category.libelle}</span>
            </Link>
            {category.categorieChildren.length > 0 && (
              <ul className="ml-4 border-l border-gray-300 pl-2">
                {category.categorieChildren.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link
                      href={`/forum/${subcategory.slug}`}
                      className={
                        pathname === `/forum/${subcategory.slug}`
                          ? "text-primary font-bold"
                          : ""
                      }

                      // className={
                      //   pathname === `/forum/${subcategory.id}` ? "active" : ""
                      // }
                    >
                      {subcategory.libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
