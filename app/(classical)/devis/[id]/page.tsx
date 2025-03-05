// const getFileById = (id: string) => {
//   return {
//     id,
//     name: id === "1" ? "DEVIS-BATIMENT-FCV-1-1.pdf" : "blank.pdf",
//     size: id === "1" ? "2.2 MB" : "0.2 MB",
//     uploadedAt: id === "1" ? "2025-03-05" : "2025-03-05",
//     url: "#",
//   };
// };

import { ArrowLeft, Download, FileText, Link } from "lucide-react";

export type ParamsProps<P = Record<string, unknown>> = {
  params: Promise<P>;
};

export default async function FileViewPage({
  params,
}: ParamsProps<{ id: string }>) {
  // const file = getFileById(params.id);
  const { id } = await params;

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
                Details document
              </h1>
            </div>

            <div className="bg-base-200 mb-6 rounded-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary h-8 w-8" />
                  <div>
                    {/* <h2 className="text-xl font-semibold">{file.name}</h2>
                      <p className="text-base-content/70">
                        Enregistré le {file.uploadedAt} • {file.size}
                      </p> */}
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
                src={`http://localhost:8080/api/devis/${id}?token=user`}
                className="h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
