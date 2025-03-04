import type { Category } from "@/types/forum";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-base-100 rounded-box p-4 shadow-sm">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul className="menu bg-base-100 w-full rounded-box">
        {categories.map((category) => (
          <li key={category}>
            <a
              className={selectedCategory === category ? "active" : ""}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
