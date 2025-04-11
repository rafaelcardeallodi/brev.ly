import { getLinks } from '@/http/get-links'
import { Link, Spinner } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'

import { ExportLinksButton } from './export-links-button'
import { LinkItem } from './link-item'
import { Card } from './ui/card/card'
import { CardTitle } from './ui/card/card-title'

export function LinksList() {
  const { data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  })

  return (
    <Card className="relative overflow-hidden">
      {isLoading && (
        <motion.div
          className="absolute top-0 left-0 h-0.5 w-1/2 bg-blue-base"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            repeatType: 'loop',
            duration: 1,
            ease: 'linear',
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <CardTitle>Meus links</CardTitle>

        <ExportLinksButton disabled={!data || data?.links.length === 0} />
      </div>

      <div className="scrollbar-thumb-rounded-full scrollbar-thumb-blue-base scrollbar scrollbar-track-transparent mt-5 max-h-[396px] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="flex h-[118px] w-full flex-col items-center justify-center gap-4 border-gray-200 border-t pt-4">
            <Spinner className="size-8 animate-spin text-gray-400" />
            <span className="text-gray-500 text-xs uppercase">
              Carregando links...
            </span>
          </div>
        ) : (
          data?.links.map(link => {
            return <LinkItem key={link.id} link={link} />
          })
        )}

        {data?.links.length === 0 && (
          <div className="flex h-[118px] w-full flex-col items-center justify-center gap-4 border-gray-200 border-t pt-4">
            <Link className="size-8 text-gray-400" />
            <span className="text-gray-500 text-xs uppercase">
              Ainda não existem links cadastrados
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
