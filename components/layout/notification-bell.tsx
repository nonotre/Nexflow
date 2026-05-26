'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useNotifications } from '@/components/layout/notification-provider'
import type { AppNotification, NotificationType } from '@/lib/types'

// ---------------------------------------------------------------------------
// Icon map for notification types
// ---------------------------------------------------------------------------

const TYPE_ICON: Record<NotificationType, string> = {
  evaluation_pending: '📋',
  score_milestone: '🎉',
  badge_unlocked: '🏆',
  card_moved: '📌',
  team_alert: '⚠️',
}

// ---------------------------------------------------------------------------
// Relative time helper
// ---------------------------------------------------------------------------

function relativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 1) return 'agora mesmo'
  if (diffMins < 60) return `há ${diffMins} min`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `há ${diffHours}h`
  const diffDays = Math.floor(diffHours / 24)
  return `há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`
}

// ---------------------------------------------------------------------------
// Single notification item
// ---------------------------------------------------------------------------

interface NotificationItemProps {
  notification: AppNotification
  onRead: (id: string) => void
  onNavigate: (href?: string, id?: string) => void
}

function NotificationItem({ notification, onRead, onNavigate }: NotificationItemProps) {
  const { id, type, title, description, read, createdAt, href } = notification

  const handleClick = useCallback(() => {
    onNavigate(href, id)
  }, [href, id, onNavigate])

  return (
    <button
      onClick={handleClick}
      className={`group w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent ${
        !read ? 'bg-accent/40' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Type icon */}
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base transition-opacity ${
            read ? 'opacity-50' : ''
          }`}
          style={{ fontSize: '1rem' }}
        >
          {TYPE_ICON[type]}
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-xs font-semibold leading-snug ${
                read ? 'text-muted-foreground' : 'text-foreground'
              }`}
            >
              {title}
            </p>
            {/* Unread dot */}
            {!read && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground line-clamp-2">
            {description}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground/60">
            {relativeTime(createdAt)}
          </p>
        </div>

        {/* Navigate arrow */}
        {href && (
          <ExternalLink className="mt-1 size-3 shrink-0 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications()
  const router = useRouter()

  const handleNavigate = useCallback(
    (href?: string, id?: string) => {
      if (id) markAsRead(id)
      if (href) router.push(href)
    },
    [markAsRead, router],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground"
          aria-label={`Notificações${unreadCount > 0 ? ` — ${unreadCount} não lidas` : ''}`}
          id="notification-bell-trigger"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground"
              aria-hidden
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[340px] p-0"
        id="notification-popover"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Notificações</p>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-[11px] text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
              id="mark-all-read-btn"
            >
              <CheckCheck className="size-3.5" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {/* List */}
        <ScrollArea className="max-h-[360px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <Bell className="size-8 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">
                Nenhuma notificação
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 p-2">
              {notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onRead={markAsRead}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {unreadCount === 0 && notifications.length > 0 && (
          <div className="border-t px-4 py-2 text-center">
            <p className="text-[11px] text-muted-foreground">
              Todas as notificações foram lidas ✓
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
