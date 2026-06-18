CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"image" text NOT NULL,
	"images" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text NOT NULL,
	"price" integer NOT NULL,
	"category" text NOT NULL,
	"variants" text NOT NULL,
	"specs" text NOT NULL,
	"stock" integer DEFAULT 10 NOT NULL
);
