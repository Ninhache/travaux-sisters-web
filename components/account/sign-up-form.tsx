"use client";

import { useSession } from "@/context/session-context";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register } = useSession();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // NB : le back ne stocke pour l'instant que mail + mot de passe.
      // Le téléphone est collecté mais pas encore envoyé à /users/register.
      await register(email, password);
      router.push("/devis");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inscription impossible");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-semibold">
          S'inscrire !
        </h2>
        <p className="text-base-content/70 mb-4 text-center">On vous écoute !</p>

        {error && (
          <div className="alert alert-error text-sm" role="alert">
            <span>{error}</span>
          </div>
        )}

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
            <label className="label">
              <span className="label-text">Numéro de téléphone</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33657678992"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div className="form-control w-full">
            <div className="flex items-center justify-between">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Création…" : "Créer un compte"}
            </button>
          </div>
        </form>

        <div className="divider">Ou</div>

        <div className="form-control">
          <Link href={"/sign-in"} className="btn btn-outline w-full">
            Déjà un compte ?
          </Link>
        </div>
      </div>
    </div>
  );
}
