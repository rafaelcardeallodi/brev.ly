import { api } from './api-client'

interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks(): Promise<ExportLinksResponse> {
  const response = await api.get('/links/exports')

  return response.data
}
