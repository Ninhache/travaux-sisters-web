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

export interface RegisterParams {
  mail: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export async function handleRegister({
  mail,
  password,
}: RegisterParams): Promise<RegisterResponse> {
  const response = await fetchAPI({
    endpoint: "/users/register",
    method: "POST",
    body: {
      mail: mail,
      pwd: password,
    },
  });

  if (!response.ok) {
    // Le back renvoie un 401 avec un message ("Mail déjà utilisé", etc.)
    const message = await response.text();
    throw new Error(message || "Inscription impossible");
  }

  // /users/register renvoie le token en texte brut (ResponseEntity<String>)
  const token = (await response.text()).trim();

  return { token };
}
