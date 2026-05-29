'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, X, Sparkles, RotateCcw } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useChatPanel } from '@/components/layout/chat-panel-provider'
import { useRole } from '@/hooks/use-role'
import { QUICK_SUGGESTIONS, getAiResponse } from '@/lib/mock/ai-responses'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-3.5" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-3.5" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-muted text-foreground'
        }`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        <p
          className={`mt-1 text-[10px] ${
            isUser ? 'text-primary-foreground/60' : 'text-muted-foreground/60'
          }`}
        >
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Welcome screen shown before any message
// ---------------------------------------------------------------------------

interface WelcomeScreenProps {
  role: 'manager' | 'collaborator'
  onSuggestionClick: (text: string) => void
}

function WelcomeScreen({ role, onSuggestionClick }: WelcomeScreenProps) {
  const suggestions = QUICK_SUGGESTIONS[role]

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-8">
      {/* Quick suggestions */}
      <div className="flex w-full flex-col gap-2">
        <p className="mb-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
          Sugestões
        </p>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AiChatPanel() {
  const { isOpen, setIsOpen } = useChatPanel()
  const role = useRole()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Reset history when panel closes
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (!open) {
        // Delay reset so animation completes first
        setTimeout(() => {
          setMessages([])
          setInput('')
          setIsTyping(false)
        }, 300)
      }
    },
    [setIsOpen],
  )

  // Send a message (user text → simulated AI reply)
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      // Simulate 800ms typing delay
      setTimeout(() => {
        const responseText = getAiResponse(trimmed)
        const assistantMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      }, 800)
    },
    [isTyping],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      sendMessage(input)
    },
    [input, sendMessage],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage(input)
      }
    },
    [input, sendMessage],
  )

  const handleReset = useCallback(() => {
    setMessages([])
    setInput('')
    setIsTyping(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const hasMessages = messages.length > 0

  // Defer rendering until role is resolved on the client (avoids hydration mismatch)
  if (!role) return null

  const resolvedRole = role

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[380px] flex-col gap-0 p-0 sm:w-[420px]"
      >
        {/* ---- Header ---- */}
        <SheetHeader className="flex-row items-center justify-between border-b px-4 py-3 space-y-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>
            <div>
              <SheetTitle className="text-sm leading-tight">Assistente IA</SheetTitle>
              <p className="text-[11px] text-muted-foreground">Nexflow Copilot</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {hasMessages && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground"
                onClick={handleReset}
                title="Reiniciar conversa"
                aria-label="Reiniciar conversa"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={() => handleOpenChange(false)}
              title="Fechar"
              aria-label="Fechar painel"
            >
              <X className="size-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* ---- Message area ---- */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain">
            {!hasMessages ? (
              <WelcomeScreen role={resolvedRole} onSuggestionClick={sendMessage} />
            ) : (
              <div className="flex flex-col gap-3 px-4 py-4">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick suggestions — shown as chips after first message */}
          {hasMessages && !isTyping && (
            <div className="border-t px-4 py-2">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">
                Sugestões rápidas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_SUGGESTIONS[resolvedRole].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-[0.97]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ---- Input area ---- */}
          <div className="border-t px-4 py-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                ref={inputRef}
                id="ai-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva uma mensagem…"
                disabled={isTyping}
                className="h-9 flex-1 rounded-xl text-sm"
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-xl"
                disabled={!input.trim() || isTyping}
                aria-label="Enviar mensagem"
              >
                <Send className="size-4" />
              </Button>
            </form>
            <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
              Respostas simuladas · Fase 2 do Nexflow MVP
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
