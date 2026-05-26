import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { Seniority } from '@/lib/types'

const SENIORITY_LABEL: Record<Seniority, string> = {
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  lead: 'Lead',
}

interface ScoreBarProps {
  score: number
  target: number
  seniority: Seniority
}

export function ScoreBar({ score, target, seniority }: ScoreBarProps) {
  const percent = Math.min(Math.round((score / target) * 100), 100)

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Score Geral
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
            {score.toLocaleString('pt-BR')}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / meta {target.toLocaleString('pt-BR')} pts
            </span>
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {SENIORITY_LABEL[seniority]}
        </Badge>
      </div>

      <div className="flex flex-col gap-1.5">
        <Progress value={percent} className="h-2.5" />
        <p className="text-xs text-muted-foreground text-right">{percent}% da meta</p>
      </div>
    </div>
  )
}
