import {
  AllCategoryNames,
  CategoryNames,
  SubcategoryNames,
} from "@/lib/mock-data";

export interface Category {
  name: CategoryNames;
  slug: string;
  subcategories: Subcategory[];
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
  category: CategoryNames;
  subcategory: SubcategoryNames;
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
