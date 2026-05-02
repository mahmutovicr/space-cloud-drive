"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "~/app/api/uploadthing/core";
import { useRouter } from "next/navigation";

export function SimpleUploadButton(props: { folderId: number }) {
  const router = useRouter();

  return (
    <div className="mt-12 flex justify-center">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        input={{ folderId: props.folderId }}
        content={{
          // Podesavamo da pise iskljucivo "Choose Files"
          button({ ready }) {
            if (ready) return "Choose Files";
            return "Loading...";
          },
          // Ovo uklanja "files up to 1GB, max 20" poruku
          allowedContent: () => null, 
        }}
        appearance={{
          // Stil dugmeta kao jednostavan tekst (kao na tvojoj slici)
          button: "bg-transparent hover:text-white text-gray-400 border-none transition-all cursor-pointer text-sm shadow-none",
          // Potpuno sakrivamo kontejner za dodatne informacije
          allowedContent: "hidden", 
        }}
        onClientUploadComplete={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
