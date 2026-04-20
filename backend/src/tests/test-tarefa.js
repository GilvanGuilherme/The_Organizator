const Tarefa = require("../models/Tarefa");

try {
  console.log("--- Iniciando Teste de CRUD de Tarefas ---");

  // 1. TESTE CREATE
  const novaTarefa = Tarefa.criar("Estudar Banco de Dados", "Faculdade", 1);
  const tarefaId = novaTarefa.lastInsertRowid;
  console.log("✅ [CREATE]: Tarefa criada com ID:", tarefaId);

  // 2. TESTE READ
  const lista = Tarefa.listarPorUsuario(1);
  console.log("✅ [READ]: Tarefas do usuário 1:", lista);

  // 3. TESTE UPDATE
  Tarefa.atualizarStatus(tarefaId, true);
  console.log("✅ [UPDATE]: Tarefa marcada como concluída.");

  // 4. TESTE DELETE
  Tarefa.deletar(tarefaId);
  console.log("✅ [DELETE]: Tarefa removida com sucesso.");

  console.log("--- Fim dos Testes: Tudo funcionando! ---");
} catch (erro) {
  console.error("❌ Erro nos testes de tarefa:", erro.message);
}
