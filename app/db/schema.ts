import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const completions = sqliteTable("completions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull().unique(),
  pushups: integer("pushups").notNull(),
  variation: text("variation").notNull(),
  completedAt: text("completed_at").notNull(),
});

export const workouts = sqliteTable("workout", {
  id: integer("id").primaryKey({ autoIncrement: true }),
});

export type Completions = typeof completions.$inferSelect;
export type Workouts = typeof workouts.$inferSelect;
