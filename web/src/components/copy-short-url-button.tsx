import { Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from './ui/button'

interface CopyShortUrlButtonProps {
  shortUrl: string
}

export function CopyShortUrlButton({ shortUrl }: CopyShortUrlButtonProps) {
  function handleCopyShortUrl() {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/${shortUrl}`
    )

    toast.success('Link copiado com sucesso!', {
      description: `O link ${shortUrl} foi copiado para a área de transferência.`,
    })
  }

  return (
    <Button variant="secondary" size="icon" onClick={handleCopyShortUrl}>
      <Copy className="size-4" />
    </Button>
  )
}
