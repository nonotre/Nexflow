import { Suspense } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { ChatPanelProvider } from '@/components/layout/chat-panel-provider'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppTopbar } from '@/components/layout/app-topbar'
import { AiChatPanel } from '@/components/layout/ai-chat-panel'
import { Skeleton } from '@/components/ui/skeleton'

function SidebarSkeleton() {
  return (
    <div className="flex h-full w-[220px] flex-col border-r p-3 gap-3">
      <Skeleton className="h-7 w-32" />
      <div className="flex flex-col gap-1 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  )
}

function TopbarSkeleton() {
  return (
    <div className="flex h-12 items-center gap-2 border-b px-4">
      <Skeleton className="h-6 w-6" />
      <Skeleton className="h-4 w-24 ml-2" />
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatPanelProvider>
      <SidebarProvider>
        <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebar />
        </Suspense>
        <SidebarInset>
          <Suspense fallback={<TopbarSkeleton />}>
            <AppTopbar />
          </Suspense>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
        <AiChatPanel />
      </SidebarProvider>
    </ChatPanelProvider>
  )
}
