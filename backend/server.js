const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const tarefaRoutes = require("./src/routes/tarefaRoutes"); // NOVO

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", usuarioRoutes);
app.use("/api", tarefaRoutes); // NOVO

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
