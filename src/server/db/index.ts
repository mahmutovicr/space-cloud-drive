import { drizzle } from "drizzle-orm/singlestore";
import { createConnection } from "mysql2/promise";
import { env } from "~/env";
import * as schema from "./schema";

export async function getDb() {
  const conn = await createConnection({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: { rejectUnauthorized: false },
  });
  return drizzle(conn, { schema });
}
