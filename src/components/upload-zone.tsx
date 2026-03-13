"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFile: (file: File) => void;
}

export function UploadZone({ onFile }: UploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        onFile(file);
      }
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/msword": [".doc"],
      },
      maxFiles: 1,
      maxSize: 15 * 1024 * 1024, // 15MB
    });

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
          isDragActive && !isDragReject
            ? "border-indigo-500 bg-indigo-500/10"
            : isDragReject
            ? "border-red-500 bg-red-500/10"
            : selectedFile
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-white/20 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5"
        )}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-white/40 text-sm mt-0.5">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mt-1"
            >
              <X className="w-3 h-3" />
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                isDragActive
                  ? "bg-indigo-500/20"
                  : "bg-white/10"
              )}
            >
              {isDragActive ? (
                <Upload className="w-7 h-7 text-indigo-400 animate-bounce" />
              ) : (
                <File className="w-7 h-7 text-white/40" />
              )}
            </div>
            <div>
              <p className="text-white font-medium">
                {isDragActive
                  ? "Drop your CV here"
                  : "Drag & drop your CV"}
              </p>
              <p className="text-white/40 text-sm mt-1">
                or{" "}
                <span className="text-indigo-400 hover:text-indigo-300">
                  browse files
                </span>
              </p>
              <p className="text-white/30 text-xs mt-2">
                Supports PDF and DOCX · Max 15MB
              </p>
            </div>
          </div>
        )}

        {isDragReject && (
          <p className="text-red-400 text-sm mt-3">
            Only PDF and DOCX files are accepted
          </p>
        )}
      </div>
    </div>
  );
}
