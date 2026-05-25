# Nexflow MVP — Spec de Implementação

## Contexto

Frontend-only em **Next.js 15+ + TypeScript + shadcn** (style `base-luma`, base color `stone`, light mode). Sem banco de dados — todos os dados são mockados em arquivos `.ts` estáticos. O escopo cobre as funcionalidades de **Alto Valor / Baixo Esforço** do effort-matrix, mais a fundação estrutural necessária para suportá-las.

> **Nota Next.js 15+:** `params` e `searchParams` são assíncronos (`Promise`), `cookies()` e `headers()` também. Seguir os padrões de `await params` em todas as rotas dinâmicas.

---

## Convenções Globais

### Role-switching via URL Hash

Para acelerar o desenvolvimento e testes sem autenticação real, qualquer rota aceita o sufixo `#admin` para simular o perfil **Gestor**. Sem o hash, o perfil é **Colaborador**.

- `/dashboard` → Colaborador
- `/dashboard#admin` → Gestor

Um hook centralizado `useRole()` em `hooks/use-role.ts` lê `window.location.hash` e retorna `'manager' | 'collaborator'`. Como o hash é client-side, componentes que dependem disso serão Client Components (requerem `'use client'`).

> **Hydration safety:** O estado inicial do hook deve ser `'collaborator'` (valor estável) para evitar mismatch entre SSR e client. O valor real do hash é lido dentro de `useEffect`.

### Mock Data

Cada tela terá seus próprios dados mockados definidos **no momento de implementar aquela tela** (conforme combinado). Os mocks ficam em `lib/mock/<nome-da-tela>.ts` e exportam constantes tipadas com interfaces TypeScript.

### Estrutura de Pastas Target

```
app/
  (auth)/
    login/page.tsx          ← já existe
    signup/page.tsx         ← já existe
  (app)/
    layout.tsx              ← shell com sidebar + topbar (Server Component)
    loading.tsx             ← skeleton global do shell
    error.tsx               ← error boundary do shell ('use client')
    not-found.tsx           ← 404 fallback para rotas desconhecidas
    dashboard/page.tsx
    projects/[id]/
      page.tsx              ← Kanban stub (async — await params)
    performance/page.tsx
    evaluation/page.tsx     ← 'use client' (guard de role via useEffect)
    ai-chat/                ← painel lateral (não uma rota dedicada)
components/
  ui/                       ← shadcn components
  layout/
    app-sidebar.tsx         ← 'use client'
    app-topbar.tsx          ← 'use client'
    ai-chat-panel.tsx       ← 'use client'
    chat-panel-provider.tsx ← Context provider (open/close state)
  dashboard/
    project-card.tsx
  performance/
    score-bar.tsx
    delivery-list.tsx
  evaluation/
    evaluation-form.tsx     ← 'use client'
hooks/
  use-role.ts               ← 'use client'
lib/
  mock/
    dashboard.ts
    performance.ts
    evaluation.ts
  types.ts                  ← interfaces compartilhadas
```

---

## Fase 0 — Fundação (bloqueante)

> Pré-requisito para todas as outras fases. Entrega o shell navegável do app.

### 0.1 — Tipos Compartilhados

**[NEW] `lib/types.ts`**
- Interface `User` (id, name, role, avatar, seniority, capacityStatus)
- Interface `Project` (id, name, teamSize, assignedCards, color)
- Interface `MockData` base para cada feature

### 0.2 — Hook de Role

**[NEW] `hooks/use-role.ts`** (`'use client'`)
- Estado inicial: `'collaborator'` (valor estável — evita hydration mismatch)
- Lê `window.location.hash` dentro de `useEffect` (nunca no nível do módulo)
- Escuta evento `hashchange` para reatividade
- Retorna `'manager' | 'collaborator'`
- Exporta também o tipo `Role`

```ts
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
```

### 0.3 — App Shell Layout

**[NEW] `app/(app)/layout.tsx`** (Server Component — sem `'use client'`)
- Layout raiz das telas autenticadas
- Renderiza `ChatPanelProvider` > `AppSidebar` + `AppTopbar` + `AiChatPanel`
- Passa `children` na área de conteúdo principal
- Usa o componente `Sidebar` do shadcn
- **Suspense obrigatório:** `AppSidebar` e `AppTopbar` são Client Components que usam `usePathname()`. Sem `<Suspense>`, rotas dinâmicas como `/projects/[id]` causam CSR bailout do layout inteiro.

```tsx
import { Suspense } from 'react'
import { ChatPanelProvider } from '@/components/layout/chat-panel-provider'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppTopbar }  from '@/components/layout/app-topbar'
import { AiChatPanel } from '@/components/layout/ai-chat-panel'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatPanelProvider>
      <div className="flex h-screen">
        <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebar />
        </Suspense>
        <div className="flex flex-col flex-1">
          <Suspense fallback={<TopbarSkeleton />}>
            <AppTopbar />
          </Suspense>
          <main>{children}</main>
        </div>
      </div>
      <AiChatPanel />
    </ChatPanelProvider>
  )
}
```

**[NEW] `components/layout/app-sidebar.tsx`** (`'use client'`)
- Links de navegação: Dashboard, Performance, Avaliação — **usar `<Link>` de `next/link`** (não `<a>`) para manter navegação SPA e preservar estado client como o hash `#admin`
- Ícones via `lucide-react`
- Avatar/nome do usuário mockado no rodapé
- Badge de role visível (Gestor / Colaborador) baseado em `useRole()`
- Itens exclusivos do Gestor ficam visíveis apenas com `role === 'manager'`

**[NEW] `components/layout/app-topbar.tsx`** (`'use client'`)
- Título da página atual (via `usePathname` — requer `'use client'`)
- Botão para abrir o painel de chat da IA (consome `ChatPanelContext`)
- Breadcrumb simples quando dentro de subpáginas

**[NEW] `components/layout/chat-panel-provider.tsx`** (`'use client'`)
- React Context que expõe `{ isOpen, setIsOpen }`
- Usado por `AppTopbar` (botão de abrir) e `AiChatPanel` (estado open/close)
- Evita prop drilling entre componentes irmãos no layout

**[NEW] `components/layout/ai-chat-panel.tsx`** (`'use client'`)
- `Sheet` do shadcn abrindo pela direita
- Estado open/close consumido via `ChatPanelContext`
- Corpo vazio com placeholder "IA em breve" por enquanto (implementado na Fase 2)

### 0.4 — Error / Loading Convention Files

**[NEW] `app/(app)/loading.tsx`**
- Skeleton do shell (sidebar + topbar outline) enquanto a página carrega

**[NEW] `app/(app)/error.tsx`** (`'use client'` — obrigatório)
- Error boundary padrão com botão "Tentar novamente" via `reset()`

**[NEW] `app/(app)/not-found.tsx`**
- Fallback 404 para rotas desconhecidas dentro do shell autenticado

**[NEW] `app/global-error.tsx`** (`'use client'` — obrigatório)
- Error boundary para erros no root layout (ex: provider ou import quebrado)
- Deve incluir tags `<html>` e `<body>` pois substitui o layout inteiro
- Botão "Tentar novamente" via `reset()`

### 0.5 — Página Home Redirect

**[MODIFY] `app/page.tsx`**
- Redirecionar `/` → `/dashboard` via `permanentRedirect()` (HTTP 308 — browsers cacheiam, evita round-trip repetido)

---

## Fase 1 — Quick Wins (sequencial após Fase 0)

### 1.1 — Dashboard Geral de Projetos

**Rota:** `/dashboard`

**Visão Colaborador:**
- Grid de cards de projeto (`ProjectCard`)
- Cada card: nome do projeto, cor identificadora, contador "X cards atribuídos", label da equipe
- Clicar no card → `/projects/[id]` (página stub com "Kanban em breve")

**Stub da rota dinâmica (`app/(app)/projects/[id]/page.tsx`):**
- `params` é `Promise<{ id: string }>` — deve ser tipado e awaited (Next.js 15+)

```tsx
type Props = { params: Promise<{ id: string }> }

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  return <p>Kanban em breve — projeto {id}</p>
}
```

**Visão Gestor (`#admin`):**
- Mesmos cards, mas com contador adicional: "X membros na equipe"
- Botão "Novo Projeto" (apenas visual, abre um toast "Em breve")

**Componentes novos:**
- `components/dashboard/project-card.tsx` — Card shadcn estilizado com borda colorida lateral
- `lib/mock/dashboard.ts` — Array de projetos mockados (definido na hora de implementar)

---

### 1.2 — Painel de Performance Pessoal

**Rota:** `/performance`

**Visão Colaborador (única — gestor não acessa esta rota):**
- **Score Geral:** `Progress` do shadcn com valor atual e valor-alvo. Label textual acima (ex: "Score: 1.240 / meta 1.500 pts")
- **Nível de Senioridade:** Badge/Label simples (ex: "Pleno")
- **Últimas Entregas:** Lista de 5 itens com nome do card, data de entrega e pontos ganhos. Usar `Table` ou lista de `Card`s do shadcn.

**Componentes novos:**
- `components/performance/score-bar.tsx`
- `components/performance/delivery-list.tsx`
- `lib/mock/performance.ts`

---

### 1.3 — Formulário de Avaliação (Gestor)

**Rota:** `/evaluation` (página dedicada, acessível apenas na visão `#admin`)

**Fluxo:**
1. Lista de cards concluídos aguardando avaliação (tabela simples com nome, responsável, data de entrega)
2. Ao clicar em "Avaliar" num card → abre os critérios daquele card
3. Gestor marca checkboxes dos critérios cumpridos
4. Botão "Confirmar Avaliação" → toast de sucesso com pontos atribuídos (mock)

**Componentes novos:**
- `components/evaluation/evaluation-form.tsx` (`'use client'`) — Formulário com `Checkbox`, `Button`, critérios mockados
- `lib/mock/evaluation.ts`

**Guard de role (client-side):** Como a role é derivada do hash (client-only), **não** usar `redirect()` do server. Usar `useEffect` + `router.replace()` dentro do componente:

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { useRole } from '@/hooks/use-role'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function EvaluationPage() {
  const role = useRole()
  const router = useRouter()

  useEffect(() => {
    if (role === 'collaborator') {
      toast.error('Acesso restrito')
      router.replace('/dashboard')
    }
  }, [role, router])

  if (role !== 'manager') return null // evita flash
  return <EvaluationContent />
}
```

> **Por quê não `redirect()`?** `redirect()` funciona em Server Components e Server Actions. Como a role vem do hash (browser-only), o guard precisa ser client-side.

---

## Fase 2 — Chat IA Simulado

> Após Fase 1 estar completa. Preenche o `AiChatPanel` criado na Fase 0.

**Localização:** Painel lateral (`Sheet`) que abre em qualquer tela via botão na topbar.

**Funcionalidades simuladas:**
- Campo de input de texto + botão enviar
- **Botões de sugestão rápida** (chips clicáveis): "Como melhorar meu score?", "Qual card fazer primeiro?", "Explique os critérios de avaliação"
- Ao enviar/clicar numa sugestão → resposta pré-fixada aparece após delay de 800ms (simula digitação)
- Histórico de mensagens persiste durante a sessão (estado local no componente, reset ao fechar)
- Diferença por role: sugestões rápidas do Gestor são diferentes das do Colaborador

**Componentes novos:**
- `components/layout/ai-chat-panel.tsx` (substituir placeholder da Fase 0)
- `lib/mock/ai-responses.ts` — Map de keyword → resposta simulada

---

## Open Questions

> **Q1 — Sidebar do shadcn:** O template `base-luma` já inclui o componente `Sidebar`? Preciso confirmar se ele já está instalado ou se precisa ser adicionado via `npx shadcn add sidebar`.

> ~~**Q2 — Rota `/evaluation` sem `#admin`:**~~ **Resolvido** — redirect client-side via `useEffect` + `router.replace('/dashboard')` com toast "Acesso restrito" (ver §1.3).

> **Q3 — Stub do Kanban:** Na Fase 1, ao clicar num projeto do dashboard ele vai para `/projects/[id]`. Essa rota deve ter uma tela stub ("em breve") ou é OK ficar como 404 por enquanto?

> **Q4 — Página `/performance` para Gestor:** Se o gestor acessar `/performance` (sem `#admin`), exibe normalmente como colaborador? Ou essa rota é exclusiva do colaborador e deve redirecionar o gestor para algum lugar?

---

## Verificação por Fase

| Fase | Critério de Conclusão |
|------|----------------------|
| 0 | Sidebar navega entre rotas, role muda com `#admin`, chat panel abre vazio, error/loading/not-found renderizam, sem hydration warnings no console |
| 1.1 | Dashboard renderiza cards, visão gestor mostra diferença visual, `/projects/[id]` mostra stub sem erro de params |
| 1.2 | Barra de score e lista de entregas renderizam com dados mock |
| 1.3 | Formulário lista cards, checkboxes funcionam, toast de sucesso aparece, acesso sem `#admin` redireciona com toast |
| 2 | Chat abre, sugestões rápidas disparam respostas com delay |
