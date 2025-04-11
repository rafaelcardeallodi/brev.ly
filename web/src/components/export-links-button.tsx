import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { exportLinks } from '@/http/export-links'
import { DownloadSimple, Spinner } from '@phosphor-icons/react'
import { Button } from './ui/button'

interface ExportLinksButtonProps {
  disabled?: boolean
}

export function ExportLinksButton({
  disabled = false,
}: ExportLinksButtonProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: exportLinks,
    onSuccess: data => {
      const link = document.createElement('a')
      link.href = data.reportUrl

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    },
    onError: error => {
      if (error instanceof AxiosError) {
        toast.error('Erro ao baixar o CSV', {
          description: error.response?.data.message,
        })
      }
    },
  })

  async function handleExportLinks() {
    await mutateAsync()
  }

  return (
    <Button
      variant="secondary"
      onClick={handleExportLinks}
      disabled={isPending || disabled}
    >
      {isPending ? (
        <Spinner className="size-4 animate-spin" />
      ) : (
        <DownloadSimple className="size-4" />
      )}
      Baixar CSV
    </Button>
  )
}
