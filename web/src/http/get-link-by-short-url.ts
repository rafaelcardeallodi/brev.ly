import { api } from './api-client'

interface GetLinkByShortUrlRequest {
  shortUrl: string
}

interface GetLinkByShortUrlResponse {
  link: {
    id: string
    originalUrl: string
    shortUrl: string
    visitCount: number
    createdAt: string
  }
}

export async function getLinkByShortUrl({
  shortUrl,
}: GetLinkByShortUrlRequest): Promise<GetLinkByShortUrlResponse> {
  const response = await api.get(`/links/${shortUrl}`)

  return response.data
}
