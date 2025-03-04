export interface Thread {
  id: string;
  title: string;
  author: string;
  date: string;
  category: Category;
  text: string;
  replies: number;
}

export type Category = string;
