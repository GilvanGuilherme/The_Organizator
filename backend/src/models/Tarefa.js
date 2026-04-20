const db = require("../database/db"); // Puxa a conexão única com o SQLite

const Tarefa = {
  // CREATE: Adiciona uma nova tarefa vinculada a um usuário
  criar: (titulo, categoria, usuario_id) => {
    const stmt = db.prepare(
      "INSERT INTO tarefas (titulo, categoria, usuario_id) VALUES (?, ?, ?)",
    );
    return stmt.run(titulo, categoria, usuario_id);
  },

  // READ: Lista todas as tarefas de um usuário específico
  listarPorUsuario: (usuario_id) => {
    return db
      .prepare("SELECT * FROM tarefas WHERE usuario_id = ?")
      .all(usuario_id);
  },

  // UPDATE: Marca uma tarefa como concluída ou altera o status (0 ou 1)
  atualizarStatus: (id, concluida) => {
    const stmt = db.prepare("UPDATE tarefas SET concluida = ? WHERE id = ?");
    return stmt.run(concluida ? 1 : 0, id);
  },

  // DELETE: Remove uma tarefa do banco de dados
  deletar: (id) => {
    const stmt = db.prepare("DELETE FROM tarefas WHERE id = ?");
    return stmt.run(id);
  },
};

module.exports = Tarefa;
