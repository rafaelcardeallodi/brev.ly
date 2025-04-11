import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { exportLinks } from '@/app/functions/export-links'
import { unwrapEither } from '@/shared/either'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/exports',
    {
      schema: {
        tags: ['links'],
        summary: 'Export links',
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks()

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({
        reportUrl,
      })
    }
  )
}
