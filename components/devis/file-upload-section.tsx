"use client";

import { useSession } from "@/context/session-context";
import { Devis, getDevis, uploadDevis } from "@/lib/api/devis";
import {
  CheckCircleIcon,
  EyeIcon,
  FileIcon,
  UploadIcon,
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
  }, []);

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

      if (selectedFile.size > 2 * 1024 * 1024) {
        setUploadStatus({
          type: "error",
          message: "File size exceeds 2MB limit",
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

    setUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      // @ts-ignore
      const newDevis = await uploadDevis(file, token);
      // const  newDevis = await uploadDevis(file);
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
        message: "Failed to upload file. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  }, [token, file]);

  const viewFile = (id: number) => {
    router.push(`/devis/${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ajouter un devis !</h2>

        {uploadStatus.type && (
          <div
            className={`alert ${uploadStatus.type === "success" ? "alert-success" : "alert-error"}`}
          >
            <div className="flex items-center">
              {uploadStatus.type === "success" ? (
                <CheckCircleIcon className="mr-2 h-5 w-5" />
              ) : (
                <XCircleIcon className="mr-2 h-5 w-5" />
              )}
              <span>{uploadStatus.message}</span>
            </div>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Sélectionner un fichier PDF (Veuillez éviter les scans)
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/70">
              Taille maximale: 2MB
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          {file && (
            <div className="badge badge-outline gap-1">
              <FileIcon className="h-3 w-3" />
              {file.name}
            </div>
          )}
        </div>

        <button
          className={`btn btn-primary ${uploading ? "loading" : ""}`}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {!uploading && <UploadIcon className="mr-2 h-5 w-5" />}
          {uploading ? "Enregistrement..." : "Enregistrer votre document"}
        </button>
      </div>

      <div className="divider"></div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Vos Documents chargés</h2>

        {uploadedFiles.length === 0 ? (
          <div className="bg-base-200 rounded-lg py-8 text-center">
            <p className="text-base-content/70">
              Pas encore de documents chargés !
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-zebra table w-full">
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
                    <td>
                      <Link
                        href={`/devis/${file.id}`}
                        className="btn btn-sm btn-ghost"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="ml-1">Voir</span>
                      </Link>
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
