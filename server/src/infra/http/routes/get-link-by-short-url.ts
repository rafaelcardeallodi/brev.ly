import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getLinkByShortUrl } from '@/app/functions/get-link-by-short-url'
import { isRight, unwrapEither } from '@/shared/either'

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:shortUrl',
    {
      schema: {
        tags: ['links'],
        summary: 'Get link by short URL',
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              id: z.string(),
              shortUrl: z.string(),
              originalUrl: z.string().url(),
              visitCount: z.number(),
              createdAt: z.coerce.date(),
            }),
          }),
          403: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await getLinkByShortUrl({ shortUrl })

      if (isRight(result)) {
        const { link } = unwrapEither(result)

        return reply.status(200).send({
          link,
        })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'LinkNotFoundError':
          return reply.status(403).send({ message: error.message })
      }
    }
  )
}
