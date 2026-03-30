export function telaInicialHTML() {
  return `
    <button onclick="mostrarLogin()">Login</button>
    <button onclick="mostrarCadastro()">Cadastro</button>
  `;
}

export function loginHTML() {
  return `
    <h2>Login</h2>
    <input placeholder="Usuário"><br>
    <input type="password" placeholder="Senha"><br>
    <button>Entrar</button><br>
    <button onclick="telaInicial()">Voltar</button>
  `;
}

export function cadastroHTML() {
  return `
    <h2>Cadastro</h2>
    <input placeholder="Nome"><br>
    <input placeholder="Usuário"><br>
    <input type="password" placeholder="Senha"><br>
    <button>Cadastrar</button><br>
    <button onclick="telaInicial()">Voltar</button>
  `;
}
