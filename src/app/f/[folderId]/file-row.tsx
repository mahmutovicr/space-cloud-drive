"use client";
import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { folders_table, files_table } from "~/server/db/schema";
import { useRouter } from "next/navigation";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  const router = useRouter();

  async function handleDelete() {
    await deleteFile(file.id);
    router.refresh();
  }

  return (
    <li className="border-b border-gray-700 px-4 py-3 last:border-b-0 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <a
          href={file.url}
          className="flex min-w-0 items-center gap-2 text-gray-100 hover:text-blue-400"
          target="_blank"
          rel="noreferrer"
        >
          <FileIcon className="shrink-0" size={18} />
          <span className="truncate text-sm">{file.name}</span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-gray-500">{formatSize(file.size)}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            aria-label="Delete file"
            className="h-8 w-8 text-gray-400 hover:text-red-400"
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>

      <div className="hidden grid-cols-12 items-center gap-4 sm:grid">
        <div className="col-span-6 flex min-w-0 items-center">
          <a
            href={file.url}
            className="flex min-w-0 items-center text-gray-100 hover:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            <FileIcon className="mr-3 shrink-0" size={20} />
            <span className="truncate">{file.name}</span>
          </a>
        </div>
        <div className="col-span-2 text-sm text-gray-400">file</div>
        <div className="col-span-3 text-sm text-gray-400">{formatSize(file.size)}</div>
        <div className="col-span-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            aria-label="Delete file"
            className="text-gray-400 hover:text-red-400"
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;

  return (
    <li className="border-b border-gray-700 px-4 py-3 last:border-b-0 sm:px-6 sm:py-4">
      <div className="flex items-center gap-2 sm:hidden">
        <Link
          href={`/f/${folder.id}`}
          className="flex min-w-0 items-center gap-2 text-gray-100 hover:text-blue-400"
        >
          <FolderIcon className="shrink-0" size={18} />
          <span className="truncate text-sm">{folder.name}</span>
        </Link>
        <span className="ml-auto shrink-0 text-xs text-gray-500">folder</span>
      </div>

      <div className="hidden grid-cols-12 items-center gap-4 sm:grid">
        <div className="col-span-6 flex min-w-0 items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex min-w-0 items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3 shrink-0" size={20} />
            <span className="truncate">{folder.name}</span>
          </Link>
        </div>
        <div className="col-span-2 text-sm text-gray-400">folder</div>
        <div className="col-span-3 text-sm text-gray-400"></div>
        <div className="col-span-1"></div>
      </div>
    </li>
  );
}
