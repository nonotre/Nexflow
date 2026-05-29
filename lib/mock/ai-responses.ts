import { Role } from '@/hooks/use-role'

// ---------------------------------------------------------------------------
// Quick-suggestion chips shown below the input area — role-aware
// ---------------------------------------------------------------------------

export const QUICK_SUGGESTIONS: Record<'manager' | 'collaborator', string[]> = {
  collaborator: [
    'Como melhorar meu score?',
    'Qual card fazer primeiro?',
    'Explique os critérios de avaliação',
    'Como subir de nível mais rápido?',
  ],
  manager: [
    'Como avaliar um card?',
    'Quais métricas observar na equipe?',
    'Como distribuir capacidade do time?',
    'Explique o sistema de pontuação',
  ],
}

// ---------------------------------------------------------------------------
// Response map — keyword → simulated response
// Matching is case-insensitive substring search over the user message
// ---------------------------------------------------------------------------

interface AiResponse {
  match: string[] // any substring that triggers this response
  text: string
}

export const AI_RESPONSE_MAP: AiResponse[] = [
  // --- Collaborator suggestions ---
  {
    match: ['melhorar meu score', 'score', 'pontuação', 'pontos'],
    text: `Para melhorar seu score, foque nos cards de maior prioridade da sprint atual. Entregas dentro do prazo valem +20% de bônus sobre os critérios cumpridos. Certifique-se de atender pelo menos 80% dos critérios antes de mover o card para "Concluído".`,
  },
  {
    match: ['qual card', 'card fazer primeiro', 'prioridade', 'ordem'],
    text: `A ordem recomendada é: (1) Cards com data de entrega mais próxima, (2) Cards com maior peso de pontuação, (3) Cards bloqueados por outros membros. Verifique a coluna "Urgente" no Kanban do seu projeto.`,
  },
  {
    match: ['critérios de avaliação', 'critérios', 'avaliação', 'criterios'],
    text: `Cada card possui critérios específicos definidos pelo gestor. Em geral, os principais são: ✅ Entrega no prazo, ✅ Qualidade do resultado, ✅ Comunicação durante o processo, ✅ Sem retrabalho necessário. O gestor marcará quais foram cumpridos.`,
  },
  {
    match: ['subir de nível', 'nível', 'senioridade', 'nivel', 'sênior'],
    text: `Para subir de nível, você precisa atingir a meta de score do seu nível atual. Júnior → Pleno requer 1.500 pts, Pleno → Sênior requer 3.000 pts acumulados nos últimos 3 meses. Entregas consistentes são mais valorizadas do que picos isolados.`,
  },
  // --- Manager suggestions ---
  {
    match: ['avaliar um card', 'como avaliar', 'avaliar card'],
    text: `Para avaliar um card: acesse a página de Avaliação, localize o card concluído na lista, clique em "Avaliar" e marque os critérios cumpridos. O sistema calcula a pontuação automaticamente e notifica o colaborador. Recomendo avaliar dentro de 48h após a entrega.`,
  },
  {
    match: ['métricas', 'metrica', 'métricas observar', 'observar'],
    text: `As principais métricas a acompanhar no time: 📊 Score médio da equipe, ⏱ Taxa de entrega no prazo, 🔁 Taxa de retrabalho, 📈 Evolução de senioridade por colaborador. Acesse o Dashboard para uma visão consolidada.`,
  },
  {
    match: ['distribuir capacidade', 'capacidade', 'distribuição', 'alocar'],
    text: `Distribua cards considerando o status de capacidade de cada membro (visível no Dashboard como 🟢 Disponível, 🟡 Médio, 🔴 Sobrecarregado). Evite alocar mais de 3 cards simultâneos para colaboradores Júnior e mais de 5 para Pleno/Sênior.`,
  },
  {
    match: ['sistema de pontuação', 'pontuação', 'pontos', 'sistema'],
    text: `O sistema de pontuação funciona assim: cada card tem um valor base (10–50 pts) definido pela complexidade. O valor final é multiplicado pela % de critérios cumpridos. Entregas no prazo ganham +20%, entregas atrasadas perdem -10% por dia. Gestores não acumulam pontos — apenas colaboradores.`,
  },
  // --- Generic fallback ---
  {
    match: ['oi', 'olá', 'ola', 'hello', 'hi', 'bom dia', 'boa tarde', 'boa noite'],
    text: `Olá! Sou o Nexflow Copilot. Posso te ajudar com dúvidas sobre score, avaliação de cards, critérios e métricas do time. Use as sugestões rápidas ou escreva sua pergunta abaixo!`,
  },
  {
    match: ['obrigado', 'obrigada', 'valeu', 'thanks'],
    text: `Fico feliz em ajudar! Se tiver mais dúvidas sobre o Nexflow, é só chamar. 🚀`,
  },
]

// ---------------------------------------------------------------------------
// Helper — find the best matching response for a given message
// ---------------------------------------------------------------------------

const FALLBACK_RESPONSE =
  `Não tenho uma resposta específica para isso ainda, mas posso ajudar com dúvidas sobre score, avaliação de cards, critérios e métricas. Tente uma das sugestões rápidas ou reformule sua pergunta!`

export function getAiResponse(message: string): string {
  const lower = message.toLowerCase()
  for (const entry of AI_RESPONSE_MAP) {
    if (entry.match.some((keyword) => lower.includes(keyword))) {
      return entry.text
    }
  }
  return FALLBACK_RESPONSE
}
