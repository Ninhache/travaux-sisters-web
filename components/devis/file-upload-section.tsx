"use client";

import type React from "react";

import { useSession } from "@/context/session-context";
import {
  deleteDevisById,
  type Devis,
  getDevis,
  uploadDevis,
} from "@/lib/api/devis";
import {
  CheckCircleIcon,
  EyeIcon,
  FileIcon,
  TrashIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function FileUploadSection() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadedFiles, setUploadedFiles] = useState<Devis[]>([]);

  const { token } = useSession();

  useEffect(() => {
    async function fetchDevis() {
      try {
        // @ts-ignore
        const devisList = await getDevis(token);
        setUploadedFiles(devisList);
      } catch (error) {
        console.error("Error fetching devis:", error);
      }
    }

    fetchDevis();
  }, [token]); // Added token as a dependency

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type !== "application/pdf") {
        setUploadStatus({
          type: "error",
          message: "Only PDF files are allowed",
        });
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setUploadStatus({
          type: "error",
          message: "File size exceeds 5MB limit",
        });
        return;
      }

      setFile(selectedFile);
      setUploadStatus({ type: null, message: "" });
    }
  };

  const handleUpload = useCallback(async () => {
    if (!file) {
      setUploadStatus({ type: "error", message: "Please select a file first" });
      return;
    }

    if (!token) {
      setUploadStatus({ type: "error", message: "Faut être connecté" });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      if (!token) return;

      const newDevis = await uploadDevis(file, token);
      setUploadedFiles((prev) => [newDevis, ...prev]);
      setFile(null);
      setUploadStatus({
        type: "success",
        message: "Fichier ajouté avec succès!",
      });

      const fileInput = document.getElementById(
        "file-upload",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        type: "error",
        message: "Impossible de télécharger le fichier. Veuillez réessayer.",
      });
    } finally {
      setUploading(false);
    }
  }, [token, file]);

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
      return;
    }

    try {
      if (!token) return;
      await deleteDevisById(id, token);
      setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du devis:", error);
    }
  };

  const viewFile = (id: number) => {
    router.push(`/devis/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold sm:text-xl">Ajouter un devis !</h2>

        {uploadStatus.type && (
          <div
            className={`alert ${uploadStatus.type === "success" ? "alert-success" : "alert-error"}`}
          >
            <div className="flex items-center">
              {uploadStatus.type === "success" ? (
                <CheckCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <XCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              )}
              <span className="text-sm sm:text-base">
                {uploadStatus.message}
              </span>
            </div>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">
              Sélectionner un fichier PDF (Veuillez éviter les scans)
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full text-sm sm:text-base"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/70 text-xs sm:text-sm">
              Taille maximale: 5MB
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {file && (
            <div className="badge badge-outline gap-1 text-xs break-all">
              <FileIcon className="h-3 w-3 flex-shrink-0" />
              <span className="max-w-[200px] truncate sm:max-w-xs">
                {file.name}
              </span>
            </div>
          )}
        </div>

        <button
          className={`btn btn-primary w-full sm:w-auto`}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {/* {!uploading && <UploadIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />} */}
          <span className="text-sm sm:text-base">
            {uploading ? "Enregistrement..." : "Enregistrer votre document"}
          </span>
        </button>
      </div>

      <div className="divider my-2"></div>

      <div>
        <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
          Vos Documents chargés
        </h2>

        {uploadedFiles.length === 0 ? (
          <div className="bg-base-200 rounded-lg py-6 text-center sm:py-8">
            <p className="text-base-content/70 text-sm sm:text-base">
              Pas encore de documents chargés !
            </p>
          </div>
        ) : (
          <div className="-mx-3 overflow-x-auto sm:mx-0">
            <div className="grid gap-4 sm:hidden">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FileIcon className="text-primary h-4 w-4" />
                      <h3 className="truncate text-sm font-medium">
                        {file.filename}
                      </h3>
                    </div>
                    <p className="mb-3 text-xs">Propriétaire: {file.owner}</p>
                    <div className="card-actions justify-end">
                      <Link
                        href={`/devis/${file.id}`}
                        className="btn btn-sm btn-outline"
                      >
                        <EyeIcon className="mr-1 h-4 w-4" /> Voir
                      </Link>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="btn btn-sm btn-error"
                      >
                        <TrashIcon className="mr-1 h-4 w-4" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <table className="table-zebra hidden table w-full sm:table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Propriétaire</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileIcon className="text-primary h-4 w-4" />
                        {file.filename}
                      </div>
                    </td>
                    <td>{file.owner}</td>
                    <td className="flex gap-2">
                      <Link
                        href={`/devis/${file.id}`}
                        className="btn btn-sm flex w-12 items-center justify-center bg-gray-300"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="btn btn-sm btn-error flex w-12 items-center justify-center"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
