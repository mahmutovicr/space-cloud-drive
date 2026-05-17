import {
  integer,
  text,
  index,
  pgTableCreator,
  bigserial,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `space_cloud_drive_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    parent: integer("parent").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("files_parent_index").on(t.parent),
    index("files_owner_id_index").on(t.ownerId),
  ],
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    parent: integer("parent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("folders_parent_index").on(t.parent),
    index("folders_owner_id_index").on(t.ownerId),
  ],
);

export type DB_FolderType = typeof folders_table.$inferSelect;
