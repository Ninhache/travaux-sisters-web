"use client";

import PDFGlossary from "@/components/devis/pdf/PDFGlossary";
import PDFReader from "@/components/devis/pdf/PDFReader";
import { useSession } from "@/context/session-context";
import { getDevisById } from "@/lib/api/devis";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  }, [params, token, loading]); // Removed router from dependencies

  if (loading || isLoading || !devis) {
    return (
      <main className="bg-base-200 flex w-full items-center justify-center p-4">
        <p className="text-lg font-semibold">Chargement...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-base-200 flex w-full items-center justify-center p-4">
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
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
    <main className="bg-base-200 w-full p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/devis"
                className="btn btn-circle btn-ghost self-start"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="card-title text-xl font-bold sm:text-2xl">
                Détails du document
              </h1>
            </div>

            <div className="bg-base-200 mb-4 rounded-lg p-3 sm:mb-6 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                  <div className="max-w-full sm:max-w-xs">
                    <h2 className="truncate text-lg font-semibold sm:text-xl">
                      {devis?.filename}
                    </h2>
                    <p className="text-base-content/70 text-sm sm:text-base">
                      Propriétaire: {devis?.owner}
                    </p>
                  </div>
                </div>

                <button className="btn btn-primary mt-2 w-full sm:mt-0 sm:w-auto">
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Télécharger
                </button>
              </div>
            </div>

            <div className="bg-base-300 flex min-h-[500px] w-full items-center justify-center rounded-lg">
              <PDFReader id={String(devis.id)}/>
            </div>
            <div>
              <PDFGlossary id={String(devis.id)}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
