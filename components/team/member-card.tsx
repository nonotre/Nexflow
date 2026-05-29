'use client'

import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { LayoutGrid, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { TeamMember } from '@/lib/types'
import { SENIORITY_LABELS, CAPACITY_CONFIG, getInitials } from '@/lib/mock/team'
import { MOCK_KANBAN_CARDS, COLUMN_LABELS, COLUMN_ORDER } from '@/lib/mock/kanban'
import { MOCK_PROJECTS } from '@/lib/mock/dashboard'

// ---------------------------------------------------------------------------
// Priority helpers
// ---------------------------------------------------------------------------

const PRIORITY_CONFIG: Record<string, { label: string; className: string }> = {
  high: { label: 'Alta', className: 'text-red-600 bg-red-50 border-red-200' },
  medium: { label: 'Média', className: 'text-amber-600 bg-amber-50 border-amber-200' },
  low: { label: 'Baixa', className: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
}

// ---------------------------------------------------------------------------
// Member Detail Modal
// ---------------------------------------------------------------------------

interface MemberDetailModalProps {
  member: TeamMember
  open: boolean
  onClose: () => void
}

function MemberDetailModal({ member, open, onClose }: MemberDetailModalProps) {
  const initials = getInitials(member.name)
  const seniority = SENIORITY_LABELS[member.seniority]
  const capacity = CAPACITY_CONFIG[member.capacityStatus]
  const scorePercent = Math.min(Math.round((member.score / member.scoreTarget) * 100), 100)

  // Get all cards assigned to this member
  const memberCards = MOCK_KANBAN_CARDS.filter(
    (c) => c.assigneeName === member.name,
  )

  // Group by project
  const cardsByProject = MOCK_PROJECTS.map((project) => {
    const cards = memberCards.filter((c) => c.projectId === project.id)
    return { project, cards }
  }).filter(({ cards }) => cards.length > 0)

  // Sort cards within each project by COLUMN_ORDER
  cardsByProject.forEach(({ cards }) => {
    cards.sort(
      (a, b) => COLUMN_ORDER.indexOf(a.column) - COLUMN_ORDER.indexOf(b.column),
    )
  })

  const defaultOpen = cardsByProject.map(({ project }) => project.id)

  return (
    <Dialog open={open} onOpenChange={(v: boolean) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
        {/* Modal header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-none mb-0.5">
                {seniority}
              </p>
              <DialogTitle className="text-base font-semibold leading-tight truncate">
                {member.name}
              </DialogTitle>
            </div>
            <Badge variant="secondary">{capacity.label}</Badge>
          </div>

          {/* Mini score row */}
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-medium">Score</span>
              <span className="text-[11px] font-semibold tabular-nums">{scorePercent}% da meta</span>
            </div>
            <Progress value={scorePercent} className="h-1.5" />
          </div>
        </DialogHeader>

        {/* Cards list */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {cardsByProject.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <LayoutGrid className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Nenhum card atribuído a este colaborador.
              </p>
            </div>
          ) : (
            <Accordion multiple defaultValue={defaultOpen} className="flex flex-col gap-2">
              {cardsByProject.map(({ project, cards }) => (
                <AccordionItem
                  key={project.id}
                  value={project.id}
                  className="rounded-lg border border-border overflow-hidden"
                >
                  <AccordionTrigger className="px-3 py-2.5 hover:no-underline hover:bg-muted/40 transition-colors [&>svg]:shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium truncate">{project.name}</span>
                      <span className="ml-auto mr-2 shrink-0 text-[11px] text-muted-foreground tabular-nums">
                        {cards.length} card{cards.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-2 pt-0">
                    <div className="flex flex-col gap-1.5">
                      {cards.map((card) => {
                        const priority = PRIORITY_CONFIG[card.priority]
                        return (
                          <div
                            key={card.id}
                            className="flex items-start gap-2 rounded-md bg-muted/30 px-2.5 py-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-medium leading-snug truncate">
                                {card.title}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {COLUMN_LABELS[card.column]}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 text-[10px] font-medium rounded px-1.5 py-0.5 border ${priority.className}`}
                            >
                              {priority.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// MemberCard
// ---------------------------------------------------------------------------

interface MemberCardProps {
  member: TeamMember
}

export function MemberCard({ member }: MemberCardProps) {
  const [open, setOpen] = useState(false)

  const initials = getInitials(member.name)
  const capacity = CAPACITY_CONFIG[member.capacityStatus]
  const seniority = SENIORITY_LABELS[member.seniority]
  const scorePercent = Math.min(
    Math.round((member.score / member.scoreTarget) * 100),
    100,
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full text-left rounded-xl border border-border bg-card p-4 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          {/* Avatar + seniority + name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-none mb-0.5">
                {seniority}
              </p>
              <p className="text-sm font-semibold leading-tight">{member.name}</p>
            </div>
          </div>

          {/* Capacity badge — secondary, no dot */}
          <Badge variant="secondary">{capacity.label}</Badge>
        </div>

        {/* Score progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground font-medium">Score</span>
            <span className="text-[11px] font-semibold tabular-nums">{scorePercent}% da meta</span>
          </div>
          <Progress value={scorePercent} className="h-1.5" />
        </div>

        {/* Active cards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <LayoutGrid className="size-3" />
            <span>
              <span className="font-semibold text-foreground">{member.activeCards}</span>{' '}
              card{member.activeCards !== 1 ? 's' : ''} ativo{member.activeCards !== 1 ? 's' : ''}
            </span>
          </div>
          <ArrowRight className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </div>
      </button>

      <MemberDetailModal member={member} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
