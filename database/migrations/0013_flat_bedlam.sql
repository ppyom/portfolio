CREATE TYPE "public"."contact_status" AS ENUM('unread', 'read', 'completed');--> statement-breakpoint
CREATE TABLE "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "contact_status",
	"title" text NOT NULL,
	"content" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text
);
