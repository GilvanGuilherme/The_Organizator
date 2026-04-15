Requisitos Funcionais (RF)
Estes descrevem as ações que o sistema deve permitir.

RNF01,Persistência,Os dados devem ser armazenados de forma relacional utilizando SQLite através da biblioteca better-sqlite3.

RNF02,Desempenho,O backend deve responder às requisições de listagem em menos de 200ms.

RNF03,Segurança,As senhas dos usuários devem ser criptografadas antes de serem salvas no banco.

RNF04,Interface (UX),O sistema deve ser uma SPA (Single Page Application) para evitar recarregamentos de página.

RNF05,Disponibilidade,"O frontend deve ser responsivo, adaptando-se a dispositivos móveis e desktop."

Requisitos Não Funcionais (RNF)

Estes descrevem as qualidades técnicas e restrições do sistema.

RF01,Cadastro de Usuário,"O sistema deve permitir que novos usuários criem conta com nome, e-mail e senha."

RF02,Autenticação (Login),O sistema deve validar as credenciais do usuário para permitir acesso ao Dashboard.

RF03,Criar Tarefa,O usuário deve poder adicionar novas atividades com título e categoria.

RF04,Listar Tarefas,O sistema deve exibir todas as tarefas salvas no SQLite para o usuário logado.

RF05,Excluir Tarefa,O usuário deve poder remover tarefas da sua lista permanentemente.

RF06,Concluir Tarefa,O usuário deve poder marcar/desmarcar tarefas como finalizadas.

RF07,Filtrar por Categoria,"O sistema deve permitir visualizar tarefas específicas (ex: Trabalho, Estudos)."
