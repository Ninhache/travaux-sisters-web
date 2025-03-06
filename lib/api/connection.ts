import { fetchAPI } from "@/lib/api/utils";

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
  const response = await fetchAPI({
    endpoint: "/users/login",
    method: "POST",
    body: {
      mail: email,
      pwd: password,
    },
  });

  console.log("Response", response);

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();

  return {
    ...data,
  };
}
