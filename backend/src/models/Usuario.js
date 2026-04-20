const db = require("../database/db");

const Usuario = {
  // Função para criar um novo usuário (C do CRUD)
  criar: (nome, email, senha) => {
    const stmt = db.prepare(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    );
    return stmt.run(nome, email, senha);
  },

  // Função para buscar usuário por email (Necessário para o Login)
  buscarPorEmail: (email) => {
    return db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);
  },
};

module.exports = Usuario;
