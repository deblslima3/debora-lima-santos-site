CREATE TABLE `gallery_items` (
	`id` text PRIMARY KEY NOT NULL,
	`object_key` text NOT NULL,
	`title` text NOT NULL,
	`year` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`caption` text DEFAULT '' NOT NULL,
	`content_type` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gallery_items_object_key_unique` ON `gallery_items` (`object_key`);--> statement-breakpoint
CREATE TABLE `site_content` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
