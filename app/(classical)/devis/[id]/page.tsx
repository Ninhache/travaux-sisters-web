"use client";

import { useSession } from "@/context/session-context";
import { getDevisById } from "@/lib/api/devis";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type ParamsProps<P = Record<string, unknown>> = {
  params: Promise<P>;
};

export type Devis = {
  id: number;
  filename: string;
  owner: string;
};

export default function FileViewPage({ params }: ParamsProps<{ id: string }>) {
  const [devis, setDevis] = useState<Devis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { token, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchDevis() {
      try {
        setIsLoading(true);
        const { id } = await params;
        // @ts-ignore
        const data = await getDevisById(id, token);

        if (!data) {
          throw new Error(`Devis with ID ${id} not found`);
        }

        setDevis(data);
      } catch (error) {
        console.error("Error fetching devis:", error);
        setError(
          error instanceof Error ? error : new Error("Failed to fetch devis"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (!loading) {
      fetchDevis();
    }
  }, [params, token, loading, router]);

  if (loading || isLoading) {
    return (
      <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
        <p className="text-lg font-semibold">Chargement...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">Erreur</h2>
            <p>{error.message}</p>
            <div className="card-actions justify-end">
              <Link href="/devis" className="btn btn-primary">
                Retour à la liste
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-base-200 w-1/2 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="mb-6 flex items-center gap-4">
              <Link href="/devis" className="btn btn-circle btn-ghost">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="card-title text-2xl font-bold">
                Détails du document
              </h1>
            </div>

            <div className="bg-base-200 mb-6 rounded-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary h-8 w-8" />
                  <div>
                    <h2 className="text-xl font-semibold">{devis?.filename}</h2>
                    <p className="text-base-content/70">
                      Propriétaire: {devis?.owner}
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary">
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger
                </button>
              </div>
            </div>

            <div className="bg-base-300 flex min-h-[500px] w-full items-center justify-center rounded-lg">
              Faut imaginer le PDF . . .
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
