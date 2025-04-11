import { z } from 'zod'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { LinkNotFoundError } from './errors/link-not-found-error'

const getLinkByShortUrlInput = z.object({
  shortUrl: z.string(),
})

type GetLinkByShortUrlInput = z.input<typeof getLinkByShortUrlInput>

type GetLinkByShortUrlOutput = {
  link: {
    id: string
    shortUrl: string
    originalUrl: string
    visitCount: number
    createdAt: Date
  }
}

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput
): Promise<Either<LinkNotFoundError, GetLinkByShortUrlOutput>> {
  const { shortUrl } = getLinkByShortUrlInput.parse(input)

  const [link] = await db
    .select({
      id: schema.links.id,
      shortUrl: schema.links.shortUrl,
      originalUrl: schema.links.originalUrl,
      visitCount: schema.links.visitCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .execute()

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({ link })
}
