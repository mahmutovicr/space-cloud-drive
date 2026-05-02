"use client";

import { FileRow } from "./file-row";
import { SimpleUploadButton } from "~/components/uploadthing";

export default function DriveContents(props: { contents: any[], folderId: number }) {
  return (
    <div className="w-full min-h-screen bg-[#0f1115] flex flex-col items-center p-4 md:p-12 lg:p-20">
      {/* Breadcrumbs: My Drive > Root */}
      <div className="w-full max-w-6xl mb-6 text-gray-500 text-sm px-2">
         My Drive  &gt;  Root
      </div>

      {/* Glavna tabela koja zauzima punu sirinu na desktopu */}
      <div className="w-full max-w-6xl bg-[#16191f]/40 border border-gray-800 rounded-sm">
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
          <span className="w-1/3">Name</span>
          <span className="w-1/3 text-center">Type</span>
          <span className="w-1/3 text-right">Size</span>
        </div>

        <div className="flex flex-col w-full">
          {props.contents.map((item) => (
            <FileRow key={item.id} file={item} />
          ))}
          
          {props.contents.length === 0 && (
            <div className="p-16 text-center text-gray-600 text-sm italic">
              No items found in this directory.
            </div>
          )}
        </div>
      </div>

      {/* Samo "Choose Files" opcija ispod tabele */}
      <SimpleUploadButton folderId={props.folderId} />
    </div>
  );
}
