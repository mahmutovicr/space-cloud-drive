import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
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
    return (
      <form
        action={async () => {
          "use server";
          let uid: string;
          if (DEMO_MODE) {
            uid = DEMO_USER_ID;
          } else {
            const session = await auth();
            if (!session.userId) {
              return redirect("/sign-in");
            }
            uid = session.userId;
          }
          const rootFolderId = await MUTATIONS.onboardUser(uid);
          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button>Create your Drive</Button>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
