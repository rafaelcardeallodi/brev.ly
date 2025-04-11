import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { createSlug } from '@/utils/create-slug'
import { ShortLinkAlreadyExistsError } from './errors/short-link-already-exists-error'

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().transform(value => createSlug(value)),
})

type createLinkInput = z.input<typeof createLinkInput>

export async function createLink(
  input: createLinkInput
): Promise<Either<ShortLinkAlreadyExistsError, null>> {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  const [link] = await db
    .select({
      shortUrl: schema.links.shortUrl,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)
    .execute()

  if (link) {
    return makeLeft(new ShortLinkAlreadyExistsError())
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
  })

  return makeRight(null)
}
