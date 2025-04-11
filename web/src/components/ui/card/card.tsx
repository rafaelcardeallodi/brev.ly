import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('w-full rounded-lg bg-gray-100 p-6 md:p-8', className)}
      {...props}
    />
  )
}
