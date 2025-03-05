"use client";

import type React from "react";

import type { Category } from "@/types/forum";
import { Folder, Hash, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryMenuProps {
  categories: Category[];
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const pathname = usePathname();

  // Map of category icons (you can expand this as needed)
  const categoryIcons: { [key: string]: React.ReactNode } = {
    "general-discussion": <MessageSquare className="h-4 w-4" />,
    support: <HelpCircle className="h-4 w-4" />,
    development: <Folder className="h-4 w-4" />,
  };

  return (
    <div className="bg-base-100 rounded-box p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="menu bg-base-100 w-full rounded-box">
        <li>
          <Link href="/forum" className={pathname === "/forum" ? "active" : ""}>
            <Hash className="h-4 w-4" />
            <span>All Categories</span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <details>
              <summary
                className={
                  pathname.startsWith(`/forum/${category.slug}`) ? "active" : ""
                }
              >
                {categoryIcons[category.slug] || <Folder className="h-4 w-4" />}
                <span className="capitalize">{category.name}</span>
              </summary>
              <ul>
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.slug}>
                    <Link
                      href={`/forum/${category.slug}/${subcategory.slug}`}
                      className={
                        pathname ===
                        `/forum/${category.slug}/${subcategory.slug}`
                          ? "active"
                          : ""
                      }
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
