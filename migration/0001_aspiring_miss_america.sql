ALTER TABLE "users" ADD CONSTRAINT "users_email_applicationId_pk" PRIMARY KEY("email","applicationId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");