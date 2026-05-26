'use client'

import { useState, useCallback } from 'react'
import { ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { KanbanColumn } from '@/components/kanban/kanban-column'
import { useRole } from '@/hooks/use-role'
import type { KanbanCard, KanbanColumn as KanbanColumnType } from '@/lib/types'
import { COLUMN_ORDER } from '@/lib/mock/kanban'

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

  // Move a card to another column
  const handleMove = useCallback(
    (cardId: string, newColumn: KanbanColumnType) => {
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, column: newColumn } : c)),
      )
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

  // Group cards by column
  const cardsByColumn = COLUMN_ORDER.reduce(
    (acc, col) => {
      acc[col] = cards.filter((c) => c.column === col)
      return acc
    },
    {} as Record<string, KanbanCard[]>,
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Project color dot */}
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: projectColor }}
          />
          <div>
            <h2 className="text-xl font-semibold leading-tight">{projectName}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {cards.length} card{cards.length !== 1 ? 's' : ''} no quadro
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="size-3.5" />
          Ver todos os projetos
        </Link>
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
          />
        ))}
      </div>
    </div>
  )
}
