import { FileIcon, FolderIcon } from "lucide-react";
import Link from "next/link";

export function FileRow(props: { file: any }) {
  const { file } = props;

  return (
    <div className="flex items-center justify-between px-8 py-4 hover:bg-[#1c2027]/50 border-b border-gray-800 transition-all w-full group">
      <div className="flex items-center gap-4 w-1/3">
        {file.type === "folder" ? (
          <Link href={`/f/${file.id}`} className="flex items-center gap-4 group-hover:text-blue-400 transition-colors">
            <FolderIcon className="text-gray-500" size={18} />
            <span className="text-gray-300 font-medium">{file.name}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <FileIcon className="text-gray-500" size={18} />
            <span className="text-gray-300 font-medium">{file.name}</span>
          </div>
        )}
      </div>

      <div className="w-1/3 text-center text-gray-600 text-sm font-sans uppercase tracking-tight">
        {file.type === "folder" ? "folder" : "file"}
      </div>

      <div className="w-1/3 text-right text-gray-600 text-sm tabular-nums font-sans">
        {file.type === "file" ? file.size : ""}
      </div>
    </div>
  );
}
