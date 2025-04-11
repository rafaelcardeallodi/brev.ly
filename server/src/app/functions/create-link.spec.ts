import { describe, expect, it } from 'vitest'

import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { createSlug } from '@/utils/create-slug'
import { eq } from 'drizzle-orm'
import { createLink } from './create-link'
import { ShortLinkAlreadyExistsError } from './errors/short-link-already-exists-error'

describe('create link', () => {
  it('should be able to create a link', async () => {
    const shortUrl = `test-${randomUUID()}`

    const sut = await createLink({
      originalUrl: 'https://www.example.com',
      shortUrl,
    })

    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, createSlug(shortUrl)))

    expect(result).toHaveLength(1)
  })

  it('should not be able to create link with short link already exists', async () => {
    const link = await makeLink()

    const sut = await createLink({
      originalUrl: 'https://www.example.com',
      shortUrl: link.shortUrl,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(ShortLinkAlreadyExistsError)
  })
})
