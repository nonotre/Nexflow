'use client'

import type { CapacityStatus, Seniority } from '@/lib/types'

// ---------------------------------------------------------------------------
// Filter option types
// ---------------------------------------------------------------------------

type SeniorityFilter = Seniority | 'all'
type CapacityFilter = CapacityStatus | 'all'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SENIORITY_OPTIONS: { value: SeniorityFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
  { value: 'lead', label: 'Lead' },
]

const CAPACITY_OPTIONS: {
  value: CapacityFilter
  label: string
  dot?: string
}[] = [
  { value: 'all', label: 'Todos' },
  { value: 'available', label: 'Disponível', dot: 'bg-emerald-500' },
  { value: 'busy', label: 'Ocupado', dot: 'bg-amber-500' },
  { value: 'overloaded', label: 'Sobrecarregado', dot: 'bg-red-500' },
]

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface TeamFiltersProps {
  seniority: SeniorityFilter
  capacity: CapacityFilter
  onSeniorityChange: (v: SeniorityFilter) => void
  onCapacityChange: (v: CapacityFilter) => void
  total: number
  filtered: number
}

// ---------------------------------------------------------------------------
// Chip sub-component
// ---------------------------------------------------------------------------

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function TeamFilters({
  seniority,
  capacity,
  onSeniorityChange,
  onCapacityChange,
  total,
  filtered,
}: TeamFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: seniority */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70 mr-1">
          Senioridade
        </span>
        {SENIORITY_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={seniority === opt.value}
            onClick={() => onSeniorityChange(opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>

      {/* Row 2: capacity */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70 mr-1">
          Capacidade
        </span>
        {CAPACITY_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={capacity === opt.value}
            onClick={() => onCapacityChange(opt.value)}
          >
            {opt.dot && (
              <span className={`h-2 w-2 rounded-full ${opt.dot}`} />
            )}
            {opt.label}
          </Chip>
        ))}
      </div>

      {/* Result count */}
      {(seniority !== 'all' || capacity !== 'all') && (
        <p className="text-xs text-muted-foreground">
          Mostrando{' '}
          <span className="font-semibold text-foreground">{filtered}</span> de{' '}
          <span className="font-semibold text-foreground">{total}</span>{' '}
          colaboradores
        </p>
      )}
    </div>
  )
}
