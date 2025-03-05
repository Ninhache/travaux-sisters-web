import {
  CategoryNames,
  CategorySlugs,
  SubcategorySlugs,
} from "@/lib/mock-data";

export interface tCategory {
  name: CategoryNames;
  slug: CategorySlugs;
  subcategories: readonly Subcategory[];
}

export interface Subcategory {
  name: string;
  slug: string;
}

export interface Thread {
  id: string;
  title: string;
  author: string;
  date: string;
  category: CategorySlugs;
  subcategory: SubcategorySlugs;
  replies: number;
  text: string;
}

export interface ThreadComment {
  id: string;
  threadId: string;
  author: string;
  date: string;
  text: string;
  likes: number;
}

export type Category = never;
