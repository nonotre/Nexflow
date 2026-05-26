'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  TrendingUp,
  ClipboardCheck,
  Users,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useRole } from '@/hooks/use-role'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/performance', label: 'Performance', icon: TrendingUp },
]

const MANAGER_NAV_ITEMS = [
  { href: '/evaluation#admin', label: 'Avaliação', icon: ClipboardCheck },
  { href: '/team#admin', label: 'Equipe', icon: Users },
]

const MOCK_USER = {
  name: 'João Martins',
  avatar: '',
  initials: 'JM',
}

export function AppSidebar() {
  const pathname = usePathname()
  const role = useRole()

  const isActive = (href: string) => pathname === href.replace(/#.*$/, '')

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            N
          </div>
          <span className="font-semibold text-sm">Nexflow</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    isActive={isActive(href)}
                    render={<Link href={href} />}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {role === 'manager' &&
                MANAGER_NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      isActive={isActive(href)}
                      render={<Link href={href} />}
                    >
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
            <AvatarFallback className="text-xs">{MOCK_USER.initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium leading-tight">
              {MOCK_USER.name}
            </span>
            <Badge
              variant={role === 'manager' ? 'default' : 'secondary'}
              className="mt-0.5 w-fit text-[10px] px-1.5 py-0"
            >
              {role === 'manager' ? 'Gestor' : 'Colaborador'}
            </Badge>
          </div>
          <button
            title="Sair"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
