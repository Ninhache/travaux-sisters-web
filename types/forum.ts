import { CategorySlugs, SubcategorySlugs } from "@/lib/mock-data";

export interface tCategory {
  id: number;
  libelle: string;
  categorieChildren: readonly string[];
}

export interface Subcategory {
  name: string;
  slug: string;
}

// export interface Thread {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   category: CategorySlugs;
//   subcategory: SubcategorySlugs;
//   replies: number;
//   text: string;
// }

export interface ThreadComment {
  id: string;
  threadId: string;
  author: string;
  date: string;
  text: string;
  likes: number;
}

export type Comment = {
  id: string;
  author: string;
  text: string;
  date: string;
};
