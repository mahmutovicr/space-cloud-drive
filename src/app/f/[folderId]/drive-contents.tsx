"use client";

import { CustomFileUploader } from "~/components/uploadthing";

export default function DriveContents(props: {
  files: { id: string; name: string; size: string }[];
  folders: { id: string; name: string }[];
  currentFolderId: string;
}) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start mb-6 border-b pb-2">
        <CustomFileUploader />
      </div>

      <div className="flex flex-col gap-4">
        {props.folders.map((folder) => (
          <div key={folder.id} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer">
            <div className="text-2xl text-blue-500">📁</div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-zinc-900">{folder.name}</span>
              <span className="text-[10px] text-zinc-400 font-normal uppercase">Folder</span>
            </div>
          </div>
        ))}

        {props.files.map((file) => (
          <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors border-b border-zinc-50">
            <div className="text-2xl text-zinc-400">📄</div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-zinc-900 truncate max-w-[200px] sm:max-w-md">{file.name}</span>
              <span className="text-xs text-zinc-500 font-normal mt-0.5">{file.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
