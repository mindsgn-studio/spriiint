import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workoutSavePermission: integer("workout_save_permission"),
});

export const completions = sqliteTable("completions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  completedAt: text("completed_at").notNull(),
});

export const workout = sqliteTable("workout", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  reps: integer("reps"),
  start: text("start"),
  end: text("end"),
});

export type Completions = typeof completions.$inferSelect;
export type Workouts = typeof workout.$inferSelect;
export type User = typeof user.$inferSelect;
