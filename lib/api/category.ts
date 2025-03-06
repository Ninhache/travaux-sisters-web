import { getAPIBaseURL } from "@/config/url";
import { Category } from "./forum";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${getAPIBaseURL()}/categorie`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data;
}
