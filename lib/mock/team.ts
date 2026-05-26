import type { TeamMember } from '@/lib/types'

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'u-1',
    name: 'Ana Souza',
    role: 'collaborator',
    seniority: 'senior',
    capacityStatus: 'busy',
    score: 2740,
    scoreTarget: 3000,
    activeCards: 3,
  },
  {
    id: 'u-2',
    name: 'Carlos Lima',
    role: 'collaborator',
    seniority: 'pleno',
    capacityStatus: 'available',
    score: 1180,
    scoreTarget: 1500,
    activeCards: 1,
  },
  {
    id: 'u-3',
    name: 'Mariana Costa',
    role: 'collaborator',
    seniority: 'junior',
    capacityStatus: 'overloaded',
    score: 620,
    scoreTarget: 1500,
    activeCards: 4,
  },
  {
    id: 'u-4',
    name: 'João Martins',
    role: 'collaborator',
    seniority: 'pleno',
    capacityStatus: 'busy',
    score: 1380,
    scoreTarget: 1500,
    activeCards: 2,
  },
  {
    id: 'u-5',
    name: 'Rafael Fernandes',
    role: 'collaborator',
    seniority: 'lead',
    capacityStatus: 'available',
    score: 4200,
    scoreTarget: 5000,
    activeCards: 2,
  },
  {
    id: 'u-6',
    name: 'Larissa Borges',
    role: 'collaborator',
    seniority: 'senior',
    capacityStatus: 'busy',
    score: 2980,
    scoreTarget: 3000,
    activeCards: 3,
  },
  {
    id: 'u-7',
    name: 'Paula Torres',
    role: 'collaborator',
    seniority: 'junior',
    capacityStatus: 'available',
    score: 430,
    scoreTarget: 1500,
    activeCards: 1,
  },
  {
    id: 'u-8',
    name: 'Diego Nunes',
    role: 'collaborator',
    seniority: 'pleno',
    capacityStatus: 'overloaded',
    score: 1050,
    scoreTarget: 1500,
    activeCards: 5,
  },
]

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

export const SENIORITY_LABELS: Record<string, string> = {
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  lead: 'Lead',
}

export const CAPACITY_CONFIG: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  available: {
    label: 'Disponível',
    dot: 'bg-emerald-500',
    badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  busy: {
    label: 'Ocupado',
    dot: 'bg-amber-500',
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  overloaded: {
    label: 'Sobrecarregado',
    dot: 'bg-red-500',
    badge: 'text-red-700 bg-red-50 border-red-200',
  },
}

/** Returns initials from a full name, e.g. "Ana Souza" → "AS" */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
