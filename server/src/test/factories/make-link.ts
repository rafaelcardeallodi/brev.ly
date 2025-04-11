import type { InferInsertModel } from 'drizzle-orm'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { createSlug } from '@/utils/create-slug'
import { fakerPT_BR as faker } from '@faker-js/faker'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const result = await db
    .insert(schema.links)
    .values({
      originalUrl: faker.internet.url(),
      shortUrl: faker.lorem.slug(),
      ...overrides,
    })
    .returning()

  return result[0]
}
