/* ================================================
   app.js — Controlador principal
   ================================================
   Responsabilidade deste arquivo:
   - Detectar em qual página estamos
   - Registrar todos os eventos (cliques, submits, etc.)
   - Orquestrar api.js (dados) e ui.js (tela)

   Ordem de carregamento nos HTMLs:
     <script src="scripts/api.js"></script>
     <script src="scripts/ui.js"></script>
     <script src="scripts/app.js"></script>  ← sempre por último
   ================================================ */

/* ================================================
   INICIALIZAÇÃO
   Detecta a página atual pelo nome do arquivo e
   chama o controlador correspondente.
   ================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname.split("/").pop() || "";
  const paginaAtual = pagina === "" || pagina === "/" ? "index.html" : pagina;

  // Roteador simples por nome de arquivo
  const rotas = {
    "index.html": () => {}, // página pública, sem lógica JS
    "sobre.html": () => {}, // página pública, sem lógica JS
    "contato.html": iniciarContato,
    "login.html": iniciarLogin,
    "cadastro.html": iniciarCadastro,
    "recuperar-senha.html": iniciarRecuperarSenha,
    "dashboard.html": iniciarDashboard,
  };

  const controlador = rotas[paginaAtual];
  if (controlador) controlador();
});

/* ================================================
   GUARDAS DE ROTA
   Protege páginas que exigem login / não-login
   ================================================ */

/* Redireciona para login se não estiver autenticado.
   Chame no início de páginas privadas (ex: dashboard). */
function exigirLogin() {
  if (!ApiSessao.estaLogado()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

/* Redireciona para o dashboard se já estiver logado.
   Chame no início de páginas de auth (login, cadastro). */
function redirecionarSeLogado() {
  if (ApiSessao.estaLogado()) {
    window.location.href = "dashboard.html";
  }
}

/* ================================================
   CONTROLADOR: LOGIN
   ================================================ */
function iniciarLogin() {
  redirecionarSeLogado();

  const form =
    document.getElementById("form-login") ||
    document.querySelector(".auth-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    UiFeedback.limparErrosForm(form);

    const email = form.querySelector('[name="email"]');
    const senha = form.querySelector('[name="senha"]');
    let valido = true;

    // Validações de campo
    if (!email.value.trim()) {
      UiFeedback.erroNoCampo(email, "Informe seu e-mail.");
      valido = false;
    } else if (!validarEmail(email.value)) {
      UiFeedback.erroNoCampo(email, "E-mail inválido.");
      valido = false;
    }

    if (!senha.value) {
      UiFeedback.erroNoCampo(senha, "Informe sua senha.");
      valido = false;
    }

    if (!valido) return;

    // Tenta autenticar
    const resultado = ApiUsuarios.autenticar({
      email: email.value,
      senha: senha.value,
    });

    if (!resultado.ok) {
      UiFeedback.erroGeral(form, resultado.erro);
      return;
    }

    // Inicia sessão e redireciona
    ApiSessao.iniciar(resultado.usuario);
    UiFeedback.toast("Login realizado! Redirecionando...", "sucesso");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  });
}

/* ================================================
   CONTROLADOR: CADASTRO
   ================================================ */
function iniciarCadastro() {
  redirecionarSeLogado();

  const form = document.querySelector(".auth-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    UiFeedback.limparErrosForm(form);

    const nome = form.querySelector('[name="nome"]');
    const email = form.querySelector('[name="email"]');
    const senha = form.querySelector('[name="senha"]');
    const confirmarSenha = form.querySelector('[name="confirmar_senha"]');
    const termos = form.querySelector('[name="aceitar_termos"]');
    let valido = true;

    if (!nome.value.trim()) {
      UiFeedback.erroNoCampo(nome, "Informe seu nome.");
      valido = false;
    }

    if (!email.value.trim()) {
      UiFeedback.erroNoCampo(email, "Informe seu e-mail.");
      valido = false;
    } else if (!validarEmail(email.value)) {
      UiFeedback.erroNoCampo(email, "E-mail inválido.");
      valido = false;
    }

    if (senha.value.length < 8) {
      UiFeedback.erroNoCampo(senha, "A senha deve ter no mínimo 8 caracteres.");
      valido = false;
    }

    if (senha.value !== confirmarSenha.value) {
      UiFeedback.erroNoCampo(confirmarSenha, "As senhas não coincidem.");
      valido = false;
    }

    if (!termos.checked) {
      UiFeedback.erroGeral(
        form,
        "Você precisa aceitar os termos para continuar.",
      );
      valido = false;
    }

    if (!valido) return;

    const resultado = ApiUsuarios.cadastrar({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    });

    if (!resultado.ok) {
      UiFeedback.erroGeral(form, resultado.erro);
      return;
    }

    // Loga automaticamente após cadastro
    ApiSessao.iniciar(resultado.usuario);
    UiFeedback.toast("Conta criada com sucesso! Redirecionando...", "sucesso");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  });
}

/* ================================================
   CONTROLADOR: RECUPERAR SENHA
   (Simulado — sem e-mail real, só feedback visual)
   ================================================ */
function iniciarRecuperarSenha() {
  const form = document.querySelector(".auth-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    UiFeedback.limparErrosForm(form);

    const email = form.querySelector('[name="email"]');

    if (!email.value.trim() || !validarEmail(email.value)) {
      UiFeedback.erroNoCampo(email, "Informe um e-mail válido.");
      return;
    }

    // Simulação: sempre exibe mensagem de sucesso
    // (não revela se o e-mail existe ou não — boa prática de segurança)
    form.innerHTML = `
      <div class="auth-sucesso">
        <p>✅ Se este e-mail estiver cadastrado, você receberá um link em breve.</p>
        <a href="login.html" class="auth-link auth-link--destaque" style="display:block; margin-top:16px;">
          ← Voltar para o login
        </a>
      </div>
    `;
  });
}

/* ================================================
   CONTROLADOR: CONTATO
   ================================================ */
function iniciarContato() {
  const form = document.querySelector(".contato-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    UiFeedback.limparErrosForm(form);

    const nome = form.querySelector('[name="nome"]');
    const email = form.querySelector('[name="email"]');
    const assunto = form.querySelector('[name="assunto"]');
    const mensagem = form.querySelector('[name="mensagem"]');
    let valido = true;

    if (!nome.value.trim()) {
      UiFeedback.erroNoCampo(nome, "Informe seu nome.");
      valido = false;
    }
    if (!validarEmail(email.value)) {
      UiFeedback.erroNoCampo(email, "Informe um e-mail válido.");
      valido = false;
    }
    if (!assunto.value.trim()) {
      UiFeedback.erroNoCampo(assunto, "Informe o assunto.");
      valido = false;
    }
    if (mensagem.value.trim().length < 10) {
      UiFeedback.erroNoCampo(
        mensagem,
        "A mensagem deve ter pelo menos 10 caracteres.",
      );
      valido = false;
    }

    if (!valido) return;

    // Simulação de envio
    // BACK-END TODO: substituir por fetch('/enviar-contato', { method:'POST', body:... })
    UiFeedback.toast("Mensagem enviada com sucesso!", "sucesso");
    form.reset();
  });
}

/* ================================================
   CONTROLADOR: DASHBOARD
   ================================================ */
function iniciarDashboard() {
  if (!exigirLogin()) return;

  const sessao = ApiSessao.obter();
  UiDashboard.renderizarUsuario(sessao);

  // Estado local da página
  let categoriaAtiva = "todas";

  /* Renderiza tudo do zero (lista + resumo + filtros) */
  function renderizarTudo() {
    const tarefas = ApiTarefas.listar();
    UiDashboard.renderizarResumo(tarefas);
    UiDashboard.renderizarFiltros(tarefas, categoriaAtiva);
    UiDashboard.renderizarTarefas(tarefas, categoriaAtiva);
  }

  renderizarTudo();

  /* ── Botão "Nova Tarefa" ── */
  document
    .querySelector(".dashboard-btn-nova")
    ?.addEventListener("click", () => {
      UiModal.abrir(null);
      registrarEventosModal();
    });

  /* ── Cliques na lista de tarefas (delegação de eventos) ── */
  document.querySelector(".tarefas-lista")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-acao]");
    if (!btn) return;

    const id = btn.dataset.id;
    const acao = btn.dataset.acao;

    if (acao === "concluir") {
      ApiTarefas.alternarConcluida(id);
      renderizarTudo();
    }

    if (acao === "editar") {
      const tarefas = ApiTarefas.listar();
      const tarefa = tarefas.find((t) => t.id === id);
      if (!tarefa) return;
      UiModal.abrir(tarefa);
      registrarEventosModal();
    }

    if (acao === "excluir") {
      if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;
      ApiTarefas.excluir(id);
      UiFeedback.toast("Tarefa excluída.", "info");
      renderizarTudo();
    }
  });

  /* ── Cliques nos filtros de categoria (delegação) ── */
  document.querySelector(".filtro-lista")?.addEventListener("click", (e) => {
    e.preventDefault();
    const link = e.target.closest("[data-categoria]");
    if (!link) return;

    categoriaAtiva = link.dataset.categoria;
    renderizarTudo();
  });

  /* ── Logout ── */
  // document.querySelector(".btn-logout")?.addEventListener("click", (e) => {
  document.querySelector("#btn-logout")?.addEventListener("click", (e) => {
    e.preventDefault();
    ApiSessao.encerrar();
    window.location.href = "index.html";
  });

  /* Registra eventos dentro do modal (precisa ser chamado toda vez que o modal abre) */
  function registrarEventosModal() {
    const overlay = document.querySelector(".modal-overlay");
    if (!overlay) return;

    // Fechar pelo botão ✕
    overlay
      .querySelector(".modal-fechar")
      ?.addEventListener("click", UiModal.fechar);

    // Fechar clicando fora do card
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) UiModal.fechar();
    });

    // Fechar com ESC
    document.addEventListener("keydown", function fecharEsc(e) {
      if (e.key === "Escape") {
        UiModal.fechar();
        document.removeEventListener("keydown", fecharEsc);
      }
    });

    // Cancelar
    overlay
      .querySelector(".modal-btn-cancelar")
      ?.addEventListener("click", UiModal.fechar);

    // Submit do formulário de tarefa
    overlay.querySelector("#form-tarefa")?.addEventListener("submit", (e) => {
      e.preventDefault();
      UiFeedback.limparErrosForm(e.target);

      const tituloInput = e.target.querySelector('[name="titulo"]');
      if (!tituloInput.value.trim()) {
        UiFeedback.erroNoCampo(tituloInput, "O título é obrigatório.");
        return;
      }

      const dados = {
        titulo: tituloInput.value,
        descricao: e.target.querySelector('[name="descricao"]').value,
        categoria: e.target.querySelector('[name="categoria"]').value,
        prazo: e.target.querySelector('[name="prazo"]').value,
        prioridade: e.target.querySelector('[name="prioridade"]:checked').value,
      };

      const idEdicao = e.target.querySelector('[name="id"]').value;

      if (idEdicao) {
        // Modo edição
        ApiTarefas.atualizar(idEdicao, dados);
        UiFeedback.toast("Tarefa atualizada!", "sucesso");
      } else {
        // Modo criação
        ApiTarefas.criar(dados);
        UiFeedback.toast("Tarefa criada!", "sucesso");
      }

      UiModal.fechar();
      renderizarTudo();
    });
  }
}

/* ================================================
   UTILITÁRIOS GLOBAIS
   ================================================ */

/* Valida formato de e-mail */
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
