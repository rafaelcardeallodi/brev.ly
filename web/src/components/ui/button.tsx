import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold text-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'h-12 bg-blue-base px-5 text-white not-disabled:hover:bg-blue-dark',
        secondary:
          'h-8 rounded-sm border border-transparent bg-gray-200 px-2 text-gray-500 text-sm hover:border-blue-base',
        outline:
          'h-12 border border-gray-300 bg-transparent px-5 text-gray-600 hover:bg-gray-200',
      },
      size: {
        default: '',
        icon: 'size-8 [&_svg]:text-gray-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
Button.displayName = 'Button'

export { Button, type ButtonProps, buttonVariants }
