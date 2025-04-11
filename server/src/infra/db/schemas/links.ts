import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  shortUrl: text('short_url').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  visitCount: integer('visit_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
