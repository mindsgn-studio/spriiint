import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";

export const workouts = sqliteTable('workouts', {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  type: text().notNull(),
  repetitions: integer().notNull(),
  sets: integer().notNull(),
  started_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  ended_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  synced_at: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export type Task = typeof workouts.$inferSelect;