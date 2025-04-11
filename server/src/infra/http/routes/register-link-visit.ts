import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { registerLinkVisit } from '@/app/functions/register-link-visit'
import { isRight, unwrapEither } from '@/shared/either'

export const registerLinkVisitRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/:linkId/visits',
    {
      schema: {
        tags: ['links'],
        summary: 'Register a visit to a short link',
        params: z.object({
          linkId: z.string(),
        }),
        response: {
          201: z.null(),
          403: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { linkId } = request.params

      const result = await registerLinkVisit({
        linkId,
      })

      if (isRight(result)) {
        return reply.status(201).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'LinkNotFoundError':
          return reply.status(403).send({ message: error.message })
      }
    }
  )
}
