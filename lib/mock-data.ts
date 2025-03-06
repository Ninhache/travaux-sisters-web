export const mockCategories = [
  {
    name: "General Discussion",
    slug: "general-discussion",
    subcategories: [
      { name: "Introductions", slug: "introductions" },
      { name: "Off-Topic", slug: "off-topic" },
    ],
  },
  {
    name: "Support",
    slug: "support",
    subcategories: [
      { name: "Technical Issues", slug: "technical-issues" },
      { name: "Feature Requests", slug: "feature-requests" },
    ],
  },
  {
    name: "Development",
    slug: "development",
    subcategories: [
      { name: "Announcements", slug: "announcements" },
      { name: "API", slug: "api" },
    ],
  },
] as const;

export type CategoryNames = (typeof mockCategories)[number]["name"];
export type SubcategoryNames =
  (typeof mockCategories)[number]["subcategories"][number]["name"];

export type CategorySlugs = (typeof mockCategories)[number]["slug"];
export type SubcategorySlugs =
  (typeof mockCategories)[number]["subcategories"][number]["slug"];

export type AllCategorySlugs = CategorySlugs | SubcategorySlugs;
