import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { DEMO_MODE, DEMO_USER_ID } from "~/lib/mock-data";

export default async function DrivePage() {
  let userId: string;

  if (DEMO_MODE) {
    userId = DEMO_USER_ID;
  } else {
    const session = await auth();
    if (!session.userId) {
      return redirect("/sign-in");
    }
    userId = session.userId;
  }

  const rootFolder = await QUERIES.getRootFolderForUser(userId);

  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.onboardUser(userId);
    return redirect(`/f/${rootFolderId}`);
  }

  return redirect(`/f/${rootFolder.id}`);
}
