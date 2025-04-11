import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/shared/either'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        tags: ['links'],
        summary: 'Create a short link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
        }),
        response: {
          201: z.null(),
          403: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createLink({
        originalUrl,
        shortUrl,
      })

      if (isRight(result)) {
        return reply.status(201).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortLinkAlreadyExistsError':
          return reply.status(403).send({ message: error.message })
      }
    }
  )
}
