import { Badge } from "@/components/ui/badge";
import { tCategory } from "@/types/forum";
import {
  Bell,
  Coffee,
  Folder,
  Hash,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { JSX } from "react";

interface CategoryFilterProps {
  categories: tCategory[];
  selectedCategory: tCategory | null;
  onSelectCategory: (category: tCategory) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  // Map of category icons
  const categoryIcons: Record<string, JSX.Element> = {
    all: <Hash className="h-4 w-4" />,
    general: <MessageSquare className="h-4 w-4" />,
    help: <HelpCircle className="h-4 w-4" />,
    feedback: <Folder className="h-4 w-4" />,
    announcements: <Bell className="h-4 w-4" />,
    offtopic: <Coffee className="h-4 w-4" />,
  };

  // Map of category counts (in a real app, this should come from backend)
  const categoryCounts: Record<string, number> = {
    all: 8,
    general: 2,
    help: 2,
    feedback: 1,
    announcements: 2,
    offtopic: 1,
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <ul className="menu bg-base-100 rounded-box w-full">
        {categories.map((category) => (
          <li key={category.slug}>
            <a
              className={`flex justify-between ${
                selectedCategory?.slug === category.slug ? "active" : ""
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <div className="flex items-center gap-2">
                {categoryIcons[category.slug] || <Hash className="h-4 w-4" />}
                <span className="capitalize">{category.name}</span>
              </div>
              <Badge variant="outline" className="ml-2">
                {categoryCounts[category.slug] || 0}
              </Badge>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
