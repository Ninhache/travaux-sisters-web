import LoginForm from "@/components/account/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Se connecter | Travaux Sisters",
  description: "Travaux Sisters WIP!",
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <LoginForm />
    </main>
  );
}
