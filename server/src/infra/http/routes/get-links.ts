import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        tags: ['links'],
        summary: 'Get all short links',
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                shortUrl: z.string(),
                originalUrl: z.string().url(),
                visitCount: z.number(),
                createdAt: z.coerce.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks()

      const { links } = unwrapEither(result)

      return reply.status(200).send({
        links,
      })
    }
  )
}
