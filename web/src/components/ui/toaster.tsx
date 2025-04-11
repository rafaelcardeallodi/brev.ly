import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-600 group-[.toaster]:border-gray-300 group-[.toaster]:shadow-lg',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
