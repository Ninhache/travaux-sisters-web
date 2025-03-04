// Mock service calls handling login and token refresh

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  appToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
    phone: string;
    adress: string;
  };
}

export async function mockLogin({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  // Your actual logic would go here – for now, it's a mock
  // e.g., call a real endpoint with fetch, axios, etc.
  // We'll just return a dummy object after a small delay:
  await new Promise((resolve) => setTimeout(resolve, 500)); // mimic server delay

  // Fake validation
  if (email !== "admin@admin.fr" || password !== "password") {
    throw new Error("Invalid credentials");
  }

  return {
    appToken: "fake-app-token-12345",
    refreshToken: "fake-refresh-token-abcde",
    user: {
      email: email,
      name: "Jane Doe",
      phone: "+1 111 2222 3333",
      adress: "123 Mock Street",
    },
  };
}

export async function mockRefreshToken(
  refreshToken: string
): Promise<{ appToken: string }> {
  // Normally you'd call some /refresh endpoint here
  await new Promise((resolve) => setTimeout(resolve, 300)); // mimic server delay

  if (refreshToken !== "fake-refresh-token-abcde") {
    throw new Error("Invalid refresh token");
  }

  // In a real scenario, you'd get back a brand new `appToken`
  return {
    appToken: "fake-new-app-token-67890",
  };
}
