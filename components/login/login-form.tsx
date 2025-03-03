"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold justify-center">
          Se connecter !
        </h2>
        <p className="text-center text-base-content/70 mb-4">
          Entrez vos identifiants pour accéder à votre compte
        </p>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <div className="flex justify-between items-center">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <Link
              href="#"
              className="text-sm text-base-content/70 hover:text-primary transition-colors label-text-alt"
            >
              Mot de passe oublié?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className=" absolute right-2 top-1/2 -translate-y-1/2 p-2 cursor-pointer"
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
          <button className="btn btn-primary w-full">Se connecter</button>
        </div>

        <div className="divider">Ou</div>

        <div className="form-control">
          <button className="btn btn-outline w-full">Créer un compte</button>
        </div>
      </div>
    </div>
  );
}
