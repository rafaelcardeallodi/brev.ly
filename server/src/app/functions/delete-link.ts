import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { LinkNotFoundError } from './errors/link-not-found-error'

const deleteLinkInput = z.object({
  linkId: z.string(),
})

type deleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: deleteLinkInput
): Promise<Either<LinkNotFoundError, null>> {
  const { linkId } = deleteLinkInput.parse(input)

  const [link] = await db
    .select({
      id: schema.links.id,
    })
    .from(schema.links)
    .where(eq(schema.links.id, linkId))
    .limit(1)
    .execute()

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  await db.delete(schema.links).where(eq(schema.links.id, link.id))

  return makeRight(null)
}
