import { describe, expect, it } from 'vitest'

import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { LinkNotFoundError } from './errors/link-not-found-error'
import { registerLinkVisit } from './register-link-visit'

describe('register link visit', () => {
  it('should be able to register a visit to a link', async () => {
    const shortUrl = `test-${randomUUID()}`

    const link = await makeLink({
      shortUrl,
    })

    const sut = await registerLinkVisit({
      linkId: link.id,
    })

    expect(isRight(sut)).toBe(true)

    const [result] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id))
      .execute()

    expect(result.visitCount).toEqual(1)
  })

  it('should not be able to register a visit to a link that does not exist', async () => {
    const sut = await registerLinkVisit({
      linkId: 'non-existing-link-id',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
