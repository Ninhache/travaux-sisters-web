import {getAPIBaseURL} from "@/config/url";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function handleLogin({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  const response = await fetch(`${getAPIBaseURL()}/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, pwd: password }),
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
