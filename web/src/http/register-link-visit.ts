import { api } from './api-client'

interface RegisterLinkVisitRequest {
  linkId: string
}

export async function registerLinkVisit({ linkId }: RegisterLinkVisitRequest) {
  await api.post(`/links/${linkId}/visits`)
}
