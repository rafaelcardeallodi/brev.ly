import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { LinkNotFoundError } from './errors/link-not-found-error'

const registerLinkVisitInput = z.object({
  linkId: z.string(),
})

type registerLinkVisitInput = z.input<typeof registerLinkVisitInput>

export async function registerLinkVisit(
  input: registerLinkVisitInput
): Promise<Either<LinkNotFoundError, null>> {
  const { linkId } = registerLinkVisitInput.parse(input)

  const [link] = await db
    .select({
      id: schema.links.id,
      visitCount: schema.links.visitCount,
    })
    .from(schema.links)
    .where(eq(schema.links.id, linkId))
    .limit(1)
    .execute()

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  await db
    .update(schema.links)
    .set({
      visitCount: link.visitCount + 1,
    })
    .where(eq(schema.links.id, link.id))

  return makeRight(null)
}
