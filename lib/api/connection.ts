import { getAPIBaseURL } from "@/config/url";

export interface LoginParams {
  mail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function handleLogin({
  mail,
  password,
}: LoginParams): Promise<LoginResponse> {
  const response = await fetch(`${getAPIBaseURL()}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail, pwd: password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();

  console.log("Handle Login", data);

  return {
    ...data,
  };
}
