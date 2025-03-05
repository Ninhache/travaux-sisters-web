import { getAPIBaseURL } from "@/config/url";
import { Devis, GlossaryEntry } from "@/types/devis";

export async function getDevis(token: string): Promise<Devis[]> {
  const response = await fetch(`${getAPIBaseURL()}/devis`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis[]>;
}

export async function getDevisById(id: string, token: string): Promise<Devis> {
  const response = await fetch(`${getAPIBaseURL()}/devis/${id}?vue=inf`, {
    headers: {
      Authorization: `${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis>;
}

export async function getPDFById(id: string, token: string): Promise<string> {
  const response = await fetch(`${getAPIBaseURL()}/devis/${id}?vue=pdf`, {
    headers: {
      Authorization: `${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch pdf");
  }

  const blob = await response.blob()
  const pdf = await URL.createObjectURL(blob)

  return pdf
}

export async function getGlossaryById(id: string, token: string): Promise<GlossaryEntry[]> {
  const response = await fetch(`${getAPIBaseURL()}/devis/${id}?vue=glo`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch glossary");
  }

  return response.json() as Promise<GlossaryEntry[]>
}

export async function uploadDevis(file: File, token: string): Promise<Devis> {
  const formData = new FormData();
  formData.append("devis", file);

  const response = await fetch(`${getAPIBaseURL()}/devis`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload devis");
  }

  return response.json();
}
