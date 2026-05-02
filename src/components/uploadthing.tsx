"use client";

import { useState } from "react";

export function CustomFileUploader() {
  const [fileInfo, setFileInfo] = useState<{ size: string; isAllowed: boolean } | null>(null);
  const MAX_SIZE_MB = 32;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col w-full items-start gap-1 py-4">
      <input
        type="file"
        id="file-upload"
        className="block w-full text-sm text-zinc-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-zinc-800
          cursor-pointer"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const sizeInMB = file.size / (1024 * 1024);
            setFileInfo({
              size: formatBytes(file.size),
              isAllowed: sizeInMB <= MAX_SIZE_MB
            });
          } else {
            setFileInfo(null);
          }
        }}
      />
      {fileInfo && (
        <div className="flex flex-col text-[11px] leading-tight ml-1">
          <span className="text-zinc-500 font-medium">Veličina: {fileInfo.size}</span>
          <span className={fileInfo.isAllowed ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {fileInfo.isAllowed ? "Dozvoljena veličina" : `Prevelik fajl (Max ${MAX_SIZE_MB}MB)`}
          </span>
        </div>
      )}
    </div>
  );
}
