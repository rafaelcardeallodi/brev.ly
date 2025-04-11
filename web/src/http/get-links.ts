import { api } from './api-client'

interface GetLinksResponse {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    visitCount: number
    createdAt: string
  }[]
}

export async function getLinks(): Promise<GetLinksResponse> {
  const response = await api.get('/links')

  return response.data
}
