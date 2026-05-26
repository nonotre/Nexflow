import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Delivery } from '@/lib/mock/performance'

interface DeliveryListProps {
  deliveries: Delivery[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function DeliveryList({ deliveries }: DeliveryListProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-sm">Últimas Entregas</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Histórico recente de cards concluídos
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">Card</TableHead>
            <TableHead className="w-36">Data</TableHead>
            <TableHead className="w-24 text-right pr-6">Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="pl-6 font-medium text-sm">
                {delivery.cardName}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(delivery.deliveredAt)}
              </TableCell>
              <TableCell className="text-right pr-6">
                <Badge variant="secondary" className="tabular-nums">
                  +{delivery.points} pts
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
