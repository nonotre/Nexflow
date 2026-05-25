### 0. Critério de Valor e Esforço

* **Valor:** O impacto que a funcionalidade tem para validar a dor central que seu sistema resolve: *A união de gestão de tarefas (Kanban) com clareza de performance e apoio da IA.* Se isso faz o usuário entender o produto imediatamente, tem Alto Valor.
* **Esforço:** O tempo e a complexidade técnica para desenvolver no Front-end. Isso inclui lidar com gerenciamento de estados complexos (como drag-and-drop), configuração de bibliotecas de gráficos de dados, e a lógica simulada (mock) das interações com a IA.

---

### 1. Alto Valor e Baixo Esforço (Quick Wins - Faça Primeiro)

*Estas são as funcionalidades que dão cara ao projeto rapidamente e provam o conceito sem exigir semanas de código complexo.*

* **Dashboard Geral de Projetos:** Uma tela limpa com cards simples listando as equipes/projetos do colaborador e contadores estáticos (ex: "5 cards atribuídos").
* **Interface de Chat da IA (Modo Consultivo):** A tela do chat em si (estilo ChatGPT ou painel lateral). Como vamos usar dados fictícios, é fácil criar botões de respostas rápidas simulando a IA respondendo coisas como "Como melhorar minha pontuação" ou explicando os pesos das métricas.
* **Painel de Performance Pessoal (Colaborador):** Uma tela estática que mostra a barra de progresso do score geral, o nível de senioridade e uma lista simples de "Últimas entregas realizadas".
* **Formulário de Avaliação (Gestor):** Uma tela/modal simples onde o gestor visualiza um card concluído, dá o check (ex: "Documentação aprovada") e clica em enviar para computar os pontos fictícios.

---

### 2. Alto Valor e Alto Esforço (Core do Produto - Planeje Bem)

*Aqui está o coração do seu sistema. Sem isso, o produto não existe, mas vai dar trabalho montar a lógica de interface.*

* **O Quadro Kanban Interativo (Drag and Drop):** Criar a interface onde o usuário consegue arrastar cards entre colunas, reorganizar a ordem, abrir modais detalhados e o front-end atualizar esse estado sem quebrar a tela.
* **Ação Agente da IA na Interface:** O usuário digitar no chat "Crie um card para a logo na coluna Fazendo" e o front-end precisar ler esse comando simulado e *fazer o card aparecer na tela sozinho*, atualizando o estado do Kanban.
* **Dashboard de Análise de Produtividade (Gestor):** Integração com bibliotecas de visualização de dados (como *Recharts* ou *Chart.js*) para renderizar gráficos reais baseados nos seus JSONs fictícios, mostrando *Lead Time* (tempo das colunas) e alocação de esforço.

---

### 3. Baixo Valor e Baixo Esforço (Tarefas de Preenchimento)

*Coisas fáceis de fazer, mas que não mudam a vida do usuário. Deixe para quando precisar de uma pausa mental das tarefas difíceis.*

* **Edição Básica de Perfil:** Formulários para alterar foto, nome e fuso horário.
* **Filtros e Ordenação de Listas:** Um botão para ordenar os projetos por "A-Z" ou "Mais recentes".
* **Alertas Visuais Simples (Toasts):** As notificações de sistema que pipocam na tela ("Card atualizado com sucesso", "Pontos recebidos!").

---

### 4. Baixo Valor e Alto Esforço (Evite no MVP)

*Funcionalidades que dão muita dor de cabeça para codar no front e agregam pouco para provar que a sua ideia principal funciona.*

* **Telas de Configuração Granular de Permissões:** Uma interface complexa cheia de *checkboxes* para o gestor definir minuciosamente quem pode ver o quê (ex: "Pode editar título, mas não pode deletar comentário"). Assuma permissões absolutas por enquanto.
* **Timeline Interativa de Histórico do Card:** Uma interface complexa rastreando absolutamente tudo (ex: "João moveu de A para B às 14h, Maria editou o título às 15h"). Um log de texto simples resolve isso, se necessário.
* **Gamificação Visual Extrema:** Fazer animações complexas em tela cheia, chuva de confetes, ou gráficos 3D quando o usuário sobe de nível ou ganha pontos.