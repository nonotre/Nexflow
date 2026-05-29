'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
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
  onAddCard: (column: KanbanColumnType, title: string) => void
  onDragStart: (cardId: string, height: number) => void
  onDragEnd: () => void
  draggingCardId?: string | null
  draggingCardHeight?: number | null
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
  onAddCard,
  onDragStart,
  onDragEnd,
  draggingCardId,
  draggingCardHeight,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const accent = COLUMN_ACCENT[column]
  const label = COLUMN_LABELS[column]

  // Is the dragged card already in this column?
  const isDraggingFromHere = draggingCardId
    ? cards.some((c) => c.id === draggingCardId)
    : false

  // Auto-focus textarea when add form opens
  useEffect(() => {
    if (isAdding) {
      textareaRef.current?.focus()
    }
  }, [isAdding])

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

  function handleConfirm() {
    const title = newTitle.trim()
    if (!title) return
    onAddCard(column, title)
    setNewTitle('')
    setIsAdding(false)
  }

  function handleCancel() {
    setNewTitle('')
    setIsAdding(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleConfirm()
    }
    if (e.key === 'Escape') {
      handleCancel()
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
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
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
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
            {isOver && !isDraggingFromHere && (
              <div
                className="rounded-xl border-2 border-dashed border-zinc-500/40 bg-zinc-500/5 shrink-0"
                style={{ height: draggingCardHeight ? `${draggingCardHeight}px` : '72px' }}
              />
            )}
          </>
        )}
      </div>

      {/* Add card footer */}
      <div className="p-2 pt-0">
        {isAdding ? (
          <div className="rounded-xl border border-primary/30 bg-card shadow-sm p-2.5 flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Título do card…"
              rows={2}
              className="w-full resize-none rounded-lg bg-transparent px-1 py-0.5 text-sm leading-snug text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleConfirm}
                disabled={!newTitle.trim()}
                className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Adicionar card
              </button>
              <button
                onClick={handleCancel}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground/60 transition-colors hover:bg-accent hover:text-muted-foreground"
          >
            <Plus className="size-3.5" />
            Adicionar card
          </button>
        )}
      </div>
    </div>
  )
}
