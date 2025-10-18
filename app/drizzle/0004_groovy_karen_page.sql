PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`repetitions` integer NOT NULL,
	`sets` integer NOT NULL,
	`started_at` text DEFAULT (CURRENT_TIMESTAMP),
	`ended_at` text DEFAULT (CURRENT_TIMESTAMP),
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_workouts`("id", "type", "repetitions", "sets", "started_at", "ended_at", "created_at") SELECT "id", "type", "repetitions", "sets", "started_at", "ended_at", "created_at" FROM `workouts`;--> statement-breakpoint
DROP TABLE `workouts`;--> statement-breakpoint
ALTER TABLE `__new_workouts` RENAME TO `workouts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;