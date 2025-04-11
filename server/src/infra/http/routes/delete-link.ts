import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteLink } from '@/app/functions/delete-link'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:linkId',
    {
      schema: {
        tags: ['links'],
        summary: 'Delete a short link',
        params: z.object({
          linkId: z.string(),
        }),
        response: {
          204: z.null(),
          403: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { linkId } = request.params

      const result = await deleteLink({
        linkId,
      })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'LinkNotFoundError':
          return reply.status(403).send({ message: error.message })
      }
    }
  )
}
