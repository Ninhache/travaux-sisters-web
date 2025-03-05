import FileUploadSection from "@/components/devis/file-upload-section";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-2xl font-bold mb-6">Documents</h1>
              <FileUploadSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
