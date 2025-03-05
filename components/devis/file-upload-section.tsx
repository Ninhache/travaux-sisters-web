"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileIcon,
  UploadIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
};

export default function FileUploadSection() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    // Sample data - replace with actual data from your API
    {
      id: "1",
      name: "invoice-2023.pdf",
      size: "1.2 MB",
      uploadedAt: "2023-10-15",
    },
    {
      id: "2",
      name: "quote-project-a.pdf",
      size: "0.8 MB",
      uploadedAt: "2023-10-10",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is PDF
      if (selectedFile.type !== "application/pdf") {
        setUploadStatus({
          type: "error",
          message: "Only PDF files are allowed",
        });
        return;
      }

      // Check file size (2MB = 2 * 1024 * 1024 bytes)
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

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus({
        type: "error",
        message: "Please select a file first",
      });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // This is where you would send the file to your server
      // Replace with your actual API endpoint
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // if (!response.ok) throw new Error('Upload failed');
      // const data = await response.json();

      // Simulate successful upload
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split("T")[0],
      };

      setUploadedFiles((prev) => [newFile, ...prev]);
      setFile(null);
      setUploadStatus({
        type: "success",
        message: "Fichier ajouté avec succès!",
      });

      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
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
  };

  const viewFile = (id: string) => {
    router.push(`/devis/${id}`);
  };

  return (
    <div className="space-y-8">
      {/* File Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ajouter un devis !</h2>

        {uploadStatus.type && (
          <div
            className={`alert ${
              uploadStatus.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <div className="flex items-center">
              {uploadStatus.type === "success" ? (
                <CheckCircleIcon className="h-5 w-5 mr-2" />
              ) : (
                <XCircleIcon className="h-5 w-5 mr-2" />
              )}
              <span>{uploadStatus.message}</span>
            </div>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Selectionner un fichier PDF (Veuillez éviter les scans)
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
          {!uploading && <UploadIcon className="h-5 w-5 mr-2" />}
          {uploading ? "Enregistrement..." : "Enregistrer votre document"}
        </button>
      </div>

      {/* Uploaded Files Section */}
      <div className="divider"></div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Vos Documents chargés</h2>

        {uploadedFiles.length === 0 ? (
          <div className="text-center py-8 bg-base-200 rounded-lg">
            <p className="text-base-content/70">
              Pas encore de documents chargés !
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Taille</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-primary" />
                        {file.name}
                      </div>
                    </td>
                    <td>{file.size}</td>
                    <td>{file.uploadedAt}</td>
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
