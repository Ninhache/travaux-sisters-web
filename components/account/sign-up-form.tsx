"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold justify-center">
          S'inscrire !
        </h2>
        <p className="text-center text-base-content/70 mb-4">
          On vous écoute !
        </p>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="input bg-white input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Numéro de téléphone</span>
          </label>
          <input
            type="text"
            placeholder="+33657678992"
            className="input bg-white input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <div className="flex justify-between items-center">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input bg-white input-bordered w-full pr-10"
            />
            <button
              type="button"
              className=" absolute  right-2 top-1/2 -translate-y-1/2 p-2 cursor-pointer"
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
          <button className="btn btn-primary w-full">Créer un compte</button>
        </div>

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
