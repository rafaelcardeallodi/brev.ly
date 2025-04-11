import { Trash } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { deleteLink } from '@/http/delete-link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

interface DeleteLinkButtonProps {
  linkId: string
}

export function DeleteLinkButton({ linkId }: DeleteLinkButtonProps) {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['links'],
      })

      toast.success('Link excluído com sucesso!', {
        description: 'O link foi excluído permanentemente.',
      })
    },
  })

  async function handleDeleteLink() {
    await mutateAsync({ linkId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir este link?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            link e não poderá ser recuperado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteLink}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
