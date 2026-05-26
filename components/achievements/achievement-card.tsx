'use client'

import { Progress } from '@/components/ui/progress'
import type { Achievement } from '@/lib/types'

// ---------------------------------------------------------------------------
// Category labels
// ---------------------------------------------------------------------------

const CATEGORY_LABEL: Record<Achievement['category'], string> = {
  delivery: 'Entrega',
  score: 'Score',
  consistency: 'Consistência',
  special: 'Especial',
}

const CATEGORY_COLOR: Record<Achievement['category'], string> = {
  delivery: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
  score: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
  consistency: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400',
  special: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const {
    name,
    description,
    icon,
    category,
    unlockedAt,
    progress,
    progressMax,
    unlockCriteria,
  } = achievement

  const isUnlocked = unlockedAt !== undefined
  const hasProgress = progress !== undefined && progressMax !== undefined
  const progressPct = hasProgress ? Math.round((progress! / progressMax!) * 100) : 0

  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all ${
        isUnlocked
          ? 'border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5'
          : 'border-dashed border-border/60 bg-muted/30 opacity-70 hover:opacity-90'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all ${
          isUnlocked
            ? 'shadow-sm ring-2 ring-border/30'
            : 'grayscale opacity-50'
        }`}
        style={{ fontSize: '1.6rem' }}
        aria-hidden
      >
        {icon}
      </div>

      {/* Category badge */}
      <span
        className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CATEGORY_COLOR[category]}`}
      >
        {CATEGORY_LABEL[category]}
      </span>

      {/* Text */}
      <div className="flex-1 space-y-1">
        <p
          className={`text-sm font-semibold leading-snug ${
            isUnlocked ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {name}
        </p>
        <p className="text-xs leading-snug text-muted-foreground">
          {isUnlocked ? description : unlockCriteria}
        </p>
      </div>

      {/* Progress bar (partial progress on locked badges) */}
      {!isUnlocked && hasProgress && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{progress} / {progressMax}</span>
            <span>{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-1.5" />
        </div>
      )}

      {/* Unlock date */}
      {isUnlocked && unlockedAt && (
        <p className="text-[10px] text-muted-foreground/60">
          Conquistado em{' '}
          {unlockedAt.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      )}

      {/* Lock overlay indicator */}
      {!isUnlocked && !hasProgress && (
        <p className="text-[10px] text-muted-foreground/50 italic">Bloqueado</p>
      )}
    </div>
  )
}
