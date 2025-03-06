import { getAPIBaseURL } from "@/config/url";
import { User } from "@/context/session-context";
import { fetchAPI } from "@/lib/api/utils";

export interface ProfileParams {
  token: string;
}

export type ProfileResponse = User;

export async function handleProfile({
  token,
}: ProfileParams): Promise<ProfileResponse> {
  const response = await fetchAPI({
    endpoint: "/users/me",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  const data = await response.json();

  return {
    ...data,
  };
}
