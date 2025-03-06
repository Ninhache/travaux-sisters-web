import { fetchAPI } from "@/lib/api/utils";

export type Devis = {
  id: number;
  filename: string;
  owner: string;
};

export async function getDevis(token: string): Promise<Devis[]> {
  const response = await fetchAPI({
    endpoint: "/devis",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis[]>;
}

export async function getDevisById(id: string, token: string): Promise<Devis> {
  const response = await fetchAPI({
    endpoint: `/devis/${id}?vue=info`,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis>;
}

export async function deleteDevisById(id: number, token: string) {
  const response = await fetchAPI({
    endpoint: `/devis/${id}`,
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return true;
}

export async function uploadDevis(file: File, token: string): Promise<Devis> {
  const formData = new FormData();
  formData.append("devis", file);

  const response = await fetchAPI({
    endpoint: "/devis",
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload devis");
  }

  return response.json();
}
