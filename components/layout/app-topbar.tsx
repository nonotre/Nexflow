'use client'

import { usePathname } from 'next/navigation'
import { Bot, PanelRightOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { useChatPanel } from '@/components/layout/chat-panel-provider'
import { NotificationBell } from '@/components/layout/notification-bell'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/performance': 'Performance',
  '/evaluation': 'Avaliação',
  '/team': 'Equipe',
  '/achievements': 'Conquistas',
}

function getTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/projects/')) return 'Projeto'
  return 'Nexflow'
}

export function AppTopbar() {
  const pathname = usePathname()
  const { setIsOpen } = useChatPanel()

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <h1 className="flex-1 text-sm font-semibold">{getTitle(pathname)}</h1>
      <div className="flex items-center gap-1">
        <NotificationBell />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir assistente IA"
        >
          <Bot className="size-4" />
          <span className="hidden sm:inline text-xs">Assistente IA</span>
          <PanelRightOpen className="size-3.5" />
        </Button>
      </div>
    </header>
  )
}
