import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  checkedItems: jsonb("checked_items").notNull().default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});
