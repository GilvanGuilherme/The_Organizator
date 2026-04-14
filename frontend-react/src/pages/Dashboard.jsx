import { useState } from "react";

function Dashboard() {
  // Simulando o que virá do banco de dados no futuro
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: "Estudar React", categoria: "Estudos", concluida: false },
    {
      id: 2,
      titulo: "Configurar SQLite",
      categoria: "Backend",
      concluida: false,
    },
  ]);

  const [novaTarefa, setNovaTarefa] = useState("");

  // Função para ADICIONAR (C do CRUD)
  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!novaTarefa) return;

    const tarefaObj = {
      id: Date.now(),
      titulo: novaTarefa,
      categoria: "Geral",
      concluida: false,
    };

    setTarefas([...tarefas, tarefaObj]);
    setNovaTarefa("");
  };

  // Função para REMOVER (D do CRUD)
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <div className="dashboard-main">
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2 className="dashboard-titulo">Minhas Tarefas</h2>
          <form
            onSubmit={adicionarTarefa}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              className="form-input"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Nova atividade..."
            />
            <button type="submit" className="btn btn-create-account">
              + Adicionar
            </button>
          </form>
        </header>

        <div className="tarefas-lista">
          {tarefas.length === 0 ? (
            <p className="tarefas-vazio">Nenhuma tarefa por aqui!</p>
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
