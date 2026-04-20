const express = require("express");
const router = express.Router();
const TarefaController = require("../controllers/TarefaController");

// Rotas do CRUD
router.post("/tarefas", TarefaController.criar); // Create
router.get("/tarefas/:usuario_id", TarefaController.listar); // Read
router.put("/tarefas/:id", TarefaController.atualizarStatus); // Update
router.delete("/tarefas/:id", TarefaController.deletar); // Delete

module.exports = router;
