/*
Lista de tarefas
[x] Saber quando o botão foi clicado
[ ] Pegar o texto dentro do Input
[ ] Colocar esse texto na tela
*/
function adicionarTarefa() {
  let valorDoInput = document.querySelector("input").value;

  let li = document.createElement("li");

  li.innerHTML =
    valorDoInput + ' <span onclick = "deletarTarefa(this)">X</span>';

  document.querySelector("ul").appendChild(li);
  valorDoInput = "";
}

function deletarTarefa(li) {
  li.parentElement.remove();
}
