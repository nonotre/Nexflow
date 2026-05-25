'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </div>
      <div>
        <h2 className="text-base font-semibold">Algo deu errado</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {error.message || 'Ocorreu um erro inesperado.'}
        </p>
      </div>
      <Button size="sm" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  )
}
