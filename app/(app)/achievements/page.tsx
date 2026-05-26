'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, Lock, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useRole } from '@/hooks/use-role'
import { AchievementCard } from '@/components/achievements/achievement-card'
import {
  MOCK_ACHIEVEMENTS,
  getUnlockedAchievements,
  getRecentAchievements,
} from '@/lib/mock/achievements'
import type { Achievement } from '@/lib/types'

// ---------------------------------------------------------------------------
// Stat chip
// ---------------------------------------------------------------------------

function StatChip({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string
  value: string | number
  icon: React.ElementType
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border bg-card px-4 py-3 shadow-sm ${className ?? ''}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-lg font-bold leading-tight">{value}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Category section
// ---------------------------------------------------------------------------

const CATEGORY_ORDER: Achievement['category'][] = [
  'delivery',
  'score',
  'consistency',
  'special',
]
const CATEGORY_LABEL: Record<Achievement['category'], string> = {
  delivery: 'Entrega',
  score: 'Score',
  consistency: 'Consistência',
  special: 'Especial',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AchievementsPage() {
  const role = useRole()
  const router = useRouter()

  // Guard: only collaborators can access this page
  useEffect(() => {
    if (role === 'manager') {
      toast.error('Acesso restrito', {
        description: 'Conquistas são exclusivas para colaboradores.',
      })
      router.replace('/dashboard')
    }
  }, [role, router])

  if (role === 'manager') return null

  const unlocked = getUnlockedAchievements()
  const recent = getRecentAchievements(7)
  const total = MOCK_ACHIEVEMENTS.length

  return (
    <div className="flex flex-col gap-8">
      {/* ---- Page header ---- */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Minhas Conquistas</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Desbloqueie badges completando desafios e marcos de performance.
          </p>
        </div>
      </div>

      {/* ---- Stats ---- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatChip
          icon={Trophy}
          label="Conquistadas"
          value={`${unlocked.length} / ${total}`}
        />
        <StatChip
          icon={Sparkles}
          label="Recentes (7 dias)"
          value={recent.length}
        />
        <StatChip
          icon={Lock}
          label="Bloqueadas"
          value={total - unlocked.length}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* ---- Recent achievements ---- */}
      {recent.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Recentes</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              últimos 7 dias
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recent.map((a) => (
              <AchievementCard key={a.id} achievement={a} />
            ))}
          </div>
        </section>
      )}

      {/* ---- All achievements by category ---- */}
      {CATEGORY_ORDER.map((cat) => {
        const items = MOCK_ACHIEVEMENTS.filter((a) => a.category === cat)
        if (items.length === 0) return null
        const unlockedInCat = items.filter((a) => a.unlockedAt).length
        return (
          <section key={cat} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{CATEGORY_LABEL[cat]}</h3>
              <span className="text-[11px] text-muted-foreground">
                {unlockedInCat}/{items.length}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((a) => (
                <AchievementCard key={a.id} achievement={a} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
