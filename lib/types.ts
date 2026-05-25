export type CapacityStatus = 'available' | 'busy' | 'overloaded'
export type Seniority = 'junior' | 'pleno' | 'senior' | 'lead'

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

export interface MockData<T> {
  data: T
  updatedAt: string
}
