/* ================================================
   ui.js — Camada de interface (DOM)
   ================================================
   Responsabilidade ÚNICA deste arquivo:
   criar, atualizar e remover elementos HTML na tela.

   Ele NÃO acessa localStorage diretamente.
   Ele NÃO gerencia eventos (isso é responsabilidade do app.js).
   Recebe dados prontos e os transforma em HTML.
   ================================================ */

/* ================================================
   MÓDULO: FEEDBACK VISUAL
   Toast e mensagens de erro nos formulários
   ================================================ */
const UiFeedback = {
  /* Exibe uma mensagem toast no canto inferior direito.
     tipo: 'sucesso' | 'erro' | 'info'
     A mensagem some automaticamente após 3 segundos. */
  toast(mensagem, tipo = "sucesso") {
    // Remove toast anterior se ainda estiver visível
    document.querySelector(".toast")?.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast--${tipo}`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    // Força reflow para a animação de entrada funcionar
    requestAnimationFrame(() => toast.classList.add("toast--visivel"));

    setTimeout(() => {
      toast.classList.remove("toast--visivel");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /* Exibe uma mensagem de erro abaixo de um campo de formulário.
     Cria o elemento .form-erro se ainda não existir. */
  erroNoCampo(input, mensagem) {
    // Remove erro anterior do mesmo campo
    this.limparErroCampo(input);

    input.classList.add("form-input--erro");
    const span = document.createElement("span");
    span.className = "form-erro";
    span.textContent = mensagem;
    input.insertAdjacentElement("afterend", span);
  },

  limparErroCampo(input) {
    input.classList.remove("form-input--erro");
    input.nextElementSibling?.classList.contains("form-erro") &&
      input.nextElementSibling.remove();
  },

  /* Limpa todos os erros de um formulário */
  limparErrosForm(form) {
    form.querySelectorAll(".form-erro").forEach((el) => el.remove());
    form
      .querySelectorAll(".form-input--erro")
      .forEach((el) => el.classList.remove("form-input--erro"));
  },

  /* Exibe uma mensagem de erro geral dentro de um formulário
     (acima do botão de submit) */
  erroGeral(form, mensagem) {
    form.querySelector(".form-erro-geral")?.remove();
    const div = document.createElement("div");
    div.className = "form-erro-geral";
    div.textContent = mensagem;
    form
      .querySelector('[type="submit"]')
      .insertAdjacentElement("beforebegin", div);
  },
};

/* ================================================
   MÓDULO: MODAL
   Modal genérico de criação/edição de tarefa
   ================================================ */
const UiModal = {
  /* Abre o modal de tarefa.
     Se "tarefa" for passada, preenche o form para edição.
     Se não, abre vazio para criação. */
  abrir(tarefa = null) {
    document.querySelector(".modal-overlay")?.remove();

    const categorias = ["Geral", "Trabalho", "Pessoal", "Estudos", "Saúde"];
    const titulo = tarefa ? "Editar Tarefa" : "Nova Tarefa";

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="${titulo}">
        <div class="modal-header">
          <h3 class="modal-titulo">${titulo}</h3>
          <button class="modal-fechar" aria-label="Fechar modal">✕</button>
        </div>

        <form class="modal-form" id="form-tarefa" novalidate>

          <div class="form-grupo">
            <label for="modal-titulo" class="form-label">Título *</label>
            <input
              type="text"
              id="modal-titulo"
              name="titulo"
              class="form-input"
              placeholder="O que precisa ser feito?"
              maxlength="100"
              value="${tarefa?.titulo || ""}"
              required
            />
          </div>

          <div class="form-grupo">
            <label for="modal-descricao" class="form-label">Descrição</label>
            <textarea
              id="modal-descricao"
              name="descricao"
              class="form-input form-textarea"
              placeholder="Detalhes opcionais..."
              rows="3"
            >${tarefa?.descricao || ""}</textarea>
          </div>

          <div class="modal-linha-dupla">
            <div class="form-grupo">
              <label for="modal-categoria" class="form-label">Categoria</label>
              <select id="modal-categoria" name="categoria" class="form-input form-select">
                ${categorias
                  .map(
                    (c) => `
                  <option value="${c}" ${tarefa?.categoria === c ? "selected" : ""}>${c}</option>
                `,
                  )
                  .join("")}
              </select>
            </div>

            <div class="form-grupo">
              <label for="modal-prazo" class="form-label">Prazo</label>
              <input
                type="date"
                id="modal-prazo"
                name="prazo"
                class="form-input"
                value="${tarefa?.prazo || ""}"
              />
            </div>
          </div>

          <div class="form-grupo">
            <label class="form-label">Prioridade</label>
            <div class="prioridade-opcoes">
              ${["alta", "media", "baixa"]
                .map(
                  (p) => `
                <label class="prioridade-label prioridade-label--${p}">
                  <input
                    type="radio"
                    name="prioridade"
                    value="${p}"
                    ${tarefa?.prioridade === p || (!tarefa && p === "media") ? "checked" : ""}
                  />
                  ${{ alta: "🔴 Alta", media: "🟡 Média", baixa: "🟢 Baixa" }[p]}
                </label>
              `,
                )
                .join("")}
            </div>
          </div>

          <!-- id da tarefa em edição (oculto) -->
          <input type="hidden" name="id" value="${tarefa?.id || ""}" />

          <div class="modal-acoes">
            <button type="button" class="btn btn-login modal-btn-cancelar">Cancelar</button>
            <button type="submit" class="btn btn-create-account">
              ${tarefa ? "Salvar Alterações" : "Criar Tarefa"}
            </button>
          </div>

        </form>
      </div>
    `;

    document.body.appendChild(overlay);
    // Foca no campo título para acessibilidade
    setTimeout(() => overlay.querySelector("#modal-titulo").focus(), 50);
  },

  fechar() {
    document.querySelector(".modal-overlay")?.remove();
  },
};

/* ================================================
   MÓDULO: DASHBOARD
   Renderiza a lista de tarefas e o resumo lateral
   ================================================ */
const UiDashboard = {
  /* Renderiza toda a lista de tarefas no container principal.
     tarefas: array de objetos de tarefa
     filtroCategoria: string ou 'todas' */
  renderizarTarefas(tarefas, filtroCategoria = "todas") {
    const container = document.querySelector(".tarefas-lista");
    if (!container) return;

    const tarefasFiltradas =
      filtroCategoria === "todas"
        ? tarefas
        : tarefas.filter((t) => t.categoria === filtroCategoria);

    if (tarefasFiltradas.length === 0) {
      container.innerHTML = `
        <div class="tarefas-vazio">
          <p>Nenhuma tarefa encontrada.</p>
          <p>Clique em <strong>+ Nova Tarefa</strong> para começar!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = tarefasFiltradas
      .map((t) => this._cardTarefa(t))
      .join("");
  },

  /* Gera o HTML de um único card de tarefa */
  _cardTarefa(tarefa) {
    const prazoFormatado = tarefa.prazo
      ? new Date(tarefa.prazo + "T00:00:00").toLocaleDateString("pt-BR")
      : "";

    const labelPrioridade = { alta: "Alta", media: "Média", baixa: "Baixa" };

    return `
      <div class="tarefa-card ${tarefa.concluida ? "tarefa-card--concluida" : "tarefa-card--pendente"}"
           data-id="${tarefa.id}">

        <div class="tarefa-check">
          <input
            type="checkbox"
            class="tarefa-checkbox"
            ${tarefa.concluida ? "checked" : ""}
            title="${tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}"
            data-acao="concluir"
            data-id="${tarefa.id}"
          />
        </div>

        <div class="tarefa-info">
          <h4 class="tarefa-titulo ${tarefa.concluida ? "tarefa-titulo--riscado" : ""}">
            ${this._escapar(tarefa.titulo)}
          </h4>
          ${
            tarefa.descricao
              ? `<p class="tarefa-descricao">${this._escapar(tarefa.descricao)}</p>`
              : ""
          }
          <div class="tarefa-meta">
            <span class="tarefa-categoria">${this._escapar(tarefa.categoria)}</span>
            ${
              prazoFormatado
                ? `<span class="tarefa-prazo">📅 ${prazoFormatado}</span>`
                : ""
            }
            <span class="tarefa-prioridade tarefa-prioridade--${tarefa.prioridade}">
              ${labelPrioridade[tarefa.prioridade] || tarefa.prioridade}
            </span>
          </div>
        </div>

        <div class="tarefa-acoes">
          <button
            class="tarefa-btn-editar"
            title="Editar tarefa"
            data-acao="editar"
            data-id="${tarefa.id}"
          >✏️</button>
          <button
            class="tarefa-btn-excluir"
            title="Excluir tarefa"
            data-acao="excluir"
            data-id="${tarefa.id}"
          >🗑️</button>
        </div>

      </div>
    `;
  },

  /* Atualiza os contadores do resumo lateral */
  renderizarResumo(tarefas) {
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const pendentes = total - concluidas;

    const set = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = val;
    };

    set(".sumario-total", total);
    set(".sumario-concluidas", concluidas);
    set(".sumario-pendentes", pendentes);
  },

  /* Atualiza os filtros de categoria na sidebar */
  renderizarFiltros(tarefas, categoriaAtiva = "todas") {
    const lista = document.querySelector(".filtro-lista");
    if (!lista) return;

    // Coleta categorias únicas das tarefas do usuário
    const categorias = ["todas", ...new Set(tarefas.map((t) => t.categoria))];

    lista.innerHTML = categorias
      .map(
        (cat) => `
      <li>
        <a href="#"
           class="filtro-link ${cat === categoriaAtiva ? "filtro-link--ativo" : ""}"
           data-categoria="${cat}">
          ${cat === "todas" ? "Todas" : cat}
        </a>
      </li>
    `,
      )
      .join("");
  },

  /* Exibe o nome do usuário logado na navbar */
  renderizarUsuario(usuario) {
    const el = document.querySelector(".navbar-usuario-nome");
    if (el) el.textContent = `Olá, ${usuario.nome.split(" ")[0]}`;
  },

  /* Escapa HTML para evitar XSS ao renderizar conteúdo do usuário */
  _escapar(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },
};
