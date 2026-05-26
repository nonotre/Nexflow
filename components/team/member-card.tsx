import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { LayoutGrid } from 'lucide-react'
import type { TeamMember } from '@/lib/types'
import { SENIORITY_LABELS, CAPACITY_CONFIG, getInitials } from '@/lib/mock/team'

interface MemberCardProps {
  member: TeamMember
}

export function MemberCard({ member }: MemberCardProps) {
  const initials = getInitials(member.name)
  const capacity = CAPACITY_CONFIG[member.capacityStatus]
  const seniority = SENIORITY_LABELS[member.seniority]
  const scorePercent = Math.min(
    Math.round((member.score / member.scoreTarget) * 100),
    100,
  )

  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{member.name}</p>
            <Badge variant="outline" className="mt-0.5 h-4 px-1.5 text-[10px] font-medium">
              {seniority}
            </Badge>
          </div>
        </div>

        {/* Capacity badge */}
        <span
          className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${capacity.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${capacity.dot}`} />
          {capacity.label}
        </span>
      </div>

      {/* Score progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground font-medium">Score</span>
          <span className="text-[11px] font-semibold tabular-nums">
            {member.score.toLocaleString('pt-BR')}
            <span className="font-normal text-muted-foreground">
              {' '}/ {member.scoreTarget.toLocaleString('pt-BR')} pts
            </span>
          </span>
        </div>
        <Progress value={scorePercent} className="h-1.5" />
        <p className="text-[10px] text-muted-foreground text-right">{scorePercent}% da meta</p>
      </div>

      {/* Active cards */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <LayoutGrid className="size-3" />
        <span>
          <span className="font-semibold text-foreground">{member.activeCards}</span>{' '}
          card{member.activeCards !== 1 ? 's' : ''} ativo{member.activeCards !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
