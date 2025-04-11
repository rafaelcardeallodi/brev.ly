import { cn } from '@/lib/utils'
import { Warning } from '@phosphor-icons/react'
import { type ComponentProps, useId } from 'react'

type InputProps = ComponentProps<'input'> & {
  errorMessage?: string
  prefix?: string
}

export function Input({
  className,
  type,
  prefix,
  errorMessage,
  ...props
}: InputProps) {
  const id = useId()

  return (
    <div>
      <label
        htmlFor={props.id ?? id}
        data-errored={!!errorMessage}
        aria-disabled={props.disabled}
        className="group flex h-12 w-full items-center rounded-lg border border-gray-300 bg-transparent px-4 py-1 text-md transition-colors focus-within:border-blue-base focus-within:ring-1 focus-within:ring-blue-base aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:opacity-50 data-[errored=true]:border-danger data-[errored=true]:ring-1 data-[errored=true]:ring-danger"
      >
        {prefix && <span className="text-gray-400">{prefix}</span>}

        <input
          id={props.id ?? id}
          type={type}
          className={cn(
            'flex-1 outline-none placeholder:text-gray-400',
            className
          )}
          {...props}
        />
      </label>

      {errorMessage && (
        <div className="mt-2 flex items-center gap-2">
          <Warning className="size-4 text-danger" />
          <span className="text-gray-500 text-sm">{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
Input.displayName = 'Input'
