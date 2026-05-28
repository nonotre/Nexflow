import type { AppNotification } from '@/lib/types'
import type { Role } from '@/hooks/use-role'

// ---------------------------------------------------------------------------
// Helper to create dates relative to now
// ---------------------------------------------------------------------------

function minsAgo(n: number): Date {
  return new Date(Date.now() - n * 60_000)
}

function hoursAgo(n: number): Date {
  return new Date(Date.now() - n * 3_600_000)
}

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 86_400_000)
}

// ---------------------------------------------------------------------------
// Collaborator notifications
// ---------------------------------------------------------------------------

export const COLLABORATOR_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'cn-1',
    type: 'badge_unlocked',
    title: 'Nova conquista desbloqueada!',
    description: '🚀 Entregador Veloz — 3 entregas antes do prazo',
    read: false,
    createdAt: minsAgo(8),
    href: '/achievements',
  },
  {
    id: 'cn-2',
    type: 'score_milestone',
    title: 'Marco de score atingido',
    description: '🎉 Parabéns! Você ultrapassou 1.000 pontos neste mês.',
    read: false,
    createdAt: hoursAgo(2),
    href: '/performance',
  },
  {
    id: 'cn-3',
    type: 'card_moved',
    title: 'Card em revisão',
    description: '"Integração com Stripe" foi movido para Em Revisão pelo gestor.',
    read: false,
    createdAt: hoursAgo(5),
    href: '/projects/alpha',
  },
  {
    id: 'cn-4',
    type: 'badge_unlocked',
    title: 'Nova conquista desbloqueada!',
    description: '🎯 Primeira Entrega — bem-vindo ao Nexflow!',
    read: true,
    createdAt: daysAgo(2),
    href: '/achievements',
  },
  {
    id: 'cn-5',
    type: 'score_milestone',
    title: 'Novo nível desbloqueado',
    description: '📈 Você avançou para o nível Pleno! Continue assim.',
    read: true,
    createdAt: daysAgo(5),
    href: '/performance',
  },
]

// ---------------------------------------------------------------------------
// Manager notifications
// ---------------------------------------------------------------------------

export const MANAGER_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'mn-1',
    type: 'evaluation_pending',
    title: 'Avaliação pendente',
    description: '"API de Pagamentos" está concluído e aguarda sua avaliação.',
    read: false,
    createdAt: minsAgo(15),
    href: '/evaluation#admin',
  },
  {
    id: 'mn-2',
    type: 'team_alert',
    title: 'Membro sobrecarregado',
    description: 'Ana Silva está com 5 cards ativos — acima da capacidade recomendada.',
    read: false,
    createdAt: hoursAgo(1),
    href: '/team#admin',
  },
  {
    id: 'mn-3',
    type: 'evaluation_pending',
    title: 'Avaliação pendente',
    description: '"Redesign do Checkout" está concluído e aguarda sua avaliação.',
    read: false,
    createdAt: hoursAgo(3),
    href: '/evaluation#admin',
  },
  {
    id: 'mn-4',
    type: 'team_alert',
    title: 'Score da equipe caindo',
    description: 'A média de score da equipe caiu 12% esta semana.',
    read: true,
    createdAt: daysAgo(1),
    href: '/projects#admin',
  },
  {
    id: 'mn-5',
    type: 'evaluation_pending',
    title: 'Avaliação concluída',
    description: 'Você avaliou "Onboarding de Usuários" — 45 pts atribuídos.',
    read: true,
    createdAt: daysAgo(3),
    href: '/evaluation#admin',
  },
]

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

export function getNotificationsForRole(role: Role): AppNotification[] {
  return role === 'manager' ? MANAGER_NOTIFICATIONS : COLLABORATOR_NOTIFICATIONS
}
