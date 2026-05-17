import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();
const DEMO_USER_ID = "demo_developer_user";

export const ourFileRouter = {
  driveUploader: f({
    blob: { maxFileSize: "1GB", maxFileCount: 20 },
  })
    .input(z.object({ folderId: z.number() }))
    .middleware(async ({ input }) => {
      const session = await auth();
      const userId = session.userId ?? DEMO_USER_ID;
      const folder = await QUERIES.getFolderById(input.folderId);
      if (!folder) throw new UploadThingError("Folder not found");
      return { userId, parentId: input.folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await MUTATIONS.createFile({
        file: {
          name: file.name,
          size: file.size,
          url: file.url,
          parent: metadata.parentId,
        },
        userId: metadata.userId,
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
