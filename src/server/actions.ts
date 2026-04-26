"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const DEMO_USER_ID = "demo_developer_user";

export async function deleteFile(fileId: number) {
  let userId: string;

  if (DEMO_MODE) {
    userId = DEMO_USER_ID;
  } else {
    const session = await auth();
    if (!session.userId) {
      return { error: "Unauthorized" };
    }
    userId = session.userId;
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(
        eq(files_table.id, fileId),
        eq(files_table.ownerId, userId),
      ),
    );

  if (!file) {
    return { error: "File not found" };
  }

  await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  await db
    .delete(files_table)
    .where(eq(files_table.id, fileId));

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
