'use client'

import { useState, useCallback, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { KanbanColumn } from '@/components/kanban/kanban-column'
import { useRole } from '@/hooks/use-role'
import type { KanbanCard, KanbanColumn as KanbanColumnType } from '@/lib/types'
import { COLUMN_ORDER, COLUMN_LABELS } from '@/lib/mock/kanban'

// ---------------------------------------------------------------------------
// Avatar color palette (muted, harmonious)
// ---------------------------------------------------------------------------

const AVATAR_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
  '#14b8a6', // teal
]

function avatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface KanbanBoardProps {
  initialCards: KanbanCard[]
  projectColor: string
  projectName: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function KanbanBoard({
  initialCards,
  projectColor,
  projectName,
}: KanbanBoardProps) {
  const role = useRole()
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null)

  // Derive unique team members from cards
  const members = useMemo(() => {
    const seen = new Set<string>()
    const result: { initials: string; name: string }[] = []
    for (const c of initialCards) {
      if (!seen.has(c.assignee)) {
        seen.add(c.assignee)
        result.push({ initials: c.assignee, name: c.assigneeName })
      }
    }
    return result
  }, [initialCards])

  // Move a card to another column
  const handleMove = useCallback(
    (cardId: string, newColumn: KanbanColumnType) => {
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, column: newColumn } : c)),
      )
      toast.success(`Card movido para "${COLUMN_LABELS[newColumn]}"`, { duration: 2000 })
    },
    [],
  )

  // Evaluate a card (manager action)
  const handleEvaluate = useCallback((card: KanbanCard) => {
    toast.success(`Avaliando: "${card.title}"`, {
      description: 'Redirecionando para a página de Avaliação…',
      duration: 3000,
      action: {
        label: 'Ir agora',
        onClick: () => {
          window.location.href = '/evaluation#admin'
        },
      },
    })
  }, [])

  // Drag state handlers
  const handleDragStart = useCallback((cardId: string) => {
    setDraggingCardId(cardId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggingCardId(null)
  }, [])

  // Group cards by column
  const cardsByColumn = COLUMN_ORDER.reduce(
    (acc, col) => {
      acc[col] = cards.filter((c) => c.column === col)
      return acc
    },
    {} as Record<string, KanbanCard[]>,
  )

  return (
    <div className="flex flex-col gap-5 max-w-[1060px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold leading-tight">{projectName}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {cards.length} card{cards.length !== 1 ? 's' : ''} no quadro
          </p>
        </div>

        {/* Team avatars */}
        {members.length > 0 && (
          <div className="flex items-center -space-x-2">
            {/* + button — on the far left of the group */}
            <button
              title="Adicionar membro"
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-background text-muted-foreground/40 ring-2 ring-background transition-colors hover:border-primary/50 hover:text-primary/70 hover:bg-primary/5 hover:z-10"
            >
              <Plus className="size-3.5" />
            </button>

            {/* all avatars */}
            {members.map((member, i) => (
              <div
                key={member.initials}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-background cursor-default transition-transform hover:scale-110 hover:z-10 relative shrink-0"
                style={{ backgroundColor: avatarColor(i) }}
                title={member.name}
              >
                {member.initials}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMN_ORDER.map((col) => (
          <KanbanColumn
            key={col}
            column={col as KanbanColumnType}
            cards={cardsByColumn[col]}
            projectColor={projectColor}
            role={role}
            onMove={handleMove}
            onEvaluate={handleEvaluate}
            draggingCardId={draggingCardId}
          />
        ))}
      </div>
    </div>
  )
}
