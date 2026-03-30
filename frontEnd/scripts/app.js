let usuarios = [];
let tarefas = [];

// ESCONDER TODAS AS TELAS
function esconderTudo() {
  document.getElementById("home").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "none";
  document.getElementById("app").style.display = "none";
}

// MOSTRAR TELAS
function mostrarHome() {
  esconderTudo();
  document.getElementById("home").style.display = "block";
}

function mostrarLogin() {
  esconderTudo();
  document.getElementById("login").style.display = "block";
}

function mostrarCadastro() {
  esconderTudo();
  document.getElementById("cadastro").style.display = "block";
}

function mostrarApp() {
  esconderTudo();
  document.getElementById("app").style.display = "block";
}

// CADASTRO
function cadastrar() {
  const user = document.getElementById("novoUsuario").value;
  const senha = document.getElementById("novaSenha").value;

  if (user && senha) {
    usuarios.push({ user, senha });
    alert("Usuário cadastrado!");
    mostrarLogin();
  } else {
    alert("Preencha os campos!");
  }
}

// LOGIN
function entrar() {
  const user = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const encontrado = usuarios.find((u) => u.user === user && u.senha === senha);

  if (encontrado) {
    mostrarApp();
  } else {
    alert("Login inválido!");
  }
}

// TAREFAS
function adicionar() {
  const input = document.getElementById("inputTarefa");

  if (input.value === "") {
    alert("Digite uma tarefa!");
    return;
  }

  tarefas.push(input.value);
  input.value = "";
}

function listar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    lista.appendChild(li);
  });
}

function limpar() {
  tarefas = [];
  document.getElementById("lista").innerHTML = "";
}
