"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get("message") || error.message || "Une erreur s'est produite";

  useEffect(() => {
    console.error("Devis error:", error);
  }, [error]);

  return (
    <main className="bg-base-200 w-1/2 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="mb-6 flex items-center gap-4">
              <Link href="/devis" className="btn btn-circle btn-ghost">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="card-title text-error text-2xl font-bold">
                Erreur
              </h1>
            </div>

            <div className="bg-base-200 mb-6 rounded-lg p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Impossible de charger le document
              </h2>
              <p className="text-base-content/70 mb-4">{errorMessage}</p>
              <div className="flex gap-4">
                <button onClick={() => reset()} className="btn btn-primary">
                  Réessayer
                </button>
                <Link href="/devis" className="btn btn-outline">
                  Retour à la liste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
