'use client'

import { useState, useRef } from 'react'
import { CalendarDays, MessageSquare, Plus, Star, X, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { KanbanCard as KanbanCardType, Priority } from '@/lib/types'
import type { Role } from '@/hooks/use-role'
import { getCommentsByCard, type CardComment } from '@/lib/mock/kanban'

// ---------------------------------------------------------------------------
// Priority config
// ---------------------------------------------------------------------------

const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
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
// Date formatter
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatCommentTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) +
    ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface KanbanCardProps {
  card: KanbanCardType
  projectColor: string
  role: Role
  onMove: (cardId: string, newColumn: string) => void
  onEvaluate: (card: KanbanCardType) => void
  onDragStart?: (cardId: string) => void
  onDragEnd?: () => void
}

// ---------------------------------------------------------------------------
// Card Detail Modal
// ---------------------------------------------------------------------------

function CardDetailModal({
  card,
  projectColor,
  onClose,
}: {
  card: KanbanCardType
  projectColor: string
  onClose: () => void
}) {
  const priority = PRIORITY_CONFIG[card.priority]
  const comments = getCommentsByCard(card.id)
  const [newComment, setNewComment] = useState('')
  const [localComments, setLocalComments] = useState<CardComment[]>(comments)

  function handleSendComment() {
    if (!newComment.trim()) return
    const comment: CardComment = {
      id: `c-local-${Date.now()}`,
      cardId: card.id,
      author: 'Você',
      authorInitials: 'EU',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    }
    setLocalComments((prev) => [...prev, comment])
    setNewComment('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 flex w-full max-w-3xl h-[85vh] flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">

        {/* ── Global header ── */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 shrink-0">
          <h2 className="text-base font-semibold leading-snug text-foreground">
            {card.title}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ── Panels row ── */}
        <div className="flex flex-1 overflow-hidden">

        {/* ── Left panel ── */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Meta row — stacked label/value chips */}
          <div className="flex items-stretch gap-0 border-b border-border bg-muted/30">

            {/* Due date */}
            {card.dueDate && (
              <div className="flex flex-col items-start gap-0.5 px-5 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                  Entrega
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                  <CalendarDays className="size-3 text-muted-foreground/60" />
                  {formatDate(card.dueDate)}
                </span>
              </div>
            )}

            {/* Points */}
            <div className="flex flex-col items-start gap-0.5 px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                Pontos
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {card.points} pts
              </span>
            </div>

            {/* Priority */}
            <div className="flex flex-col items-start gap-1 px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                Prioridade
              </span>
              <Badge
                variant="outline"
                className={`h-5 px-2 text-[10px] font-semibold ${priority.className}`}
              >
                {priority.label}
              </Badge>
            </div>

            {/* Assignee — avatar only, name on hover */}
            <div className="flex flex-col items-start gap-1 px-5 py-3 ml-auto">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                Responsável
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white cursor-default"
                  style={{ backgroundColor: projectColor }}
                  title={card.assigneeName}
                >
                  {card.assignee}
                </div>
                <button
                  title="Adicionar membro"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground/50 transition-colors hover:border-primary/50 hover:text-primary/70 hover:bg-primary/5"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Descrição
            </label>
            <textarea
              className="w-full resize-none rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow min-h-[140px]"
              defaultValue={card.description ?? ''}
              placeholder="Nenhuma descrição adicionada."
            />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-px bg-border" />

        {/* ── Right panel — Comments ── */}
        <div className="flex w-72 shrink-0 flex-col bg-muted/20">
          {/* Comments header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-4">
            <MessageSquare className="size-3.5 text-muted-foreground/70" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Comentários
            </span>
            {localComments.length > 0 && (
              <span className="ml-auto flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary/10 px-1 text-[10px] font-bold text-primary">
                {localComments.length}
              </span>
            )}
          </div>

          {/* Comments feed */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {localComments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                <MessageSquare className="size-8 text-muted-foreground/20" />
                <p className="text-xs text-muted-foreground/50">Sem comentários ainda</p>
              </div>
            ) : (
              localComments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5">
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: comment.authorInitials === 'EU' ? '#6366f1' : projectColor }}
                    title={comment.author}
                  >
                    {comment.authorInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-foreground">
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-muted-foreground/50">
                        {formatCommentTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment input */}
          <div className="border-t border-border px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendComment()
                  }
                }}
                placeholder="Escreva um comentário…"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-xs leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
              <button
                onClick={handleSendComment}
                disabled={!newComment.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* end panels-row */}
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Card Component
// ---------------------------------------------------------------------------

export function KanbanCard({
  card,
  projectColor,
  role,
  onMove,
  onEvaluate,
  onDragStart,
  onDragEnd,
}: KanbanCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)
  const didDrag = useRef(false)

  const priority = PRIORITY_CONFIG[card.priority]

  function handleMouseDown(e: React.MouseEvent) {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    didDrag.current = false
  }

  function handleDragStart(e: React.DragEvent) {
    didDrag.current = true
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', card.id)
    // Ghost image offset
    const el = e.currentTarget as HTMLElement
    e.dataTransfer.setDragImage(el, el.offsetWidth / 2, 20)
    onDragStart?.(card.id)
  }

  function handleDragEnd() {
    setIsDragging(false)
    onDragEnd?.()
  }

  function handleClick() {
    if (!didDrag.current) {
      setModalOpen(true)
    }
    didDrag.current = false
  }

  return (
    <>
      <div
        draggable
        onMouseDown={handleMouseDown}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        className={[
          'group relative cursor-pointer rounded-xl border border-border bg-card p-3 shadow-sm',
          'transition-all duration-150 select-none',
          'hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20',
          isDragging
            ? 'opacity-40 rotate-2 scale-105 shadow-xl cursor-grabbing'
            : 'cursor-grab active:cursor-grabbing',
        ].join(' ')}
      >
        {/* Card body */}
        <div className="flex flex-col gap-2.5">
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

          {/* Due date (if available) */}
          {card.dueDate && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <CalendarDays className="size-3" />
              {formatDate(card.dueDate)}
            </div>
          )}

          {/* Evaluate button — manager + done column only */}
          {role === 'manager' && card.column === 'done' && (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 px-2 text-[11px] gap-1 w-fit"
              onClick={(e) => {
                e.stopPropagation()
                onEvaluate(card)
              }}
            >
              Avaliar
            </Button>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {modalOpen && (
        <CardDetailModal
          card={card}
          projectColor={projectColor}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
