'use client'

import { useState } from 'react'
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
  draggingCardId?: string | null
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
  draggingCardId,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false)
  const accent = COLUMN_ACCENT[column]
  const label = COLUMN_LABELS[column]

  // Is the dragged card already in this column?
  const isDraggingFromHere = draggingCardId
    ? cards.some((c) => c.id === draggingCardId)
    : false

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    // Only clear when leaving the column root, not its children
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOver(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsOver(false)
    const cardId = e.dataTransfer.getData('text/plain')
    if (cardId && !isDraggingFromHere) {
      onMove(cardId, column)
    }
  }

  return (
    <div
      className={[
        'flex w-64 shrink-0 flex-col rounded-xl border bg-muted/40 transition-all duration-150',
        isOver && !isDraggingFromHere
          ? 'border-zinc-500/50 bg-zinc-500/5 shadow-lg shadow-zinc-500/10 scale-[1.01]'
          : 'border-border',
      ].join(' ')}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <Badge
          variant="secondary"
          className="h-5 min-w-[20px] justify-center px-1.5 text-[10px] font-semibold"
        >
          {cards.length}
        </Badge>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2 pb-3">
        {cards.length === 0 ? (
          <div
          className={[
              'flex flex-1 items-center justify-center py-8 text-center rounded-lg border-2 border-dashed transition-colors',
              isOver && !isDraggingFromHere
                ? 'border-zinc-500/40 bg-zinc-500/5'
                : 'border-border/0',
            ].join(' ')}
          >
            <p className="text-xs text-muted-foreground/50">Nenhum card</p>
          </div>
        ) : (
          <>
            {cards.map((card) => (
              <KanbanCard
                key={card.id}
                card={card}
                projectColor={projectColor}
                role={role}
                onMove={onMove}
                onEvaluate={onEvaluate}
              />
            ))}
            {isOver && !isDraggingFromHere && (
              <div className="rounded-xl border-2 border-dashed border-zinc-500/40 bg-zinc-500/5 py-3" />
            )}
          </>
        )}
      </div>
    </div>
  )
}
