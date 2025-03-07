"use client";

import { useSession } from "@/context/session-context";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useSession();

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/devis");
      /* on login complete, go to the / page */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-semibold">
          Se connecter !
        </h2>
        <p className="text-base-content/70 mb-4 text-center">
          Entrez vos identifiants pour accéder à votre compte
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>

          <div className="form-control w-full">
            <div className="flex items-center justify-between">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <Link
                href="#"
                className="text-base-content/70 hover:text-primary label-text-alt text-sm transition-colors"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full bg-white pr-10"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"}
                </span>
              </button>
            </div>
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Se connecter
            </button>
          </div>
        </form>

        <div className="divider">Ou</div>

        <div className="form-control">
          <Link href={"/sign-up"} className="btn btn-outline w-full">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
