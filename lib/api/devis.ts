import { getAPIBaseURL } from "@/config/url";

export type Devis = {
  id: number;
  filename: string;
  owner: string;
};

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
  const response = await fetch(`${getAPIBaseURL()}/devis/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis>;
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
