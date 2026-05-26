'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MOCK_EVALUATION, type PendingCard } from '@/lib/mock/evaluation'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function EvaluationForm() {
  const { pendingCards, criteria } = MOCK_EVALUATION
  const [selectedCard, setSelectedCard] = useState<PendingCard | null>(null)
  const [checkedCriteria, setCheckedCriteria] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  function handleSelectCard(card: PendingCard) {
    setSelectedCard(card)
    setCheckedCriteria(new Set())
  }

  function handleToggleCriterion(id: string, checked: boolean) {
    setCheckedCriteria((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function handleConfirm() {
    if (!selectedCard) return
    setLoading(true)

    const totalPoints = criteria
      .filter((c) => checkedCriteria.has(c.id))
      .reduce((sum, c) => sum + c.points, 0)

    setTimeout(() => {
      toast.success(`Avaliação confirmada — ${totalPoints} pts atribuídos a ${selectedCard.responsible}`)
      setSelectedCard(null)
      setCheckedCriteria(new Set())
      setLoading(false)
    }, 600)
  }

  if (selectedCard) {
    const totalPoints = criteria
      .filter((c) => checkedCriteria.has(c.id))
      .reduce((sum, c) => sum + c.points, 0)

    return (
      <div className="flex flex-col gap-6 max-w-xl">
        {/* header do card selecionado */}
        <div className="rounded-xl border bg-card p-5 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                Avaliando card
              </p>
              <h2 className="font-semibold text-sm">{selectedCard.name}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedCard.responsible} · Entregue em {formatDate(selectedCard.deliveredAt)}
              </p>
            </div>
            <Badge variant="secondary">{totalPoints} pts</Badge>
          </div>
        </div>

        {/* critérios */}
        <div className="rounded-xl border bg-card divide-y">
          {criteria.map((criterion) => (
            <label
              key={criterion.id}
              htmlFor={criterion.id}
              className="flex items-center justify-between gap-3 px-5 py-3.5 cursor-pointer hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={criterion.id}
                  checked={checkedCriteria.has(criterion.id)}
                  onCheckedChange={(v) => handleToggleCriterion(criterion.id, !!v)}
                />
                <span className="text-sm">{criterion.label}</span>
              </div>
              <Badge variant="outline" className="tabular-nums text-xs">
                +{criterion.points} pts
              </Badge>
            </label>
          ))}
        </div>

        {/* actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCard(null)}
            disabled={loading}
          >
            Voltar
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={checkedCriteria.size === 0 || loading}
            className="gap-2"
          >
            <ClipboardCheck className="size-4" />
            Confirmar Avaliação
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold text-sm">Cards Aguardando Avaliação</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {pendingCards.length} card{pendingCards.length !== 1 ? 's' : ''} pendente{pendingCards.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Card</TableHead>
              <TableHead className="w-36">Responsável</TableHead>
              <TableHead className="w-36">Data de Entrega</TableHead>
              <TableHead className="w-24 pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingCards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="pl-6 font-medium text-sm">{card.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{card.responsible}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(card.deliveredAt)}
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelectCard(card)}
                  >
                    Avaliar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
