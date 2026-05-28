'use client'

import { useState, useEffect } from 'react'

export type Role = 'manager' | 'collaborator'

export function useRole(): Role {
  // Lazy initializer reads the hash synchronously on first client render,
  // preventing a flash where role is 'collaborator' before useEffect fires.
  const [role, setRole] = useState<Role>(() => {
    if (typeof window === 'undefined') return 'collaborator'
    return window.location.hash === '#admin' ? 'manager' : 'collaborator'
  })

  useEffect(() => {
    const update = () =>
      setRole(window.location.hash === '#admin' ? 'manager' : 'collaborator')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  return role
}
