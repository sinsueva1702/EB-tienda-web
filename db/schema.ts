import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  image: text('image').notNull(),
  images: text('images').notNull(), // JSON array string of additional images
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  price: integer('price').notNull(), // Price in USD
  category: text('category').notNull(),
  variants: text('variants').notNull(), // JSON string representing variants
  specs: text('specs').notNull(), // JSON string representing specifications
  stock: integer('stock').notNull().default(10),
})
