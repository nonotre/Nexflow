import type { Achievement } from '@/lib/types'

// ---------------------------------------------------------------------------
// Mock achievements data
// ---------------------------------------------------------------------------

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 86_400_000)
}

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  // ---- Delivery ----
  {
    id: 'first-delivery',
    name: 'Primeira Entrega',
    description: 'Complete seu primeiro card no Nexflow.',
    icon: '🎯',
    category: 'delivery',
    unlockedAt: daysAgo(30),
    unlockCriteria: 'Completar 1 card',
  },
  {
    id: 'fast-delivery',
    name: 'Entregador Veloz',
    description: 'Entregue 3 cards antes do prazo definido.',
    icon: '⚡',
    category: 'delivery',
    unlockedAt: daysAgo(4),
    unlockCriteria: '3 entregas antes do prazo',
  },
  {
    id: 'deadline-master',
    name: 'Mestre dos Prazos',
    description: 'Entregue 10 cards antes do prazo definido.',
    icon: '⏱️',
    category: 'delivery',
    progress: 3,
    progressMax: 10,
    unlockCriteria: '10 entregas antes do prazo',
  },
  {
    id: 'prolific',
    name: 'Prolífico',
    description: 'Complete 25 cards ao longo do tempo.',
    icon: '📦',
    category: 'delivery',
    progress: 8,
    progressMax: 25,
    unlockCriteria: 'Completar 25 cards',
  },

  // ---- Score ----
  {
    id: 'score-1k',
    name: 'Sênior em Ascensão',
    description: 'Acumule 1.000 pontos no Nexflow.',
    icon: '📈',
    category: 'score',
    unlockedAt: daysAgo(6),
    unlockCriteria: 'Atingir 1.000 pts',
  },
  {
    id: 'score-2500',
    name: 'Especialista',
    description: 'Acumule 2.500 pontos no Nexflow.',
    icon: '🏆',
    category: 'score',
    progress: 1240,
    progressMax: 2500,
    unlockCriteria: 'Atingir 2.500 pts',
  },
  {
    id: 'score-5k',
    name: 'Lenda do Time',
    description: 'Acumule 5.000 pontos no Nexflow.',
    icon: '👑',
    category: 'score',
    progress: 1240,
    progressMax: 5000,
    unlockCriteria: 'Atingir 5.000 pts',
  },

  // ---- Consistency ----
  {
    id: 'consistent',
    name: 'Consistente',
    description: 'Complete 5 cards consecutivos sem atraso.',
    icon: '🔥',
    category: 'consistency',
    progress: 2,
    progressMax: 5,
    unlockCriteria: '5 entregas consecutivas sem atraso',
  },
  {
    id: 'top-performer',
    name: 'Top Performer',
    description: 'Mantenha score acima de 80% da meta por um mês completo.',
    icon: '⭐',
    category: 'consistency',
    unlockCriteria: 'Score > 80% da meta por 30 dias seguidos',
  },

  // ---- Special ----
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Um dos primeiros membros a usar o Nexflow.',
    icon: '🚀',
    category: 'special',
    unlockedAt: daysAgo(45),
    unlockCriteria: 'Entrar na plataforma na fase beta',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getUnlockedAchievements(): Achievement[] {
  return MOCK_ACHIEVEMENTS.filter((a) => a.unlockedAt !== undefined)
}

export function getRecentAchievements(withinDays = 7): Achievement[] {
  const cutoff = new Date(Date.now() - withinDays * 86_400_000)
  return MOCK_ACHIEVEMENTS.filter(
    (a) => a.unlockedAt !== undefined && a.unlockedAt > cutoff,
  )
}
