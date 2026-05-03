"use client";
import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { folders_table, files_table } from "~/server/db/schema";
import { useRouter } from "next/navigation";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  const router = useRouter();

  async function handleDelete() {
    await deleteFile(file.id);
    router.refresh();
  }

  return (
    <li className="border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center min-w-0">
          <a href={file.url} className="flex items-center text-gray-100 hover:text-blue-400 truncate" target="_blank" rel="noreferrer">
            <FileIcon className="mr-3 shrink-0" size={20} />
            <span className="truncate">{file.name}</span>
          </a>
        </div>
        <div className="col-span-2 text-gray-400">file</div>
        <div className="col-span-3 text-gray-400">{file.size} B</div>
        <div className="col-span-1 text-gray-400">
          <Button variant="ghost" onClick={handleDelete} aria-label="Delete file">
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: { folder: typeof folders_table.$inferSelect }) {
  const { folder } = props;
  return (
    <li className="border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center min-w-0">
          <Link href={`/f/${folder.id}`} className="flex items-center text-gray-100 hover:text-blue-400 truncate">
            <FolderIcon className="mr-3 shrink-0" size={20} />
            <span className="truncate">{folder.name}</span>
          </Link>
        </div>
        <div className="col-span-2 text-gray-400">folder</div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-1"></div>
      </div>
    </li>
  );
}
