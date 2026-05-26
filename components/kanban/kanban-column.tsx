import { Badge } from '@/components/ui/badge'
import { KanbanCard } from '@/components/kanban/kanban-card'
import type { KanbanCard as KanbanCardType, KanbanColumn as KanbanColumnType } from '@/lib/types'
import type { Role } from '@/hooks/use-role'
import { COLUMN_LABELS } from '@/lib/mock/kanban'

// ---------------------------------------------------------------------------
// Column accent colors (top border strip)
// ---------------------------------------------------------------------------

const COLUMN_ACCENT: Record<string, string> = {
  backlog: 'bg-slate-400',
  in_progress: 'bg-blue-500',
  in_review: 'bg-amber-500',
  done: 'bg-emerald-500',
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface KanbanColumnProps {
  column: KanbanColumnType
  cards: KanbanCardType[]
  projectColor: string
  role: Role
  onMove: (cardId: string, newColumn: KanbanColumnType) => void
  onEvaluate: (card: KanbanCardType) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function KanbanColumn({
  column,
  cards,
  projectColor,
  role,
  onMove,
  onEvaluate,
}: KanbanColumnProps) {
  const accent = COLUMN_ACCENT[column]
  const label = COLUMN_LABELS[column]

  return (
    <div className="flex w-64 shrink-0 flex-col rounded-xl border border-border bg-muted/40">
      {/* Column header */}
      <div className="rounded-t-xl overflow-hidden">
        <div className={`h-1 w-full ${accent}`} />
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-xs font-semibold text-foreground">{label}</span>
          <Badge
            variant="secondary"
            className="h-5 min-w-[20px] justify-center px-1.5 text-[10px] font-semibold"
          >
            {cards.length}
          </Badge>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2 pb-3">
        {cards.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-8 text-center">
            <p className="text-xs text-muted-foreground/50">Nenhum card</p>
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              projectColor={projectColor}
              role={role}
              onMove={onMove}
              onEvaluate={onEvaluate}
            />
          ))
        )}
      </div>
    </div>
  )
}
