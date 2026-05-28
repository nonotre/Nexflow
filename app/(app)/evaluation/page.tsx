'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useRole } from '@/hooks/use-role'
import { EvaluationForm } from '@/components/evaluation/evaluation-form'

export default function EvaluationPage() {
  const role = useRole()
  const router = useRouter()

  useEffect(() => {
    if (role === 'collaborator') {
      toast.error('Acesso restrito — esta área é exclusiva para gestores.')
      router.replace('/projects')
    }
  }, [role, router])

  // evita flash da UI antes do redirect
  if (role !== 'manager') return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Avaliação de Cards</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Avalie as entregas da sua equipe e atribua pontos.
        </p>
      </div>

      <EvaluationForm />
    </div>
  )
}
