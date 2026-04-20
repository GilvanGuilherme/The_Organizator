/* ================================================
   api.js — Camada de dados
   ================================================
   Responsabilidade ÚNICA deste arquivo:
   ler e gravar dados no localStorage.

   Ele NÃO sabe nada sobre HTML, DOM ou eventos.
   Quando o back-end estiver pronto, só este arquivo
   precisará ser alterado — o resto do código continua igual.

   Chaves usadas no localStorage:
     "organizator_tarefas"  → array de objetos de tarefa
     "organizator_usuarios" → array de objetos de usuário
     "organizator_sessao"   → objeto do usuário logado (ou null)
   ================================================ */

/* ------------------------------------------------
   UTILITÁRIO: gera um ID único simples
   ------------------------------------------------ */
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ================================================
   MÓDULO: TAREFAS
   ================================================ */
const ApiTarefas = {
  /* Retorna todas as tarefas do usuário logado */
  listar() {
    const sessao = ApiSessao.obter();
    if (!sessao) return [];

    const todas = JSON.parse(
      localStorage.getItem("organizator_tarefas") || "[]",
    );
    // Filtra apenas as tarefas do usuário atual
    return todas.filter((t) => t.usuarioId === sessao.id);
  },

  /* Cria uma nova tarefa e salva no localStorage.
     Recebe um objeto com: { titulo, descricao, categoria, prazo, prioridade }
     Retorna o objeto da tarefa criada (com id, dataCriacao, etc.) */
  criar(dados) {
    const sessao = ApiSessao.obter();
    if (!sessao) throw new Error("Usuário não autenticado");

    const todas = JSON.parse(
      localStorage.getItem("organizator_tarefas") || "[]",
    );

    const novaTarefa = {
      id: gerarId(),
      usuarioId: sessao.id,
      titulo: dados.titulo.trim(),
      descricao: dados.descricao?.trim() || "",
      categoria: dados.categoria || "Geral",
      prazo: dados.prazo || "",
      prioridade: dados.prioridade || "media", // 'alta' | 'media' | 'baixa'
      concluida: false,
      dataCriacao: new Date().toISOString(),
    };

    todas.push(novaTarefa);
    localStorage.setItem("organizator_tarefas", JSON.stringify(todas));
    return novaTarefa;
  },

  /* Atualiza os campos de uma tarefa existente pelo id.
     Recebe: (id, { titulo, descricao, categoria, prazo, prioridade, concluida })
     Retorna a tarefa atualizada ou null se não encontrada. */
  atualizar(id, dados) {
    const todas = JSON.parse(
      localStorage.getItem("organizator_tarefas") || "[]",
    );
    const idx = todas.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    // Mescla só os campos enviados, preserva o resto
    todas[idx] = { ...todas[idx], ...dados };
    localStorage.setItem("organizator_tarefas", JSON.stringify(todas));
    return todas[idx];
  },

  /* Alterna o status concluída/pendente de uma tarefa.
     Retorna a tarefa atualizada. */
  alternarConcluida(id) {
    const todas = JSON.parse(
      localStorage.getItem("organizator_tarefas") || "[]",
    );
    const idx = todas.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    todas[idx].concluida = !todas[idx].concluida;
    localStorage.setItem("organizator_tarefas", JSON.stringify(todas));
    return todas[idx];
  },

  /* Remove uma tarefa pelo id.
     Retorna true se removeu, false se não encontrou. */
  excluir(id) {
    const todas = JSON.parse(
      localStorage.getItem("organizator_tarefas") || "[]",
    );
    const novas = todas.filter((t) => t.id !== id);
    if (novas.length === todas.length) return false;

    localStorage.setItem("organizator_tarefas", JSON.stringify(novas));
    return true;
  },
};

/* ================================================
   MÓDULO: USUÁRIOS
   ================================================ */
const ApiUsuarios = {
  /* Retorna todos os usuários cadastrados */
  _listarTodos() {
    return JSON.parse(localStorage.getItem("organizator_usuarios") || "[]");
  },

  /* Cadastra um novo usuário.
     Recebe: { nome, email, senha }
     Retorna { ok: true, usuario } ou { ok: false, erro: '...' } */
  cadastrar({ nome, email, senha }) {
    const usuarios = this._listarTodos();

    // Verifica se e-mail já existe
    if (usuarios.find((u) => u.email === email.toLowerCase())) {
      return { ok: false, erro: "Este e-mail já está cadastrado." };
    }

    const novoUsuario = {
      id: gerarId(),
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      // ATENÇÃO: em produção NUNCA salve senha em texto puro.
      // Aqui é apenas para simulação de front-end sem back-end.
      senha: senha,
      dataCadastro: new Date().toISOString(),
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("organizator_usuarios", JSON.stringify(usuarios));
    return { ok: true, usuario: novoUsuario };
  },

  /* Valida e-mail e senha para login.
     Retorna { ok: true, usuario } ou { ok: false, erro: '...' } */
  autenticar({ email, senha }) {
    const usuarios = this._listarTodos();
    const usuario = usuarios.find(
      (u) => u.email === email.toLowerCase().trim() && u.senha === senha,
    );

    if (!usuario) {
      return { ok: false, erro: "E-mail ou senha incorretos." };
    }

    return { ok: true, usuario };
  },
};

/* ================================================
   MÓDULO: SESSÃO (quem está logado)
   ================================================ */
const ApiSessao = {
  /* Salva o usuário logado na sessão */
  iniciar(usuario) {
    // Salva sem a senha por segurança
    const { senha, ...usuarioSemSenha } = usuario;
    localStorage.setItem("organizator_sessao", JSON.stringify(usuarioSemSenha));
  },

  /* Retorna o usuário logado ou null se não há sessão */
  obter() {
    return JSON.parse(localStorage.getItem("organizator_sessao") || "null");
  },

  /* Encerra a sessão (logout) */
  encerrar() {
    localStorage.removeItem("organizator_sessao");
  },

  /* Verifica se há alguém logado */
  estaLogado() {
    return this.obter() !== null;
  },
};
