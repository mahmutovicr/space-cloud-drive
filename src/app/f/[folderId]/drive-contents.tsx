"use client";

import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { useUploadThing } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  const { startUpload } = useUploadThing("driveUploader", {
    onClientUploadComplete: () => navigate.refresh(),
  });

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center flex-wrap">
            <Link href="/drive" className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/f/${folder.id}`} className="text-gray-300 hover:text-white">
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs text-neutral-300">
              Demo
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 shadow-xl overflow-x-auto">
          <div className="border-b border-gray-700 px-6 py-4 min-w-[400px]">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul className="min-w-[400px]">
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>

        <div className="mt-4 px-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6"></div>
            <div className="col-span-2"></div>
            <div className="col-span-3">
              <label className="cursor-pointer text-base text-gray-300 hover:text-white">
                Choose Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length > 0) {
                      void startUpload(files, { folderId: props.currentFolderId });
                    }
                  }}
                />
              </label>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
