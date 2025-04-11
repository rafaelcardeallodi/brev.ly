import { api } from './api-client'

interface CreateLinkRequest {
  originalUrl: string
  shortUrl: string
}

export async function createLink({ originalUrl, shortUrl }: CreateLinkRequest) {
  await api.post('/links', {
    originalUrl,
    shortUrl,
  })
}
