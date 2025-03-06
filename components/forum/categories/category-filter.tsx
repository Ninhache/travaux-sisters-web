import { Category } from "@/lib/api/forum";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <ul className="menu bg-base-100 rounded-box w-full">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              className={`flex justify-between ${
                selectedCategory?.id === category.id ? "active" : ""
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <div className="flex items-center gap-2">
                <span className="capitalize">{category.libelle}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
