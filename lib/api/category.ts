import { API_BASEURL } from "@/config/url";

type Category = string;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASEURL}/categorie`);

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();

  return {
    ...data,
  };
}
