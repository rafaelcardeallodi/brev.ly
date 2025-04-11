import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, useParams } from 'react-router'

import logoIconImg from '@/assets/logo-icon.svg'
import { Card } from '@/components/ui/card/card'
import { getLinkByShortUrl } from '@/http/get-link-by-short-url'
import { registerLinkVisit } from '@/http/register-link-visit'

export function Shortened() {
  const { shortenedUrl } = useParams<{ shortenedUrl: string }>()

  const { data, isError } = useQuery({
    queryKey: [shortenedUrl, 'shortened'],
    queryFn: async () => {
      const { link } = await getLinkByShortUrl({ shortUrl: shortenedUrl! })

      await registerLinkVisit({
        linkId: link.id,
      })

      window.location.href = link.originalUrl

      return link
    },
    enabled: !!shortenedUrl,
    staleTime: Number.POSITIVE_INFINITY,
  })

  if (isError) {
    return <Navigate to="/404" />
  }

  return (
    <main className="mx-auto flex h-screen w-full max-w-[580px] flex-col items-center justify-center">
      <Card className="flex flex-col items-center gap-6 px-5 py-12 md:px-12 md:py-16">
        <img src={logoIconImg} alt="" />

        <div className="font-bold text-xl">Redirecionando...</div>

        <div className="flex flex-col items-center gap-1 text-center font-semibold text-gray-500 text-md">
          <span>O link será aberto automaticamente em alguns instantes.</span>
          {data && (
            <span>
              Não foi redirecionado?{' '}
              <Link to={data.originalUrl} className="text-blue-base underline">
                Acesse aqui
              </Link>
            </span>
          )}
        </div>
      </Card>
    </main>
  )
}
