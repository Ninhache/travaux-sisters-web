"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 max-w-md p-6 text-center shadow-xl">
        <div className="card-body flex flex-col items-center">
          <AlertTriangle className="text-error h-12 w-12" />
          <h1 className="card-title text-error mt-4 text-2xl font-bold">
            Accès refusé
          </h1>
          <p className="text-base-content/70 mt-2">
            Vous avez besoin d'être connecté pour accéder à cette page
          </p>
          <Link href="/forum" className="btn btn-primary mt-4">
            Retour au forum
          </Link>
        </div>
      </div>
    </main>
  );
}
