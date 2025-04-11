import { Link } from 'react-router'

import { CopyShortUrlButton } from './copy-short-url-button'
import { DeleteLinkButton } from './delete-link-button'

interface LinkItemProps {
  link: {
    id: string
    shortUrl: string
    originalUrl: string
    visitCount: number
  }
}

export function LinkItem({ link }: LinkItemProps) {
  return (
    <div className="flex items-center gap-5 border-gray-200 border-t py-4">
      <div className="flex flex-1 flex-col items-start gap-1">
        <Link
          to={link.shortUrl}
          target="_blank"
          className="font-semibold text-blue-base text-md"
        >
          {`${import.meta.env.VITE_BASE_URL}/${link.shortUrl}`}
        </Link>
        <span className="line-clamp-1 text-gray-500 text-sm">
          {link.originalUrl}
        </span>
      </div>

      <div className="text-gray-500 text-sm">{link.visitCount} acessos</div>

      <div className="flex gap-1">
        <CopyShortUrlButton shortUrl={link.shortUrl} />

        <DeleteLinkButton linkId={link.id} />
      </div>
    </div>
  )
}
