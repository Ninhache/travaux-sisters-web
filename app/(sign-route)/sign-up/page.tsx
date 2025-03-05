import SignUpForm from "@/components/account/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "S'enregistrer | Travaux Sisters",
  description: "Travaux Sisters WIP!",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <SignUpForm />
    </main>
  );
}
