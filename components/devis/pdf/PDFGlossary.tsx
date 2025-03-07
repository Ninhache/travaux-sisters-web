"use client";

import { useSession } from "@/context/session-context";
import { getGlossaryById } from "@/lib/api/devis";
import { GlossaryEntry } from "@/types/devis";
import { Maybe } from "@/types/util";
import { useEffect, useState } from "react";

interface PDFProps {
  id: string;
}
export default function ({ id }: PDFProps) {
  const [glossary, setGlossary] = useState<Maybe<GlossaryEntry[]>>(null);
  const { token } = useSession();

  useEffect(() => {
    async function fetchGlossary(id: string, token: string) {
      setGlossary(await getGlossaryById(id, token));
    }
    if (!token) return;
    fetchGlossary(id, token);
  }, [token]);

  if (!glossary) {
    return (
      <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
        <p className="text-lg font-semibold">Chargement...</p>
      </main>
    );
  }

  if (glossary.length === 0) {
    return (
      <div className="alert alert-warning w-full shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2z"
            />
          </svg>
          <span>Aucun terme trouvé dans le glossaire.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="mb-2 text-xl font-bold">Glossaire du fichier :</p>
      {glossary.map((entry, index) => (
        <div key={index} className="border-base-300 border-b p-2">
          <strong className="capitalize">{entry.dictEntry.word} :</strong>
          <span> {entry.dictEntry.definition}</span>
        </div>
      ))}
    </>
  );
}
