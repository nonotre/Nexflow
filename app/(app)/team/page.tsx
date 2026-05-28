'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import { toast } from 'sonner'
import { useRole } from '@/hooks/use-role'
import { MemberCard } from '@/components/team/member-card'
import { TeamFilters } from '@/components/team/team-filters'
import { MOCK_TEAM } from '@/lib/mock/team'
import type { CapacityStatus, Seniority } from '@/lib/types'

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

type SeniorityFilter = Seniority | 'all'
type CapacityFilter = CapacityStatus | 'all'

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TeamPage() {
  const role = useRole()
  const router = useRouter()

  const [seniority, setSeniority] = useState<SeniorityFilter>('all')
  const [capacity, setCapacity] = useState<CapacityFilter>('all')

  // Guard: only managers can access this route
  useEffect(() => {
    if (role === 'collaborator') {
      toast.error('Acesso restrito', {
        description: 'Esta área é exclusiva para gestores.',
      })
      router.replace('/projects')
    }
  }, [role, router])

  // Must be before any early return to comply with Rules of Hooks
  const filtered = useMemo(
    () =>
      MOCK_TEAM.filter((m) => {
        if (seniority !== 'all' && m.seniority !== seniority) return false
        if (capacity !== 'all' && m.capacityStatus !== capacity) return false
        return true
      }),
    [seniority, capacity],
  )

  // Avoid flash of content for non-managers
  if (role !== 'manager') return null

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Minha Equipe</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {MOCK_TEAM.length} colaboradores · Visão de capacidade e performance
          </p>
        </div>
      </div>

      {/* Filters */}
      <TeamFilters
        seniority={seniority}
        capacity={capacity}
        onSeniorityChange={setSeniority}
        onCapacityChange={setCapacity}
        total={MOCK_TEAM.length}
        filtered={filtered.length}
      />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Nenhum colaborador encontrado com os filtros selecionados.
          </p>
          <button
            onClick={() => {
              setSeniority('all')
              setCapacity('all')
            }}
            className="text-xs text-primary underline underline-offset-2 hover:no-underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}
