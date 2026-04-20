const Usuario = require("../models/Usuario");

const UsuarioController = {
  // Lógica para cadastrar um usuário via API
  registrar: (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      // Validação simples
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ erro: "Todos os campos são obrigatórios" });
      }

      // Chama a função criar do Model
      const resultado = Usuario.criar(nome, email, senha);

      res.status(201).json({
        mensagem: "Usuário criado com sucesso!",
        id: resultado.lastInsertRowid,
      });
    } catch (erro) {
      // Caso o e-mail já exista (regra UNIQUE do SQLite)
      if (erro.message.includes("UNIQUE constraint failed")) {
        return res
          .status(400)
          .json({ erro: "Este e-mail já está cadastrado." });
      }
      res
        .status(500)
        .json({ erro: "Erro ao cadastrar usuário: " + erro.message });
    }
  },

  // Lógica de Login
  login: (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = Usuario.buscarPorEmail(email);

      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ erro: "E-mail ou senha inválidos" });
      }

      res.json({
        mensagem: "Login realizado!",
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },
};

module.exports = UsuarioController;
