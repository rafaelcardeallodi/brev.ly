import { describe, expect, it } from 'vitest'

import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { getLinks } from './get-links'

describe('get links', () => {
  it('should be able to get a links', async () => {
    await makeLink({
      originalUrl: 'https://example.com',
    })

    const sut = await getLinks()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).links).instanceOf(Array)
  })
})
