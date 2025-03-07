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
      <p className="font-bold text-xl mb-2"> Glossaire du fichier : </p>
      {Object.entries(glossary).map( ([_, v], index) => (
        
          <div>
            <strong style={{textTransform: "capitalize"}}>{v.dictEntry.word} : </strong> {v.dictEntry.definition}
          </div>
        
      ))}
    </>
  );
}

/*
{ <marquee
  direction="down"
  // width="250"
  height="50"
  behavior="alternate"
  scrollamount={index % 2 === 0 ? 6:12}
  // style={{border: "solid"}}
  
  className="border-2 border-primary "
  >
  <marquee behavior="alternate">{v.dictEntry.word}</marquee>
</marquee>}
*/
