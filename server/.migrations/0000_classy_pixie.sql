CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"short_url" text NOT NULL,
	"original_url" text NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url")
);
