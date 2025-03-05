import { getAPIBaseURL } from "@/config/url";

export type Devis = {
  id: number;
  filename: string;
  owner: string;
};


export async function getDevis(token: string): Promise<Devis[]> {
  const response = await fetch(`${getAPIBaseURL()}/devis?token=${token}`);

  if (!response.ok) {
    throw new Error("Failed to fetch devis");
  }

  return response.json() as Promise<Devis[]>;
}

export async function uploadDevis(file: File, token: string): Promise<Devis> {
  const formData = new FormData();
  formData.append("devis", file);

  const response = await fetch(`${getAPIBaseURL()}/devis?token=${token}`, {
    method: "POST",
    body: formData,
  });


  if (!response.ok) {
    throw new Error("Failed to upload devis");
  }

  return response.json()
}
