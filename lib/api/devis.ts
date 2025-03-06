import { GlossaryEntry } from "@/types/devis";
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
    endpoint: `/devis/${id}?vue=inf`,
  });


  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis>;
}

export async function getPDFById(id: string, token: string): Promise<string> {
  const response = await fetchAPI({
    endpoint:`/devis/${id}?vue=pdf`
  });


  if (!response.ok) {
    throw new Error("Failed to fetch pdf");
  }

  const blob = await response.blob()
  const pdf = await URL.createObjectURL(blob)

  return pdf
}

export async function getGlossaryById(id: string, token: string): Promise<GlossaryEntry[]> {
  const response = await fetchAPI({
    endpoint: `/devis/${id}?vue=glo`
  });

  if (!response.ok) {
    throw new Error("Failed to fetch glossary");
  }

  return response.json() as Promise<GlossaryEntry[]>
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
