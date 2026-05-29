import { Project } from '@/lib/types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Redesign do Portal',
    teamSize: 5,
    assignedCards: 8,
    color: '#6366f1', // indigo
    priority: 'high',
    dueDate: '2025-07-15',
  },
  {
    id: 'proj-2',
    name: 'API de Integrações',
    teamSize: 3,
    assignedCards: 12,
    color: '#f59e0b', // amber
    priority: 'medium',
    dueDate: '2025-08-01',
  },
  {
    id: 'proj-3',
    name: 'App Mobile v2',
    teamSize: 6,
    assignedCards: 5,
    color: '#10b981', // emerald
    priority: 'high',
    dueDate: '2025-06-30',
  },
  {
    id: 'proj-4',
    name: 'Dashboard Analytics',
    teamSize: 4,
    assignedCards: 9,
    color: '#3b82f6', // blue
    priority: 'low',
    dueDate: '2025-09-10',
  },
  {
    id: 'proj-5',
    name: 'Automação de QA',
    teamSize: 2,
    assignedCards: 3,
    color: '#ec4899', // pink
    priority: 'medium',
  },
  {
    id: 'proj-6',
    name: 'Infraestrutura Cloud',
    teamSize: 3,
    assignedCards: 7,
    color: '#8b5cf6', // violet
    priority: 'low',
    dueDate: '2025-10-20',
  },
]
