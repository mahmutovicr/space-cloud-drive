export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { DEMO_USER_ID } from "~/lib/mock-data";

export default async function DrivePage() {
  const session = await auth();
  const userId = session.userId ?? DEMO_USER_ID;

  const rootFolder = await QUERIES.getRootFolderForUser(userId);

  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.onboardUser(userId);
    return redirect(`/f/${rootFolderId}`);
  }

  return redirect(`/f/${rootFolder.id}`);
}
