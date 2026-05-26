export type CapacityStatus = 'available' | 'busy' | 'overloaded'
export type Seniority = 'junior' | 'pleno' | 'senior' | 'lead'
export type Priority = 'high' | 'medium' | 'low'
export type KanbanColumn = 'backlog' | 'in_progress' | 'in_review' | 'done'

export interface User {
  id: string
  name: string
  role: 'manager' | 'collaborator'
  avatar?: string
  seniority: Seniority
  capacityStatus: CapacityStatus
}

export interface Project {
  id: string
  name: string
  teamSize: number
  assignedCards: number
  color: string
}

export interface KanbanCard {
  id: string
  projectId: string
  title: string
  assignee: string // initials, e.g. "AS"
  assigneeName: string
  priority: Priority
  points: number
  column: KanbanColumn
}

export interface TeamMember extends User {
  score: number
  scoreTarget: number
  activeCards: number
}

export interface MockData<T> {
  data: T
  updatedAt: string
}
