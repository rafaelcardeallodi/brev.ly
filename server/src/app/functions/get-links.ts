import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

type GetLinksOutput = {
  links: {
    id: string
    shortUrl: string
    originalUrl: string
    visitCount: number
    createdAt: Date
  }[]
}

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const links = await db
    .select({
      id: schema.links.id,
      shortUrl: schema.links.shortUrl,
      originalUrl: schema.links.originalUrl,
      visitCount: schema.links.visitCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .execute()

  return makeRight({ links })
}
