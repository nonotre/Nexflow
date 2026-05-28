import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FileQuestion className="size-6" />
      </div>
      <div>
        <h2 className="text-base font-semibold">Página não encontrada</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A rota que você acessou não existe.
        </p>
      </div>
      <Button size="sm" render={<Link href="/projects" />}>
        Voltar aos Projetos
      </Button>
    </div>
  )
}
