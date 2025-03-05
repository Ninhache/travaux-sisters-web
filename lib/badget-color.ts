import { CategorySlugs, SubcategorySlugs } from "./mock-data";

export const getCategoryGradient = (
  category: CategorySlugs,
  subcategory: SubcategorySlugs,
) => {
  const categoryColor = categoryToColor(category);
  const subcategoryColor = subcategoryToColor(subcategory);

  return {
    background: `linear-gradient(to right, ${categoryColor}, ${subcategoryColor})`,
  };
};

const subcategoryToColor = (subcategory: SubcategorySlugs) => {
  const colorMap: Record<SubcategorySlugs, string> = {
    announcements: "#FDE68A",
    api: "#BFDBFE",
    "feature-requests": "#D8B4FE",
    introductions: "#FBCFE8",
    "off-topic": "#BBF7D0",
    "technical-issues": "#FCA5A5",
  };
  return colorMap[subcategory] || "#D1D5DB";
};

const categoryToColor = (category: CategorySlugs) => {
  const colorMap: Record<CategorySlugs, string> = {
    "general-discussion": "#A7F3D0",
    support: "#BAE6FD",
    development: "#C4B5FD",
  };
  return colorMap[category] || "#D1D5DB";
};
