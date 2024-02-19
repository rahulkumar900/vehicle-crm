ALTER TABLE "sites" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;