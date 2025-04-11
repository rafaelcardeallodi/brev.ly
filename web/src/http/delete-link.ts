import { api } from './api-client'

interface DeleteLinkRequest {
  linkId: string
}

export async function deleteLink({ linkId }: DeleteLinkRequest) {
  await api.delete(`/links/${linkId}`)
}
