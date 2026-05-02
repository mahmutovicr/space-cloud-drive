"use client";

import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-gray-100 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0">
            <Link
              href="/drive"
              className="shrink-0 text-sm text-gray-300 hover:text-white sm:text-base"
            >
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex shrink-0 items-center">
                <ChevronRight className="mx-1 shrink-0 text-gray-500" size={14} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-sm text-gray-300 hover:text-white sm:text-base"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="self-start sm:self-auto">
            <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs text-neutral-300">
              Demo
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="hidden border-b border-gray-700 px-6 py-4 sm:block">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
            {props.folders.length === 0 && props.files.length === 0 && (
              <li className="px-6 py-12 text-center text-sm text-gray-500">
                This folder is empty
              </li>
            )}
          </ul>
        </div>

        <div className="mt-6 flex justify-center sm:justify-start">
          <UploadButton
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            input={{ folderId: props.currentFolderId }}
          />
        </div>
      </div>
    </div>
  );
}
