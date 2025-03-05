"use client";

import FileUploadSection from "@/components/devis/file-upload-section";
import { useSession } from "@/context/session-context";

export default function Home() {
  const { isConnected, loading } = useSession();

  if (loading) {
    return <>Loading</>;
  }

  if (!isConnected) {
    throw new Error("Pas connecté");
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title mb-6 text-2xl font-bold">Documents</h1>
              <FileUploadSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
