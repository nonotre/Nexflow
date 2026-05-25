'use client'

import { Bot } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useChatPanel } from '@/components/layout/chat-panel-provider'

export function AiChatPanel() {
  const { isOpen, setIsOpen } = useChatPanel()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex w-[380px] flex-col gap-0 p-0 sm:w-[420px]">
        <SheetHeader className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Bot className="size-4" />
            </div>
            <div>
              <SheetTitle className="text-sm leading-tight">Assistente IA</SheetTitle>
              <SheetDescription className="text-xs">Nexflow Copilot</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">
          <Bot className="size-10 opacity-30" />
          <p className="text-sm font-medium">IA em breve</p>
          <p className="text-xs opacity-70">
            O assistente estará disponível na Fase 2 da implementação.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
