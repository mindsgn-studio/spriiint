DROP INDEX `completions_date_unique`;--> statement-breakpoint
ALTER TABLE `completions` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `completions` DROP COLUMN `pushups`;--> statement-breakpoint
ALTER TABLE `completions` DROP COLUMN `variation`;--> statement-breakpoint
ALTER TABLE `user` ADD `workout_save_permission` integer;--> statement-breakpoint
ALTER TABLE `workout` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `workout` ADD `reps` integer;--> statement-breakpoint
ALTER TABLE `workout` ADD `start` text;--> statement-breakpoint
ALTER TABLE `workout` ADD `end` text;--> statement-breakpoint
CREATE UNIQUE INDEX `workout_name_unique` ON `workout` (`name`);