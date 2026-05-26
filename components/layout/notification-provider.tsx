'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import { useRole } from '@/hooks/use-role'
import { getNotificationsForRole } from '@/lib/mock/notifications'
import type { AppNotification } from '@/lib/types'

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface NotificationContextValue {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function NotificationProvider({ children }: { children: ReactNode }) {
  const role = useRole()
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    getNotificationsForRole(role),
  )

  // Re-initialize when role changes (e.g. toggling #admin)
  useEffect(() => {
    setNotifications(getNotificationsForRole(role))
  }, [role])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  )

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext)
  if (!ctx) {
    throw new Error('useNotifications must be used inside <NotificationProvider>')
  }
  return ctx
}
