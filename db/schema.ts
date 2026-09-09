import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteContent = sqliteTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const galleryItems = sqliteTable("gallery_items", {
  id: text("id").primaryKey(),
  objectKey: text("object_key").notNull().unique(),
  title: text("title").notNull(),
  year: text("year").notNull().default(""),
  location: text("location").notNull().default(""),
  caption: text("caption").notNull().default(""),
  contentType: text("content_type").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
