CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`repetitions` integer NOT NULL,
	`sets` integer NOT NULL
);
