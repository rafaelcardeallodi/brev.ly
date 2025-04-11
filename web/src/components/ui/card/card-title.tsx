import type { ComponentProps } from 'react'

type CardTitleProps = ComponentProps<'div'>

export function CardTitle(props: CardTitleProps) {
  return <div className="font-bold text-gray-600 text-lg" {...props} />
}
