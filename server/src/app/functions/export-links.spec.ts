import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'

import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { exportLinks } from './export-links'

describe('export links', () => {
  it('should be able to export links', async () => {
    vi.spyOn(upload, 'uploadFileToStorage').mockImplementationOnce(async () => {
      return {
        key: `${randomUUID()}.csv`,
        url: 'https://storage.com/file.csv',
      }
    })

    const sut = await exportLinks()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: 'https://storage.com/file.csv',
    })
  })
})
