const Tarefa = require("../models/Tarefa");

const TarefaController = {
  // Criar nova tarefa
  criar: (req, res) => {
    try {
      const { titulo, categoria, usuario_id } = req.body;
      const resultado = Tarefa.criar(titulo, categoria, usuario_id);
      res
        .status(201)
        .json({ mensagem: "Tarefa criada!", id: resultado.lastInsertRowid });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  // Listar todas as tarefas de um usuário
  listar: (req, res) => {
    try {
      const { usuario_id } = req.params;
      const tarefas = Tarefa.listarPorUsuario(usuario_id);
      res.json(tarefas);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  // Alternar entre concluída ou não
  atualizarStatus: (req, res) => {
    try {
      const { id } = req.params;
      const { concluida } = req.body;
      Tarefa.atualizarStatus(id, concluida);
      res.json({ mensagem: "Status atualizado!" });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  // Deletar tarefa
  deletar: (req, res) => {
    try {
      const { id } = req.params;
      Tarefa.deletar(id);
      res.json({ mensagem: "Tarefa removida!" });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },
};

module.exports = TarefaController;
