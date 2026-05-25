### 1. Autenticação e Gestão de Usuários

**Tipos de Acesso**

* **Gestor:** Fixo por conta. Pode gerenciar múltiplos projetos/equipes. Tem poder de avaliação, distribuição de pontos e acesso aos painéis de produtividade global.
* **Colaborador:** Fixo por conta. Focado na execução, visualização do próprio desempenho e interação com seus quadros.

**Login e Cadastro**

* E-mail e Senha padrão.
* SSO (Single Sign-On): Google e Newflow.

**Perfil do Usuário**

* Informações básicas: Foto, Cargo, Projetos/Equipes, Senioridade.
* **Skills:** Habilidades técnicas mapeadas por níveis (ganhando XP ou subindo de nível conforme o tempo ou métricas alcançadas).
* **Status de Capacidade:** Indicador de carga de trabalho atual (Disponível, Sobrecarregado, Férias).
* **Contexto de Trabalho:** Assumido como remoto síncrono (mesmo fuso horário para a equipe).

---

### 2. Workspace e Gestão de Tarefas (Kanban)

**Painel Geral (Visão do Colaborador)**

* Hub central listando todos os projetos e equipes que o usuário faz parte.
* Métricas rápidas: Número de cards atribuídos, notificações pendentes do projeto.

**O Quadro Kanban (Projeto/Equipe)**

* Estrutura flexível: Criação de colunas, templates e automações.
* Propriedades dos Cards: Prioridade, datas (atribuição e entrega), responsáveis, tags personalizadas.
* Comunicação e Contexto: Área para anexos, links e comentários (que servirão de insumo para a leitura da IA).
* Mock de Integração: Nesta fase Front-end, as ações de integração externa (como links do GitHub ou Drive) serão apenas visuais/fictícias.

**Central de Notificações**
Categorizada para evitar poluição visual:

1. **Projetos/Equipes:** Menções em cards, novos cards atribuídos, prazos próximos.
2. **Performance:** Metas batidas, pontos recebidos, feedback de avaliações.
3. **Plataforma/IA:** Alertas proativos, insights gerados pelo sistema.

---

### 3. Motor de Performance e Avaliação

**Métricas e Pontuação**

* **Transparência:** O score geral e o histórico de entregas ficam visíveis para o colaborador. Os critérios e pesos de cada ação são públicos (ex: entregar card crítico no prazo vale peso 2), evitando ansiedade.
* **Tempo e Produtividade:** Calculado automaticamente pela diferença entre a "Data de Atribuição" e a "Data de Entrega" (sem necessidade de cronômetro manual).

**Avaliação Qualitativa pelo Gestor**

* O gestor define critérios específicos (ex: requisitos de documentação no card).
* Se o colaborador cumprir a exigência, o gestor valida e o sistema atribui os pontos correspondentes automaticamente, alimentando o score do usuário.

---

### 4. Inteligência Artificial (O Coração do Sistema)

A IA atua de duas formas: como Assistente Consultiva e como Agente Ativo.

**Para o Colaborador (Foco em Orientação e Execução)**

* **Agente Kanban:** Cria cards, sugere templates, formata descrições e move tarefas sob comando.
* **Guia de Performance:** Explica as regras de pontuação e responde como melhorar o score atual.
* **Organizador de Rotina:** Responde perguntas como *"Qual card devo fazer primeiro hoje?"* cruzando prioridades, prazos e dependências.
* **Leitura de Contexto:** Consegue ler links, anexos e comentários dentro dos cards para ajudar na execução da tarefa.
* **Coach Comportamental:** Analisa o histórico de pontos e faz abordagens amigáveis (ex: *"Notei que em dezembro sua pontuação caiu, precisa de ajuda com alguma sobrecarga?"*).

**Para o Gestor (Foco em Gestão e Estratégia)**

* **Agente de Automação:** Cria fluxos, colunas e distribui tarefas com base no nível das *Skills* dos colaboradores e na capacidade de trabalho de cada um.
* **Analista de Dados:** Responde a perguntas naturais sobre métricas (ex: *"Como está o nível de entrega no prazo do colaborador X?"*).
* **Geração de Insights Proativos:** Monitora padrões ocultos de forma contínua. Se notar que "Cards da Tag Design estão sempre atrasando na coluna de Revisão", a IA notifica o gestor e registra isso no painel de produtividade.

---

### 5. Painel de Análise de Produtividade (Exclusivo do Gestor)

* **Visão de Eficiência:** Relatórios de quanto tempo os cards levam para transitar entre colunas (*Lead Time* e *Cycle Time* baseados nas datas dos cards).
* **Alocação de Esforço:** Gráficos mostrando a proporção de trabalho de cada colaborador dividido por projeto.
* **Métricas Individuais:** Avaliação de comprometimento, qualidade das entregas, histórico de metas e evolução das *skills*.
* **Aba de Insights da IA:** Um histórico permanente de todos os alertas e padrões que a IA proativa identificou na equipe ao longo do tempo.
