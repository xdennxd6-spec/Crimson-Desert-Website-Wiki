CREATE TABLE "user_progress" (
	"user_id" text PRIMARY KEY,
	"checked_items" jsonb DEFAULT '[]' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
