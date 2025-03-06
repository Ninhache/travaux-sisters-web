import { fetchAPI } from "./utils";

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
  const response = await fetchAPI({
    endpoint: "/users/login",
    method: "POST",
    body: {
      mail: mail,
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
