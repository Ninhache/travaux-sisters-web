"use client";

import { useSession } from "@/context/session-context";
import { createThreads, type Category } from "@/lib/api/forum";
import { Search, X } from "lucide-react";
import { type FormEvent, useEffect, useState, useRef, useMemo } from "react";

interface NewThreadModalProps {
  categories: Category[];
  onClose: () => void;
}

export default function NewThreadModal({
  categories,
  onClose,
}: NewThreadModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { token } = useSession();

  const modalRef = useRef<HTMLDivElement>(null);

  const flattenedCategories = useMemo(
    () => flattenCategories(categories),
    [categories],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!categorySearch.trim()) {
      setFilteredCategories(flattenedCategories);
      return;
    }

    const searchSlug = slugify(categorySearch);

    const results = flattenedCategories
      .map((cat) => {
        const catSlug = slugify(cat.libelle);
        const distance = damerauLevenshteinDistance(searchSlug, catSlug);

        const normalizedDistance = distance / Math.max(catSlug.length, 1);

        return {
          cat,
          normalizedDistance,
        };
      })

      .filter(({ cat: { libelle }, normalizedDistance }) => {
        return normalizedDistance <= 0.7 || libelle.includes(searchSlug);
      })

      .sort(
        (a, b) =>
          a.normalizedDistance - b.normalizedDistance ||
          a.cat.libelle.localeCompare(b.cat.libelle),
      )

      .map(({ cat }) => cat);

    setFilteredCategories(results);
  }, [categorySearch, flattenedCategories]);

  const handleSubmit = async (e: FormEvent) => {
    console.log("coucou coco");
    e.preventDefault();

    if (!title.trim() || !content.trim() || !selectedCategory || !token) {
      return;
    }
    console.log("bite");

    setIsSubmitting(true);
    try {
      await createThreads({
        token,
        titre: title.trim(),
        categorie: selectedCategory.id,
        contenu: content.trim(),
      });

      onClose();
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-base-100 relative w-full max-w-2xl rounded-lg p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="text-base-content/50 hover:text-base-content absolute top-4 right-4"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-xl font-bold">Create New Thread</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter thread title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block font-medium">
              Category
            </label>
            <div className="relative">
              {selectedCategory ? (
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary px-4 py-3">
                    {selectedCategory.libelle}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsSearchVisible(true);
                      setCategorySearch("");
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : isSearchVisible ? (
                <>
                  <input
                    type="text"
                    id="category"
                    className="input input-bordered w-full pl-10"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search for a category"
                    autoFocus
                  />
                  <Search className="text-base-content/50 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                  {filteredCategories.length > 0 && (
                    <div className="bg-base-100 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-lg">
                      <ul className="py-1">
                        {filteredCategories.map((cat) => (
                          <li
                            key={cat.id}
                            className="hover:bg-base-200 cursor-pointer px-4 py-2"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsSearchVisible(false);
                              setCategorySearch("");
                            }}
                          >
                            {cat.libelle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline w-full justify-start text-left"
                  onClick={() => {
                    setIsSearchVisible(true);
                    setSelectedCategory(null);
                  }}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Select a category
                </button>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="mb-2 block font-medium">
              Content
            </label>
            <textarea
              id="content"
              className="textarea textarea-bordered h-40 w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thread content here..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !title || !content || !selectedCategory}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Creating..." : "Create Thread"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Flatten nested categories into a simple array
 * ignoring hierarchy for the search
 */
function flattenCategories(categories: Category[]): Category[] {
  return categories.flatMap((cat) => [
    cat,
    ...flattenCategories(cat.categorieChildren || []),
  ]);
}

/**
 * (Optional) Convert string to a "slug" that removes diacritics, punctuation, etc.
 * This helps avoid issues with special characters when computing distance.
 */
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function damerauLevenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost,
      );

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }
  return d[a.length][b.length];
}
