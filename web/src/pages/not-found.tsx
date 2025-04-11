import { Card } from '@/components/ui/card/card'

import notFoundImg from '@/assets/404.svg'
import { Link } from 'react-router'

export function NotFound() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-[580px] flex-col items-center justify-center">
      <Card className="flex flex-col items-center gap-6 px-5 py-12 md:px-12 md:py-16">
        <img src={notFoundImg} alt="" />

        <div className="font-bold text-xl">Link não encontrado</div>

        <div className="text-center font-semibold text-gray-500 text-md">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <Link to="/" className="text-blue-base underline">
            brev.ly
          </Link>
        </div>
      </Card>
    </main>
  )
}
