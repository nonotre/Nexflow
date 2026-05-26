export interface PendingCard {
  id: string
  name: string
  responsible: string
  deliveredAt: string
}

export interface Criterion {
  id: string
  label: string
  points: number
}

export interface EvaluationData {
  pendingCards: PendingCard[]
  criteria: Criterion[]
}

export const MOCK_EVALUATION: EvaluationData = {
  pendingCards: [
    {
      id: 'card-1',
      name: 'Implementar autenticação OAuth',
      responsible: 'Ana Souza',
      deliveredAt: '2026-05-22',
    },
    {
      id: 'card-2',
      name: 'Corrigir bug de cache na API',
      responsible: 'Carlos Lima',
      deliveredAt: '2026-05-19',
    },
    {
      id: 'card-3',
      name: 'Testes unitários do módulo de relatórios',
      responsible: 'Mariana Costa',
      deliveredAt: '2026-05-15',
    },
    {
      id: 'card-4',
      name: 'Documentação da API REST',
      responsible: 'João Martins',
      deliveredAt: '2026-05-10',
    },
  ],
  criteria: [
    { id: 'c-1', label: 'Entregue no prazo', points: 100 },
    { id: 'c-2', label: 'Código revisado e aprovado', points: 80 },
    { id: 'c-3', label: 'Testes cobertos (>80%)', points: 120 },
    { id: 'c-4', label: 'Documentação atualizada', points: 60 },
    { id: 'c-5', label: 'Zero regressões introduzidas', points: 100 },
  ],
}
