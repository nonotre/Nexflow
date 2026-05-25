'use client'

import { useState, useEffect } from 'react'

export type Role = 'manager' | 'collaborator'

export function useRole(): Role {
  const [role, setRole] = useState<Role>('collaborator')

  useEffect(() => {
    const update = () =>
      setRole(window.location.hash === '#admin' ? 'manager' : 'collaborator')
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  return role
}
