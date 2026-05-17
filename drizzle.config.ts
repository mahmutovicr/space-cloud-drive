import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  tablesFilter: ["space_cloud_drive_*"],
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
