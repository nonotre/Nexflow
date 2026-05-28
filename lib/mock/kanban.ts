import type { KanbanCard } from '@/lib/types'

// ---------------------------------------------------------------------------
// Card descriptions mock
// ---------------------------------------------------------------------------

export const CARD_DESCRIPTIONS: Record<string, string> = {
  'k-1-1':
    'Reformular completamente o layout da página inicial do portal, aplicando as novas diretrizes de marca. Inclui reestruturação do hero section, atualização dos blocos de conteúdo e otimização para dispositivos móveis. Deve seguir os novos tokens de design aprovados na sprint anterior.',
  'k-1-2':
    'Desenvolver um componente de header que se adapte corretamente a todas as breakpoints (mobile, tablet, desktop). Incluir suporte a menu hambúrguer, navegação por teclado e ARIA labels para acessibilidade.',
  'k-1-3':
    'Revisar e atualizar a paleta de cores do sistema de design para seguir o novo guia de identidade visual. Garantir contraste adequado (WCAG AA) em todos os componentes afetados.',
  'k-1-4':
    'Substituir a biblioteca de ícones atual por Lucide React em todos os componentes. Manter consistência visual e garantir que o bundle final não aumente significativamente.',
  'k-1-5':
    'Criar documentação técnica completa dos design tokens (cores, espaçamentos, tipografia, bordas) usando Storybook. Incluir exemplos de uso e guia de nomenclatura.',
  'k-2-1':
    'Implementar fluxo completo de autenticação OAuth 2.0 com suporte a Google, GitHub e Microsoft. Incluir refresh token, revogação e tratamento seguro de escopos.',
  'k-2-2':
    'Criar endpoint REST para recebimento e despacho de webhooks de terceiros. Deve incluir validação de assinatura HMAC, retry automático com backoff exponencial e log de eventos.',
  'k-2-3':
    'Escrever documentação OpenAPI 3.1 completa para todos os endpoints da API de integrações. Incluir exemplos de request/response, códigos de erro e guia de autenticação.',
  'k-2-4':
    'Implementar rate limiting por API key com limites configuráveis por plano. Adicionar headers de quota (X-RateLimit-*) e throttling suave com retry-after.',
  'k-3-1':
    'Criar fluxo de onboarding de 4 etapas para novos usuários do app mobile. Incluir animações de entrada, skip opcional e persistência do estado de conclusão.',
  'k-3-2':
    'Integrar push notifications via FCM (Android) e APNs (iOS). Implementar opt-in, preferências de notificação por categoria e deep links a partir das notificações.',
  'k-3-3':
    'Criar e implementar animações de transição entre telas usando Reanimated 3. Garantir que as animações sejam fluídas (60fps) e respeitam a preferência "Reduzir movimento" do sistema.',
  'k-3-4':
    'Adicionar suporte completo ao modo escuro no app, seguindo as diretrizes de design system. Detectar preferência do sistema e permitir override manual pelo usuário nas configurações.',
  'k-4-1':
    'Desenvolver gráfico de funil interativo mostrando as etapas de conversão do usuário. Incluir comparativo com período anterior, tooltips detalhados e export como imagem.',
  'k-4-2':
    'Adicionar funcionalidade de exportação de qualquer tabela do dashboard para CSV e XLSX. Respeitar filtros ativos e incluir cabeçalhos localizados.',
  'k-4-3':
    'Criar componente de filtro de data com suporte a ranges predefinidos (hoje, 7d, 30d, trimestre, ano) e seleção customizada via date picker. Persistir filtro na URL.',
  'k-4-4':
    'Criar widgets de KPI que atualizam em tempo real via WebSocket. Exibir valor atual, variação percentual e mini-sparkline dos últimos 24h.',
  'k-5-1':
    'Configurar pipeline completo de testes E2E usando Playwright. Incluir testes de fluxos críticos (login, checkout, perfil), geração de relatório HTML e integração com CI.',
  'k-5-2':
    'Automatizar a geração de relatório de cobertura de testes após cada build. Integrar com SonarCloud para histórico e exibir badge no README.',
  'k-5-3':
    'Configurar workflow no GitHub Actions para rodar a suíte completa de testes a cada PR. Incluir cache de dependências, paralelização de jobs e notificação no Slack em caso de falha.',
  'k-6-1':
    'Migrar todos os serviços da infraestrutura atual para clusters Kubernetes na AWS (EKS). Incluir configuração de HPA, PDB, namespaces por ambiente e GitOps com ArgoCD.',
  'k-6-2':
    'Configurar stack de observabilidade com Grafana + Prometheus + Loki. Criar dashboards para SLOs de latência, disponibilidade e saturação de recursos.',
  'k-6-3':
    'Configurar alertas de uptime para todos os endpoints críticos usando Grafana OnCall. Definir SLOs, janelas de manutenção e escalonamento de on-call.',
  'k-6-4':
    'Implementar backup automatizado diário do banco de dados PostgreSQL para S3 com retenção de 30 dias. Incluir restauração testada mensalmente e monitoramento de falhas.',
}

// ---------------------------------------------------------------------------
// Card comments mock
// ---------------------------------------------------------------------------

export interface CardComment {
  id: string
  cardId: string
  author: string
  authorInitials: string
  content: string
  createdAt: string // ISO date string
}

export const CARD_COMMENTS: CardComment[] = [
  {
    id: 'c-1-1-1',
    cardId: 'k-1-1',
    author: 'Carlos Lima',
    authorInitials: 'CL',
    content: 'Precisamos alinhar com o time de marketing antes de finalizar o hero section.',
    createdAt: '2025-06-10T09:15:00Z',
  },
  {
    id: 'c-1-1-2',
    cardId: 'k-1-1',
    author: 'Ana Souza',
    authorInitials: 'AS',
    content: 'Já entrei em contato com a Beatriz do marketing, reunião marcada para sexta.',
    createdAt: '2025-06-10T11:42:00Z',
  },
  {
    id: 'c-1-1-3',
    cardId: 'k-1-1',
    author: 'Mariana Costa',
    authorInitials: 'MC',
    content: 'Lembrar de validar o layout no Safari iOS, tivemos problemas na última sprint.',
    createdAt: '2025-06-11T08:30:00Z',
  },
  {
    id: 'c-2-2-1',
    cardId: 'k-2-2',
    author: 'Rafael Fernandes',
    authorInitials: 'RF',
    content: 'Recomendo usar hmac-sha256 para validação de payload. Já temos utilitário no shared/crypto.',
    createdAt: '2025-06-08T14:00:00Z',
  },
  {
    id: 'c-2-2-2',
    cardId: 'k-2-2',
    author: 'Larissa Borges',
    authorInitials: 'LB',
    content: 'Perfeito! Vou usar isso. Alguma referência de implementação?',
    createdAt: '2025-06-08T15:20:00Z',
  },
  {
    id: 'c-2-2-3',
    cardId: 'k-2-2',
    author: 'Rafael Fernandes',
    authorInitials: 'RF',
    content: 'Sim, veja o PR #312 que fiz para o Stripe integration — mesmo padrão.',
    createdAt: '2025-06-08T15:35:00Z',
  },
  {
    id: 'c-3-1-1',
    cardId: 'k-3-1',
    author: 'Diego Nunes',
    authorInitials: 'DN',
    content: 'O fluxo de onboarding está muito bom! Testei no Android e ficou fluído.',
    createdAt: '2025-06-12T10:00:00Z',
  },
  {
    id: 'c-3-1-2',
    cardId: 'k-3-1',
    author: 'Paula Torres',
    authorInitials: 'PT',
    content: 'Obrigada! No iOS ainda estou ajustando o safe area no último step.',
    createdAt: '2025-06-12T10:45:00Z',
  },
  {
    id: 'c-4-1-1',
    cardId: 'k-4-1',
    author: 'Bruno Vieira',
    authorInitials: 'BV',
    content: 'Qual biblioteca de gráficos vamos usar? Recharts ou Victory?',
    createdAt: '2025-06-09T13:00:00Z',
  },
  {
    id: 'c-4-1-2',
    cardId: 'k-4-1',
    author: 'Camila Melo',
    authorInitials: 'CM',
    content: 'Vamos manter Recharts — já está no projeto e tem boa customização.',
    createdAt: '2025-06-09T13:30:00Z',
  },
  {
    id: 'c-5-1-1',
    cardId: 'k-5-1',
    author: 'Isabela Gomes',
    authorInitials: 'IG',
    content: 'Precisamos definir quais fluxos são críticos para priorizar os testes.',
    createdAt: '2025-06-07T11:00:00Z',
  },
  {
    id: 'c-5-1-2',
    cardId: 'k-5-1',
    author: 'Felipe Santos',
    authorInitials: 'FS',
    content: 'Login, cadastro, checkout e edição de perfil. Mais algum que você veja como crítico?',
    createdAt: '2025-06-07T11:30:00Z',
  },
  {
    id: 'c-6-1-1',
    cardId: 'k-6-1',
    author: 'Natália Alves',
    authorInitials: 'NA',
    content: 'Já finalizei os manifestos do namespace de staging. Posso fazer o deploy para validação?',
    createdAt: '2025-06-13T09:00:00Z',
  },
  {
    id: 'c-6-1-2',
    cardId: 'k-6-1',
    author: 'Thiago Ramos',
    authorInitials: 'TR',
    content: 'Pode sim! Me avisa quando subir que faço a validação de rede.',
    createdAt: '2025-06-13T09:20:00Z',
  },
]

export function getCommentsByCard(cardId: string): CardComment[] {
  return CARD_COMMENTS.filter((c) => c.cardId === cardId)
}

// ---------------------------------------------------------------------------
// Card due dates mock
// ---------------------------------------------------------------------------

export const CARD_DUE_DATES: Record<string, string> = {
  'k-1-1': '2025-06-30',
  'k-1-2': '2025-06-25',
  'k-1-3': '2025-07-15',
  'k-1-4': '2025-06-10',
  'k-1-5': '2025-07-20',
  'k-2-1': '2025-05-30',
  'k-2-2': '2025-06-28',
  'k-2-3': '2025-07-10',
  'k-2-4': '2025-06-22',
  'k-3-1': '2025-06-20',
  'k-3-2': '2025-07-05',
  'k-3-3': '2025-06-01',
  'k-3-4': '2025-06-18',
  'k-4-1': '2025-07-01',
  'k-4-2': '2025-06-15',
  'k-4-3': '2025-07-12',
  'k-4-4': '2025-06-29',
  'k-5-1': '2025-07-08',
  'k-5-2': '2025-07-18',
  'k-5-3': '2025-06-05',
  'k-6-1': '2025-07-25',
  'k-6-2': '2025-07-03',
  'k-6-3': '2025-07-14',
  'k-6-4': '2025-06-08',
}

// ---------------------------------------------------------------------------
// Cards data
// ---------------------------------------------------------------------------

export const MOCK_KANBAN_CARDS: KanbanCard[] = [
  // ---- proj-1: Redesign do Portal ----
  {
    id: 'k-1-1',
    projectId: 'proj-1',
    title: 'Redesign da página inicial',
    assignee: 'AS',
    assigneeName: 'Ana Souza',
    priority: 'high',
    points: 50,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-1-1'],
    dueDate: CARD_DUE_DATES['k-1-1'],
  },
  {
    id: 'k-1-2',
    projectId: 'proj-1',
    title: 'Criar componente de header responsivo',
    assignee: 'CL',
    assigneeName: 'Carlos Lima',
    priority: 'medium',
    points: 30,
    column: 'in_review',
    description: CARD_DESCRIPTIONS['k-1-2'],
    dueDate: CARD_DUE_DATES['k-1-2'],
  },
  {
    id: 'k-1-3',
    projectId: 'proj-1',
    title: 'Atualizar paleta de cores global',
    assignee: 'MC',
    assigneeName: 'Mariana Costa',
    priority: 'low',
    points: 20,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-1-3'],
    dueDate: CARD_DUE_DATES['k-1-3'],
  },
  {
    id: 'k-1-4',
    projectId: 'proj-1',
    title: 'Migrar ícones para Lucide',
    assignee: 'JM',
    assigneeName: 'João Martins',
    priority: 'low',
    points: 15,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-1-4'],
    dueDate: CARD_DUE_DATES['k-1-4'],
  },
  {
    id: 'k-1-5',
    projectId: 'proj-1',
    title: 'Documentar design tokens',
    assignee: 'AS',
    assigneeName: 'Ana Souza',
    priority: 'medium',
    points: 25,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-1-5'],
    dueDate: CARD_DUE_DATES['k-1-5'],
  },

  // ---- proj-2: API de Integrações ----
  {
    id: 'k-2-1',
    projectId: 'proj-2',
    title: 'Implementar autenticação OAuth 2.0',
    assignee: 'RF',
    assigneeName: 'Rafael Fernandes',
    priority: 'high',
    points: 50,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-2-1'],
    dueDate: CARD_DUE_DATES['k-2-1'],
  },
  {
    id: 'k-2-2',
    projectId: 'proj-2',
    title: 'Endpoint de webhooks',
    assignee: 'LB',
    assigneeName: 'Larissa Borges',
    priority: 'high',
    points: 40,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-2-2'],
    dueDate: CARD_DUE_DATES['k-2-2'],
  },
  {
    id: 'k-2-3',
    projectId: 'proj-2',
    title: 'Documentação OpenAPI',
    assignee: 'RF',
    assigneeName: 'Rafael Fernandes',
    priority: 'medium',
    points: 20,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-2-3'],
    dueDate: CARD_DUE_DATES['k-2-3'],
  },
  {
    id: 'k-2-4',
    projectId: 'proj-2',
    title: 'Rate limiting e throttling',
    assignee: 'LB',
    assigneeName: 'Larissa Borges',
    priority: 'high',
    points: 45,
    column: 'in_review',
    description: CARD_DESCRIPTIONS['k-2-4'],
    dueDate: CARD_DUE_DATES['k-2-4'],
  },

  // ---- proj-3: App Mobile v2 ----
  {
    id: 'k-3-1',
    projectId: 'proj-3',
    title: 'Tela de onboarding',
    assignee: 'PT',
    assigneeName: 'Paula Torres',
    priority: 'high',
    points: 40,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-3-1'],
    dueDate: CARD_DUE_DATES['k-3-1'],
  },
  {
    id: 'k-3-2',
    projectId: 'proj-3',
    title: 'Push notifications',
    assignee: 'DN',
    assigneeName: 'Diego Nunes',
    priority: 'medium',
    points: 35,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-3-2'],
    dueDate: CARD_DUE_DATES['k-3-2'],
  },
  {
    id: 'k-3-3',
    projectId: 'proj-3',
    title: 'Animações de transição',
    assignee: 'PT',
    assigneeName: 'Paula Torres',
    priority: 'low',
    points: 20,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-3-3'],
    dueDate: CARD_DUE_DATES['k-3-3'],
  },
  {
    id: 'k-3-4',
    projectId: 'proj-3',
    title: 'Suporte a modo escuro',
    assignee: 'DN',
    assigneeName: 'Diego Nunes',
    priority: 'medium',
    points: 30,
    column: 'in_review',
    description: CARD_DESCRIPTIONS['k-3-4'],
    dueDate: CARD_DUE_DATES['k-3-4'],
  },

  // ---- proj-4: Dashboard Analytics ----
  {
    id: 'k-4-1',
    projectId: 'proj-4',
    title: 'Gráfico de funil de conversão',
    assignee: 'CM',
    assigneeName: 'Camila Melo',
    priority: 'high',
    points: 50,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-4-1'],
    dueDate: CARD_DUE_DATES['k-4-1'],
  },
  {
    id: 'k-4-2',
    projectId: 'proj-4',
    title: 'Exportação para CSV',
    assignee: 'BV',
    assigneeName: 'Bruno Vieira',
    priority: 'medium',
    points: 25,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-4-2'],
    dueDate: CARD_DUE_DATES['k-4-2'],
  },
  {
    id: 'k-4-3',
    projectId: 'proj-4',
    title: 'Filtros por período de data',
    assignee: 'CM',
    assigneeName: 'Camila Melo',
    priority: 'medium',
    points: 30,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-4-3'],
    dueDate: CARD_DUE_DATES['k-4-3'],
  },
  {
    id: 'k-4-4',
    projectId: 'proj-4',
    title: 'Widget de KPIs em tempo real',
    assignee: 'BV',
    assigneeName: 'Bruno Vieira',
    priority: 'high',
    points: 45,
    column: 'in_review',
    description: CARD_DESCRIPTIONS['k-4-4'],
    dueDate: CARD_DUE_DATES['k-4-4'],
  },

  // ---- proj-5: Automação de QA ----
  {
    id: 'k-5-1',
    projectId: 'proj-5',
    title: 'Pipeline de testes E2E',
    assignee: 'FS',
    assigneeName: 'Felipe Santos',
    priority: 'high',
    points: 50,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-5-1'],
    dueDate: CARD_DUE_DATES['k-5-1'],
  },
  {
    id: 'k-5-2',
    projectId: 'proj-5',
    title: 'Relatório de cobertura automático',
    assignee: 'FS',
    assigneeName: 'Felipe Santos',
    priority: 'medium',
    points: 30,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-5-2'],
    dueDate: CARD_DUE_DATES['k-5-2'],
  },
  {
    id: 'k-5-3',
    projectId: 'proj-5',
    title: 'Integração com GitHub Actions',
    assignee: 'IG',
    assigneeName: 'Isabela Gomes',
    priority: 'high',
    points: 40,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-5-3'],
    dueDate: CARD_DUE_DATES['k-5-3'],
  },

  // ---- proj-6: Infraestrutura Cloud ----
  {
    id: 'k-6-1',
    projectId: 'proj-6',
    title: 'Migração para Kubernetes',
    assignee: 'TR',
    assigneeName: 'Thiago Ramos',
    priority: 'high',
    points: 50,
    column: 'in_review',
    description: CARD_DESCRIPTIONS['k-6-1'],
    dueDate: CARD_DUE_DATES['k-6-1'],
  },
  {
    id: 'k-6-2',
    projectId: 'proj-6',
    title: 'Setup de monitoramento com Grafana',
    assignee: 'NA',
    assigneeName: 'Natália Alves',
    priority: 'medium',
    points: 35,
    column: 'in_progress',
    description: CARD_DESCRIPTIONS['k-6-2'],
    dueDate: CARD_DUE_DATES['k-6-2'],
  },
  {
    id: 'k-6-3',
    projectId: 'proj-6',
    title: 'Configurar alertas de uptime',
    assignee: 'TR',
    assigneeName: 'Thiago Ramos',
    priority: 'medium',
    points: 25,
    column: 'backlog',
    description: CARD_DESCRIPTIONS['k-6-3'],
    dueDate: CARD_DUE_DATES['k-6-3'],
  },
  {
    id: 'k-6-4',
    projectId: 'proj-6',
    title: 'Backup automatizado do banco',
    assignee: 'NA',
    assigneeName: 'Natália Alves',
    priority: 'low',
    points: 20,
    column: 'done',
    description: CARD_DESCRIPTIONS['k-6-4'],
    dueDate: CARD_DUE_DATES['k-6-4'],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCardsByProject(projectId: string): KanbanCard[] {
  return MOCK_KANBAN_CARDS.filter((c) => c.projectId === projectId)
}

export const COLUMN_LABELS: Record<string, string> = {
  backlog: 'Backlog',
  in_progress: 'Em Progresso',
  in_review: 'Em Revisão',
  done: 'Concluído',
}

export const COLUMN_ORDER: string[] = ['backlog', 'in_progress', 'in_review', 'done']
