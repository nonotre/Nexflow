'use client'

import React, { createContext, useContext, useState } from 'react'

interface ChatPanelContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ChatPanelContext = createContext<ChatPanelContextValue | null>(null)

export function ChatPanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ChatPanelContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatPanelContext.Provider>
  )
}

export function useChatPanel(): ChatPanelContextValue {
  const ctx = useContext(ChatPanelContext)
  if (!ctx) throw new Error('useChatPanel must be used within ChatPanelProvider')
  return ctx
}
