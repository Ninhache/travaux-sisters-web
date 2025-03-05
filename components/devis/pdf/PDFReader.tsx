import { useSession } from "@/context/session-context";
import { getPDFById } from "@/lib/api/devis";
import { useEffect, useState } from "react";

interface PDFProps {
    id : string
}

export default function({id} : PDFProps) {
    const [pdfUrl, setPdfUrl] = useState("");
    const {token} = useSession()

    useEffect(() => {
        async function fetchPDF(id: string, token: string) {
            setPdfUrl(await getPDFById(id, token))
        }
        if (!token) return; 
        fetchPDF(id, token);
    }, [token])

    if (!pdfUrl) {
        return <>
                    <main className="bg-base-200 flex w-1/2 items-center justify-center p-4 md:p-8">
                        <p className="text-lg font-semibold">Chargement...</p>
                    </main>
                </> 
    }

    return <>
            <embed type="application/pdf" src={pdfUrl} className="w-full h-[500px]"/>
        </>
}