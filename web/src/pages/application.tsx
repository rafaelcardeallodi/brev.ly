import logoImg from '@/assets/logo.svg'
import { CreateLinkForm } from '@/components/create-link-form'
import { LinksList } from '@/components/links-list'

export function Application() {
  return (
    <main className="mx-auto mt-8 flex w-full max-w-[980px] flex-col items-center md:mt-22 md:items-start">
      <img src={logoImg} alt="Logo" />

      <div className="mt-8 grid w-full items-start gap-5 md:grid-cols-[minmax(0,360px)_minmax(468px,1fr)]">
        <CreateLinkForm />

        <LinksList />
      </div>
    </main>
  )
}
