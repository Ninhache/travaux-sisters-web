import {getAPIBaseURL} from "@/config/url";
import {User} from "@/context/session-context";

export interface ProfileParams {
  token: string;
}

export type ProfileResponse = User;

export async function handleProfile({
  token,
}: ProfileParams): Promise<ProfileResponse> {
  const response = await fetch(`${getAPIBaseURL()}}/user?token=${token}`);

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  const data = await response.json();

  return {
    ...data,
  };
}
