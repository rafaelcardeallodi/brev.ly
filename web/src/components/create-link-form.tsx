import { createLink } from '@/http/create-link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from './ui/button'
import { Card } from './ui/card/card'
import { CardTitle } from './ui/card/card-title'
import { Input } from './ui/input'
import { Label } from './ui/label'

const createLinkFormSchema = z.object({
  originalUrl: z.string().url('URL inválida'),
  shortUrl: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, 'Deve conter apenas letras, números e hífens'),
})

type CreateLinkFormFormData = z.infer<typeof createLinkFormSchema>

export function CreateLinkForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateLinkFormFormData>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['links'],
      })

      reset()
    },
    onError: error => {
      if (error instanceof AxiosError) {
        toast.error('Erro no cadastro', {
          description: error.response?.data.message,
        })
      }
    },
  })

  async function onCreateLink(data: CreateLinkFormFormData) {
    await mutateAsync({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    })
  }

  return (
    <Card>
      <CardTitle>Novo link</CardTitle>

      <form onSubmit={handleSubmit(onCreateLink)} className="mt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="originalUrl" errored={!!errors.originalUrl}>
              Link original
            </Label>
            <Input
              id="originalUrl"
              placeholder="www.exemplo.com.br"
              errorMessage={errors.originalUrl?.message}
              {...register('originalUrl')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="shortUrl" errored={!!errors.shortUrl}>
              Link encurtado
            </Label>
            <Controller
              control={control}
              name="shortUrl"
              render={({ field: { onChange, ...rest } }) => {
                return (
                  <Input
                    id="shortUrl"
                    prefix="brev.ly/"
                    errorMessage={errors.shortUrl?.message}
                    onChange={event => {
                      onChange(event.target.value.trim())
                    }}
                    {...rest}
                  />
                )
              }}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Salvar link
        </Button>
      </form>
    </Card>
  )
}
