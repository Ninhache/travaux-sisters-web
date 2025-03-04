import {getAPIBaseURL} from "@/config/url";

type Category = string;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${getAPIBaseURL()}}/categorie`);

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();

  return {
    ...data,
  };
}
