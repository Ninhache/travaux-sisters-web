import FileUploadSection from "@/components/devis/file-upload-section";

export default function Home() {
  return (
    <>
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-6">Documents</h1>
            <FileUploadSection />
          </div>
        </div>
      </div>
    </>
  );
}
