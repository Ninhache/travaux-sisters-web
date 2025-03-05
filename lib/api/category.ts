import { getAPIBaseURL } from "@/config/url";
import { tCategory } from "@/types/forum";


export async function getCategories(): Promise<tCategory[]> {
  const response = await fetch(`${getAPIBaseURL()}/categorie`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data as tCategory[];
}
