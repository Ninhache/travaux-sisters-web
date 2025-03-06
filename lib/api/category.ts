import { tCategory } from "@/types/forum";
import { fetchAPI } from "@/lib/api/utils";

export async function getCategories(): Promise<tCategory[]> {
  const response = await fetchAPI({
    endpoint: "/categorie",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data as tCategory[];
}
