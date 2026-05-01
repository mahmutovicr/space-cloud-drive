"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();
const DEMO_USER_ID = "demo_developer_user";

export async function deleteFile(fileId: number) {
  const [file] = await db
    .select()
    .from(files_table)
    .where(eq(files_table.id, fileId));

  if (!file) {
    return { error: "File not found" };
  }

  await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  await db.delete(files_table).where(eq(files_table.id, fileId));

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
