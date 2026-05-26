import { Seniority } from '@/lib/types'

export interface Delivery {
  id: string
  cardName: string
  deliveredAt: string
  points: number
}

export interface PerformanceData {
  score: number
  target: number
  seniority: Seniority
  deliveries: Delivery[]
}

export const MOCK_PERFORMANCE: PerformanceData = {
  score: 1240,
  target: 1500,
  seniority: 'pleno',
  deliveries: [
    {
      id: 'd-1',
      cardName: 'Implementar autenticação OAuth',
      deliveredAt: '2026-05-22',
      points: 320,
    },
    {
      id: 'd-2',
      cardName: 'Corrigir bug de cache na API',
      deliveredAt: '2026-05-19',
      points: 180,
    },
    {
      id: 'd-3',
      cardName: 'Testes unitários do módulo de relatórios',
      deliveredAt: '2026-05-15',
      points: 240,
    },
    {
      id: 'd-4',
      cardName: 'Documentação da API REST',
      deliveredAt: '2026-05-10',
      points: 150,
    },
    {
      id: 'd-5',
      cardName: 'Migração do banco de dados v3 → v4',
      deliveredAt: '2026-05-06',
      points: 350,
    },
  ],
}
