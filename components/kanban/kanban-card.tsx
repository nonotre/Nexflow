'use client'

import { useState } from 'react'
import { ChevronRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import type { KanbanCard as KanbanCardType, KanbanColumn, Priority } from '@/lib/types'
import type { Role } from '@/hooks/use-role'
import { COLUMN_LABELS, COLUMN_ORDER } from '@/lib/mock/kanban'

// ---------------------------------------------------------------------------
// Priority config
// ---------------------------------------------------------------------------

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; className: string }
> = {
  high: {
    label: 'Alta',
    className:
      'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400',
  },
  medium: {
    label: 'Média',
    className:
      'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
  },
  low: {
    label: 'Baixa',
    className:
      'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400',
  },
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface KanbanCardProps {
  card: KanbanCardType
  projectColor: string
  role: Role
  onMove: (cardId: string, newColumn: KanbanColumn) => void
  onEvaluate: (card: KanbanCardType) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function KanbanCard({
  card,
  projectColor,
  role,
  onMove,
  onEvaluate,
}: KanbanCardProps) {
  const [open, setOpen] = useState(false)

  const priority = PRIORITY_CONFIG[card.priority]
  const currentIndex = COLUMN_ORDER.indexOf(card.column)
  const otherColumns = COLUMN_ORDER.filter((c) => c !== card.column)

  return (
    <div className="group relative rounded-xl border border-border bg-card p-3 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5">
      {/* Color accent */}
      <div
        className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl"
        style={{ backgroundColor: projectColor }}
      />

      {/* Card body */}
      <div className="pl-1 flex flex-col gap-2.5">
        {/* Title */}
        <p className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          {card.title}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Priority */}
            <Badge
              variant="outline"
              className={`h-5 px-1.5 text-[10px] font-medium ${priority.className}`}
            >
              {priority.label}
            </Badge>

            {/* Points */}
            <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground font-medium">
              <Star className="size-2.5 fill-current text-amber-400" />
              {card.points} pts
            </span>
          </div>

          {/* Assignee avatar */}
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ backgroundColor: projectColor }}
            title={card.assigneeName}
          >
            {card.assignee}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {/* Move dropdown */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              className="inline-flex h-6 items-center gap-1 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Mover
              <ChevronRight className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <p className="px-3 py-2 text-[11px] text-muted-foreground">
                Mover para…
              </p>
              <DropdownMenuSeparator />
              {otherColumns.map((col) => {
                const toIndex = COLUMN_ORDER.indexOf(col)
                const isNext = toIndex === currentIndex + 1
                return (
                  <DropdownMenuItem
                    key={col}
                    className="text-xs gap-2"
                    onClick={() => {
                      onMove(card.id, col as KanbanColumn)
                      toast.success(
                        `Card movido para "${COLUMN_LABELS[col]}"`,
                        { duration: 2000 },
                      )
                      setOpen(false)
                    }}
                  >
                    {isNext && <ChevronRight className="size-3 text-primary" />}
                    {COLUMN_LABELS[col]}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Evaluate button — manager + done column only */}
          {role === 'manager' && card.column === 'done' && (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 px-2 text-[11px] gap-1"
              onClick={() => onEvaluate(card)}
            >
              Avaliar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
