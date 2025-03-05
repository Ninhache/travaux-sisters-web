import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";

const getFileById = (id: string) => {
  return {
    id,
    name: id === "1" ? "invoice-2023.pdf" : "quote-project-a.pdf",
    size: id === "1" ? "1.2 MB" : "0.8 MB",
    uploadedAt: id === "1" ? "2023-10-15" : "2023-10-10",
    url: "#",
  };
};

export default function FileViewPage({ params }: { params: { id: string } }) {
  const file = getFileById(params.id);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <main className="w-1/2 bg-base-200 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <Link href="/devis" className="btn btn-circle btn-ghost">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="card-title text-2xl font-bold">
                  Details document
                </h1>
              </div>

              <div className="bg-base-200 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h2 className="text-xl font-semibold">{file.name}</h2>
                      <p className="text-base-content/70">
                        Enregistré le {file.uploadedAt} • {file.size}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-primary">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-base-300 rounded-lg min-h-[500px] flex items-center justify-center">
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-base-content/50" />
                  <h3 className="text-lg font-medium mb-2">PDF Preview</h3>
                  <p className="text-base-content/70 max-w-md mx-auto">
                    Faut imaginer . . .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
