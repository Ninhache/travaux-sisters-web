"use client";

import { useSession } from "@/context/session-context";
import { getDevisById } from "@/lib/api/devis";
import { ArrowLeft, Download, FileText, Link } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  const { token } = useSession();

  useEffect(() => {
    async function fetchDevis() {
      try {
        const { id } = await params;
        // @ts-ignore
        const data = await getDevisById(id, token);
        setDevis(data);
      } catch (error) {
        console.error("Error fetching devis:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDevis();
  }, [params]);

  if (loading) {
    return (
      <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
        <p className="text-lg font-semibold">Chargement...</p>
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
              <iframe
                src={`http://localhost:8080/api/devis/${devis?.id}?token=user`}
                className="h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
