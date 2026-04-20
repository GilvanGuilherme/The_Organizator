const Usuario = require("../models/Usuario");

try {
  // Tentando cadastrar um usuário de teste
  const resultado = Usuario.criar("Admin Teste", "teste@teste.com", "123456");
  console.log("✅ Sucesso! Usuário criado com ID:", resultado.lastInsertRowid);
} catch (erro) {
  console.error("❌ Erro ao criar usuário:", erro.message);
}
