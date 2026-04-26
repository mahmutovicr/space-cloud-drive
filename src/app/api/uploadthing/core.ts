import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

const f = createUploadthing();

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const DEMO_USER_ID = "demo_developer_user";

export const ourFileRouter = {
  driveUploader: f({
    blob: {
      maxFileSize: "1GB",
      maxFileCount: 20,
    },
  })
    .input(
      z.object({
        folderId: z.number(),
      }),
    )
    .middleware(async ({ input }) => {
      let userId: string;

      if (DEMO_MODE) {
        userId = DEMO_USER_ID;
      } else {
        const user = await auth();
        if (!user.userId) throw new UploadThingError("Unauthorized");
        userId = user.userId;
      }

      const folder = await QUERIES.getFolderById(input.folderId);

      if (!folder) throw new UploadThingError("Folder not found");

      if (!DEMO_MODE && folder.ownerId !== userId)
        throw new UploadThingError("Unauthorized");

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
