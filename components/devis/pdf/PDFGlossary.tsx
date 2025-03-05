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
      <>
        <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
          <p className="text-lg font-semibold">Chargement...</p>
        </main>
      </>
    );
  }
  console.log(glossary)
  return (
    <>
      {Object.entries(glossary).map( ([_, v]) => (
        <>
          <p>
            {v.matching} : {v.dictEntry.definition}
          </p>
        </>
      ))}
    </>
  );
}
