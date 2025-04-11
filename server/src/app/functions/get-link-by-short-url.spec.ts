import { describe, expect, it } from 'vitest'

import { randomUUID } from 'node:crypto'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { LinkNotFoundError } from './errors/link-not-found-error'
import { getLinkByShortUrl } from './get-link-by-short-url'

describe('get link by short url', () => {
  it('should be able to get a link by short url', async () => {
    const shortUrl = `test-${randomUUID()}`

    const link = await makeLink({
      shortUrl,
    })

    const sut = await getLinkByShortUrl({
      shortUrl,
    })

    expect(isRight(sut)).toBe(true)

    expect(unwrapEither(sut)).toEqual({
      link: expect.objectContaining({
        id: link.id,
        originalUrl: link.originalUrl,
      }),
    })
  })

  it('should not be able to get a link that does not exist', async () => {
    const sut = await getLinkByShortUrl({
      shortUrl: 'non-existing-link-id',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
