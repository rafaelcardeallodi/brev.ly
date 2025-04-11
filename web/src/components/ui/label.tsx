import * as LabelPrimitive from '@radix-ui/react-label'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type LabelProps = ComponentProps<typeof LabelPrimitive.Root> & {
  errored?: boolean
}

export function Label({ className, errored = false, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-errored={errored}
      className={cn(
        'font-regular text-gray-500 text-xs uppercase leading-none data-[errored=true]:text-danger',
        className
      )}
      {...props}
    />
  )
}

Label.displayName = LabelPrimitive.Root.displayName
