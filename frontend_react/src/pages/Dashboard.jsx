import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // 1. Efeito para verificar se o usuário está logado ao entrar na página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (!usuarioSalvo) {
      // Se não houver ninguém no localStorage, manda de volta para o login
      navigate("/login");
    } else {
      const userObj = JSON.parse(usuarioSalvo);
      setUsuario(userObj);
      carregarTarefas(userObj.id);
    }
  }, [navigate]);

  // 2. Função READ: Busca as tarefas do usuário logado no Backend
  const carregarTarefas = async (userId) => {
    try {
      const resposta = await fetch(
        `http://localhost:3000/api/tarefas/${userId}`,
      );
      if (resposta.ok) {
        const dados = await resposta.json();
        setTarefas(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  // 3. Função CREATE: Envia a nova tarefa para o banco de dados
  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (!novaTarefa) return;

    try {
      const resposta = await fetch("http://localhost:3000/api/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: novaTarefa,
          categoria: "Geral",
          usuario_id: usuario.id,
        }),
      });

      if (resposta.ok) {
        setNovaTarefa(""); // Limpa o campo de texto
        carregarTarefas(usuario.id); // Atualiza a lista vinda do banco
      }
    } catch (error) {
      alert("Erro ao salvar tarefa no banco.");
    }
  };

  // 4. Função DELETE: Remove a tarefa do banco de dados
  const removerTarefa = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        carregarTarefas(usuario.id); // Atualiza a lista
      }
    } catch (error) {
      alert("Erro ao remover tarefa.");
    }
  };

  // Função de LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div className="dashboard-main">
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="dashboard-user-info">
            <h2 className="dashboard-titulo">Minhas Tarefas</h2>
            <p className="dashboard-subtitulo">
              Seja bem-vindo, <strong>{usuario?.nome}</strong> não esqueça do
              seus próximos compromissos:
            </p>
          </div>

          <form onSubmit={adicionarTarefa} className="dashboard-form">
            <input
              className="form-input"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Nova atividade..."
              required
            />
            <button type="submit" className="btn btn-create-account">
              + Adicionar
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="btn-logout"
            title="Sair do Organizator"
          >
            SAIR
          </button>
        </header>

        <div className="tarefas-lista">
          {tarefas.length === 0 ? (
            <p className="tarefas-vazio">
              Nenhuma tarefa por aqui! Que tal começar agora?
            </p>
          ) : (
            tarefas.map((tarefa) => (
              <div key={tarefa.id} className="tarefa-card">
                <div className="tarefa-info">
                  <h4 className="tarefa-titulo">{tarefa.titulo}</h4>
                  <span className="tarefa-categoria">{tarefa.categoria}</span>
                </div>
                <div className="tarefa-acoes">
                  <button
                    onClick={() => removerTarefa(tarefa.id)}
                    className="tarefa-btn-excluir"
                    title="Excluir tarefa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
