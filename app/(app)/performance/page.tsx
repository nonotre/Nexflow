import { ScoreBar } from '@/components/performance/score-bar'
import { DeliveryList } from '@/components/performance/delivery-list'
import { MOCK_PERFORMANCE } from '@/lib/mock/performance'

export default function PerformancePage() {
  const { score, target, seniority, deliveries } = MOCK_PERFORMANCE

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Minha Performance</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe seu score e histórico de entregas.
        </p>
      </div>

      <ScoreBar score={score} target={target} seniority={seniority} />
      <DeliveryList deliveries={deliveries} />
    </div>
  )
}
